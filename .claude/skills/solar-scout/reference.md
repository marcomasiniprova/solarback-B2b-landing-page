# reference.md · SOLAR - SCOUT (contratto Mission Control + SQL pronto)

Tutto il contratto generale (op, chiavi kv, prompt della routine) è in `.claude/skills/solar-ruolo-template/reference.md`. Qui: ciò che serve allo Scout.

## Mission Control
- `MC=https://mission-control-production-d22b.up.railway.app` · header `Authorization: Bearer <INGEST_KEY>`
- Inizio: `POST {op:"run_start", agent:"solar-scout", task:"Giro Scout del <data>"}` → `run_id`
- Durante: `heartbeat` ogni ~5 min; `feed` per ogni missione completata o saltata
- Fine: `kv_set key:"scout:ultimo"` + `run_finish {agent:"solar-scout", run_id, esito, summary, items}`

## Supabase (scrittura su `public`, via MCP `execute_sql`, project `dziylyrneqeamqzatdzo`)
Tabelle e colonne reali (8/9/2026):
- `aziende`: `id_sb, lista, stato, bucket, icp_tier, icp_score, azienda, titolare_nome, titolare_cognome, titolare_ruolo, titolare_email, titolare_linkedin, email_1, email_1_tipo (NOMINATIVA_AZIENDALE|GENERICA|FREEMAIL), email_1_verifica, email_1_confidenza, email_1_catchall, mobile_1, mobile_2, fisso_1, fisso_2, citta, provincia, regione, sito, linkedin_azienda, categoria, fonti, updated_at, ...`
- `leads_titolari` (staging): `email, first_name, last_name, title, role, mobile, linkedin, dominio, id_sb, catchall, fonte, run_date, verificata, promossa, created_at`
- `verifica_email`: `email (pk), status, confidence, is_catch_all, is_role_based, is_free_provider, verificata_il, fonte, fase1_ok (calcolata: valid, oppure risky+role_based+non catch-all+confidenza medium/high)`
- `persone`: `id_p, id_sb, azienda, nome, cognome, ruolo, email, email_tipo, email_verifica, linkedin, e_titolare_principale ('SI'|'NO'), azienda_in, provincia, regione`
- `enrich_dom2id`: `dominio, id_sb`

### Q1 · Bacino M1 (Tier A → B → C, con sito)
```sql
select id_sb, azienda, icp_tier, icp_score,
       regexp_replace(lower(sito), '^https?://(www\.)?([^/]+).*$', '\2') as dominio,
       linkedin_azienda
from public.aziende
where lista = 'Lista Target' and titolare_email is null and sito is not null
order by case icp_tier when 'A' then 1 when 'B' then 2 else 3 end, icp_score desc nulls last
limit 150;
```
### Q2 · Staging dei lead (uno per riga; `id_sb` dal dominio)
```sql
insert into public.leads_titolari (email, first_name, last_name, title, role, mobile, linkedin, dominio, id_sb, catchall, fonte, run_date, verificata, promossa)
values (lower(:email), :first_name, :last_name, :title, :role, :mobile, :linkedin, :dominio,
        coalesce((select id_sb from public.enrich_dom2id where dominio = :dominio limit 1),
                 (select id_sb from public.aziende where regexp_replace(lower(sito), '^https?://(www\.)?([^/]+).*$', '\2') = :dominio limit 1)),
        false, 'L1-leads-finder', current_date, false, false)
on conflict do nothing;
```
(Se `leads_titolari` non ha vincolo univoco su email, controlla prima `select 1 from leads_titolari where email = :email`.)

