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
## Template proposti (bozza `dm_template`) — brevi, umani, senza trattino lungo
Su Instagram NON esiste la richiesta di collegamento: il primo DM finisce tra le richieste di messaggio e lo legge il titolare. Per questo il primo messaggio deve sembrare una persona curiosa, non un venditore.
**LEGGE DEL PRIMO DM (non negoziabile):** nel primo DM e nel follow-up NON si nomina l'offerta, NON si parla di sopralluoghi, di "a risultato", di prezzi, di ads, di "vi riempiamo l'agenda". Niente "lavoro con installatori e vi porto X". L'offerta si dice SOLO dopo la qualifica, quando lui ha risposto e ha detto che decide lui. Un template che vende al primo messaggio va rifatto.
1. **Primo DM** (≤ 300 caratteri): un'osservazione vera e specifica sul profilo/azienda (un lavoro, una zona, un post) + una domanda vera sul suo problema (le richieste che arrivano e si perdono / agenda vuota d'inverno). Zero pitch, zero "chi siamo".
2. **Follow-up** (3 giorni dopo, se silenzio): una riga di valore (un'osservazione qualitativa dal settore, nessuna percentuale inventata) + domanda soft. Ancora zero offerta.
3. **Qualifica** (quando risponde): zona · quanti sopralluoghi utili in più al mese vorrebbe · decide lui? → SOLO se decide lui e c'è fit: offerta in una riga (reparto acquisizione esterno a performance, si paga a sopralluogo/contratto, le ads le mette lui) e 2 slot per una call di 20 minuti → `meeting_add`.
## §reale (solo dopo OK di Valerio): Unipile
- Base URL raggiungibile dal proxy: `https://api65.unipile.com/api/v1/...?port=19505` (auth iniettata dal connettore). Endpoint da verificare al primo uso: `GET /accounts`, `GET /chats`, `GET /chats/{id}/messages`, `POST /chats` (nuovo messaggio), (niente inviti su Instagram).
- Ogni invio → `outreach_add direction:"out"`; ogni risposta → `outreach_add direction:"in"` + risposta entro il giro; meeting → `meeting_add`.
- Volumi: quelli in `instagram:stato.volumi`, distribuiti sulle 12 ore (mai tutti in un giro). Stop immediato se Instagram mostra avvisi/restrizioni: `feed` kind `error`.
