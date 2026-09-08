# reference.md · SOLAR - INSTAGRAM DM OUTREACH
Contratto: `.claude/skills/solar-ruolo-template/reference.md`. MC = `https://mission-control-production-d22b.up.railway.app`.

## Q1 · Pool titolari con Instagram (Supabase `public`, project dziylyrneqeamqzatdzo)
```sql
select a.icp_tier, count(*) as n
from public.aziende a
where a.lista = 'Lista Target' and coalesce(a.instagram, '') <> '' and a.stato = 'Contatto'
group by a.icp_tier order by a.icp_tier;
-- lista del giorno (N righe):
select a.id_sb, a.azienda, a.titolare_nome, a.titolare_cognome, a.instagram, a.regione, a.icp_tier
from public.aziende a
where a.lista = 'Lista Target' and coalesce(a.instagram, '') <> '' and a.stato = 'Contatto'
  and not exists (select 1 from mc.outreach_msgs o where o.channel = 'instagram' and o.contact_ref = a.id_sb)
order by case a.icp_tier when 'A' then 1 when 'B' then 2 else 3 end, a.icp_score desc nulls last
limit :n;
```
## Stato (kv `instagram:stato`)
`{ "template_ok": false, "volumi": { "inviti_giorno": null, "dm_giorno": null }, "unipile": false, "aggiornato": "..." }` — lo aggiorna Valerio/il builder quando approva.
## Template proposti (bozza `dm_template`) — devono essere brevi, umani, senza trattino lungo
1. ****Primo DM** (≤ 300 caratteri): chi siamo in una riga + perché loro (installatore FV nella loro zona), nessuna vendita.
2. **Primo DM** (dopo accettazione): una domanda vera sul suo problema (richieste che arrivano e si perdono / agenda vuota d'inverno), zero pitch.
3. **Follow-up** (3 giorni dopo, se silenzio): una riga di valore (es. un dato del fotovoltaico con fonte) + domanda soft.
4. **Qualifica** (quando risponde): zona · quanti sopralluoghi utili in più al mese vorrebbe · decide lui? → se sì, proponi 2 slot per una call di 20 minuti → `meeting_add`.
## §reale (solo dopo OK di Valerio): Unipile
- Base URL raggiungibile dal proxy: `https://api65.unipile.com/api/v1/...?port=19505` (auth iniettata dal connettore). Endpoint da verificare al primo uso: `GET /accounts`, `GET /chats`, `GET /chats/{id}/messages`, `POST /chats` (nuovo messaggio), (niente inviti su Instagram).
- Ogni invio → `outreach_add direction:"out"`; ogni risposta → `outreach_add direction:"in"` + risposta entro il giro; meeting → `meeting_add`.
- Volumi: quelli in `instagram:stato.volumi`, distribuiti sulle 12 ore (mai tutti in un giro). Stop immediato se Instagram mostra avvisi/restrizioni: `feed` kind `error`.
