create table if not exists public.site_settings (
  key text primary key,
  enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

insert into public.site_settings (key, enabled)
values ('registrations_enabled', true)
on conflict (key) do nothing;
