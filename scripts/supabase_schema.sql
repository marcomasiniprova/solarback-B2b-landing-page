-- Schema DB VIVO SolarBack (Supabase / Postgres) — Lista Target + Persone + Verifica email.
-- Applicato come migration `lista_target_schema` (8/9/2026). Nomi colonna = colonne dei CSV in minuscolo.
-- Regola: NIENTE perdita dati → stessi campi della pipeline + campi "vivi" (stato, ultimo_contatto, note_operative).

create table if not exists public.aziende (
  id_sb                   text primary key,                                   -- SB-xxxxx
  lista                   text not null check (lista in ('Lista Target','Scarti')),
  stato                   text not null default 'Contatto'
                          check (stato in ('Contatto','Interessato','Qualificato','Partner','Perso','Escluso')),
  bucket                  text,        -- 1_EMAIL_TITOLARE … 5_SOLO_SOCIAL, 6_SCARTI
  icp_tier                text check (icp_tier in ('A','B','C')),
  icp_score               integer,
  azienda                 text,
  alias_nomi              text,
  titolare_nome           text,
  titolare_cognome        text,
  titolare_ruolo          text,
  titolare_email          text,
  titolare_linkedin       text,
  email_1                 text,        -- email migliore (verificata, policy fase1)
  email_1_tipo            text,        -- NOMINATIVA_AZIENDALE | GENERICA | FREEMAIL
  email_2                 text,
  email_3                 text,
  email_tutte             text,        -- "a | b | c"
  email_sospette          text,        -- email di terzi/condivise: NON usare
  pec                     text,
  email_1_verifica        text,        -- valid | risky | invalid | unknown
  email_1_confidenza      text,        -- high | medium | low
  email_1_catchall        text,        -- SI | NO
  email_scartate_verifica text,
  mobile_1                text,
  mobile_2                text,
  fisso_1                 text,
  fisso_2                 text,
  numero_verde            text,
  tel_tutti               text,
  ha_whatsapp             text,        -- SI | NO
  citta                   text,
  provincia               text,
  sigla                   text,
  regione                 text,
  cap                     text,
  indirizzo               text,
  paese                   text,        -- IT | EST
  sito                    text,
  linkedin_azienda        text,
  facebook                text,
  instagram               text,
  categoria               text,
  categorie_tutte         text,
  rating_google           numeric(3,1),
  n_recensioni            integer,
  fb_ads_attive           text,        -- SI | NO
  fb_ads_pagina           text,
  geo_da_prefisso         text,        -- SI | NO
  n_persone               integer,
  fonti                   text[],      -- tag delle fonti grezze
  n_righe_fuse            integer,
  source_ids              text,        -- TAG#riga | TAG#riga … (tracciabilità)
  note                    text,
  motivo_scarto           text,
  condivide_contatto_con  text,
  possibile_doppione      text,        -- SI | NO
  -- campi VIVI (si aggiornano lavorando la lista)
  ultimo_contatto         date,
  canale_ultimo           text check (canale_ultimo is null or canale_ultimo in ('Cold email','Cold call','LinkedIn','WhatsApp','Altro')),
  note_operative          text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
comment on table public.aziende is 'Lista Target SolarBack (installatori FV, tutta Italia) + Scarti. 1 riga = 1 azienda (id_sb). Stato = funnel GLOSSARIO.';

create table if not exists public.persone (
  id_p                    text primary key,
  id_sb                   text not null references public.aziende(id_sb) on update cascade,
  azienda                 text,
  nome                    text,
  cognome                 text,
  ruolo                   text,
  email                   text,
  email_tipo              text,
  email_verifica          text,
  linkedin                text,
  e_titolare_principale   text,        -- SI | NO
  azienda_in              text,        -- MASTER | SCARTI
  provincia               text,
  regione                 text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
comment on table public.persone is 'Persone (titolari/ruoli) collegate alle aziende. 1 riga = 1 persona (id_p).';

create table if not exists public.verifica_email (
  email                   text primary key,
  status                  text,        -- valid | risky | unknown | invalid
  confidence              text,        -- high | medium | low
  is_catch_all            boolean not null default false,
  is_role_based           boolean not null default false,
  is_free_provider        boolean not null default false,
  verificata_il           date not null default '2026-09-07',
  fonte                   text not null default 'apify:blessiticus/email-verifier-pro',
  -- policy fase1 (usabile in cold email): valid, oppure risky+role-based, non catch-all, confidence medium/high
  fase1_ok                boolean generated always as (
                            status = 'valid'
                            or (status = 'risky' and is_role_based and not is_catch_all and confidence in ('high','medium'))
                          ) stored
);
comment on table public.verifica_email is 'Esito verifica di OGNI email (Apify email-verifier-pro). fase1_ok = policy fase1.';

create index if not exists aziende_lista_idx    on public.aziende (lista);
create index if not exists aziende_stato_idx    on public.aziende (stato);
create index if not exists aziende_bucket_idx   on public.aziende (bucket);
create index if not exists aziende_tier_idx     on public.aziende (icp_tier);
create index if not exists aziende_regione_idx  on public.aziende (regione);
create index if not exists aziende_email1_idx   on public.aziende (email_1);
create index if not exists aziende_sito_idx     on public.aziende (sito);
create index if not exists persone_idsb_idx     on public.persone (id_sb);
create index if not exists persone_email_idx    on public.persone (email);

-- updated_at automatico
create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists aziende_updated_at on public.aziende;
create trigger aziende_updated_at before update on public.aziende for each row execute function public.set_updated_at();
drop trigger if exists persone_updated_at on public.persone;
create trigger persone_updated_at before update on public.persone for each row execute function public.set_updated_at();

-- viste operative
-- Blindatura (migration lock_down_rls): RLS attivo senza policy + revoke ad anon/authenticated sulle tabelle e viste;
-- viste con security_invoker = on. Per un bulk futuro: grant temporaneo a anon → carica → revoke.
create or replace view public.v_lista_target as
  select * from public.aziende where lista = 'Lista Target';
create or replace view public.v_cold_email as            -- pronte per Instantly (email_1 già policy fase1)
  select id_sb, azienda, icp_tier, bucket, titolare_nome, titolare_cognome, email_1, email_1_tipo, email_1_verifica,
         regione, provincia, citta, sito, stato
  from public.aziende where lista = 'Lista Target' and email_1 is not null;
create or replace view public.v_cold_call as             -- per le chiamate di Valerio (mar→ven 10-12 / 14:30-19)
  select id_sb, azienda, icp_tier, bucket, titolare_nome, titolare_cognome, mobile_1, mobile_2, fisso_1, ha_whatsapp,
         regione, provincia, citta, sito, stato, ultimo_contatto, note_operative
  from public.aziende where lista = 'Lista Target' and (mobile_1 is not null or fisso_1 is not null);