### Q3 · Upsert verifica
```sql
insert into public.verifica_email (email, status, confidence, is_catch_all, is_role_based, is_free_provider, verificata_il, fonte)
values (lower(:email), :status, :confidence, :is_catch_all, :is_role_based, :is_free_provider, current_date, 'scout-' || to_char(current_date,'YYYY-MM-DD'))
on conflict (email) do update set status = excluded.status, confidence = excluded.confidence, is_catch_all = excluded.is_catch_all,
  is_role_based = excluded.is_role_based, is_free_provider = excluded.is_free_provider, verificata_il = excluded.verificata_il, fonte = excluded.fonte;
update public.leads_titolari set verificata = true where email = lower(:email);
```
### Q4 · Promozione autonoma (migliore email fase1_ok per azienda, priorità decisore)
```sql
with cand as (
  select l.id_sb, l.email, l.first_name, l.last_name, l.role, l.linkedin, l.mobile,
         v.status, v.confidence, v.is_catch_all, v.is_free_provider,
         row_number() over (partition by l.id_sb order by
           case when coalesce(l.role,'') ~* '(owner|titolar|ceo|founder|fondat|amministrat|socio|direttor|presidente|managing|general manager|proprietar|legale rappresentante)' then 1 else 2 end,
           case v.status when 'valid' then 1 else 2 end, l.created_at) as rn
  from public.leads_titolari l
  join public.verifica_email v on v.email = l.email
  join public.aziende a on a.id_sb = l.id_sb
  where l.promossa = false and v.fase1_ok and a.lista = 'Lista Target' and a.titolare_email is null
), upd as (
  update public.aziende a set
    titolare_nome = c.first_name, titolare_cognome = c.last_name, titolare_ruolo = c.role,
    titolare_email = c.email, titolare_linkedin = coalesce(c.linkedin, a.titolare_linkedin),
    email_1 = c.email, email_1_tipo = case when c.is_free_provider then 'FREEMAIL' else 'NOMINATIVA_AZIENDALE' end,
    email_1_verifica = c.status, email_1_confidenza = c.confidence, email_1_catchall = c.is_catch_all,
    mobile_1 = coalesce(a.mobile_1, nullif(c.mobile,'')), updated_at = now()
  from cand c where c.rn = 1 and a.id_sb = c.id_sb
  returning a.id_sb, a.titolare_email
)
update public.leads_titolari l set promossa = true from upd u where u.id_sb = l.id_sb and l.email = u.titolare_email;
-- conteggio: select count(*) from public.leads_titolari where promossa and run_date = current_date;
```
### Q5 · Persone (tutte le verificate del giro, non solo le promosse)
```sql
insert into public.persone (id_p, id_sb, azienda, nome, cognome, ruolo, email, email_tipo, email_verifica, linkedin, e_titolare_principale, azienda_in, provincia, regione)
select 'SC-' || substr(md5(l.email), 1, 12), l.id_sb, a.azienda, l.first_name, l.last_name, l.role, l.email,
       case when v.is_free_provider then 'FREEMAIL' else 'NOMINATIVA_AZIENDALE' end, v.status, l.linkedin,
       case when a.titolare_email = l.email then 'SI' else 'NO' end, a.lista, a.provincia, a.regione
from public.leads_titolari l
join public.aziende a on a.id_sb = l.id_sb
join public.verifica_email v on v.email = l.email
where v.fase1_ok and l.run_date = current_date
  and not exists (select 1 from public.persone p where p.email = l.email);
```
### Q6 · Ricalcolo bucket (solo aziende toccate oggi)
```sql
update public.aziende a set bucket = case
  when a.email_1 is not null and a.mobile_1 is not null and a.email_1_tipo in ('NOMINATIVA_AZIENDALE','FREEMAIL') then '2_EMAIL+MOBILE_TITOLARE'
  when a.email_1 is not null and a.mobile_1 is not null then '2_EMAIL+MOBILE_GENERICA'
  when a.email_1 is not null and a.email_1_tipo in ('NOMINATIVA_AZIENDALE','FREEMAIL') then '1_EMAIL_TITOLARE'
  when a.email_1 is not null then '1_EMAIL_GENERICA'
  when a.mobile_1 is not null then '3_SOLO_MOBILE'
  when a.fisso_1 is not null then '4_SOLO_FISSO'
  else '5_SOLO_SOCIAL' end, updated_at = now()
where a.lista = 'Lista Target' and a.updated_at::date = current_date;
```
### Q7 · Dedup nuove aziende (M2) prima dell'insert
```sql
select id_sb from public.aziende
where regexp_replace(lower(sito), '^https?://(www\.)?([^/]+).*$', '\2') = :dominio
   or regexp_replace(coalesce(fisso_1,''), '\D', '', 'g') = regexp_replace(:telefono, '\D', '', 'g')
   or (lower(azienda) = lower(:nome) and lower(citta) = lower(:citta))
limit 1;
```
### Report finale (numeri veri per kv/feed)
```sql
select
  (select count(*) from public.leads_titolari where promossa and run_date = current_date) as nuovi_titolari,
  (select count(*) from public.verifica_email where fonte = 'scout-' || to_char(current_date,'YYYY-MM-DD')) as nuove_email_verificate,
  (select count(*) from public.aziende where fonti = 'scout-gmaps' and created_at::date = current_date) as nuove_aziende,
  (select count(*) from public.aziende where lista='Lista Target' and titolare_email is null) as bacino_residuo;
```

## Attori (dal registro docs/18, con opzioni collaudate)
| Step | Attore | Opzioni | Costo |
|---|---|---|---|
| L1 | `microworlds/leads-finder` | `company_domains`, filtro ruolo Owner/Titolare/CEO/Founder/Amministratore; `maxTotalChargeUsd` ≤ 1.2 | $0,003/lead |
| L2 | `harvestapi/linkedin-company-employees` | max 20 aziende/run, `seniorityLevelIds ["320","310","300","220"]`, Full+email, `all_at_once`, `maxItems 60`; se 0 item in <10 s = rate-limit → salta | ~$0,012/profilo |
| L3 (opz.) | `snipercoder/bulk-linkedin-email-finder` | ≤100 URL profilo per run | $0,001/email |
| Verifica | `blessiticus/email-verifier-pro` | `emails[]` ≤100, `concurrency 20, maxRetries 1, timeout 12`; abort se appeso >150 s | $0,00085/email |
| M2 | Google Maps scraper | **da validare** (micro-test ≤0,50 $) e registrare in docs/18 | — |

## Sessione operativa (la crea Valerio)
Nome: **SOLAR SCOUT operative**. Connettori necessari: **Apify (nativo)**, **Supabase** (progetto `solarback`), accesso al repo GitHub (per `git pull`). Nessun altro.
Routine (la creo io): cron `0 5 * * *` (07:00 IT in estate; `0 6 * * *` in inverno) agganciata alla sessione, prompt = template in `solar-ruolo-template/reference.md` con `<RUOLO>=SCOUT`.
