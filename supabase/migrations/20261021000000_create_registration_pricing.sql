create table if not exists public.registration_pricing (
  id integer primary key default 1 check (id = 1),
  prices jsonb not null,
  discounts jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.registration_pricing enable row level security;

-- Read and write through authenticated server actions using the service role.
insert into public.registration_pricing (id, prices, discounts)
values (1, '{
  "baby": {"resident": 270, "exterior": 290},
  "mini": {"resident": 270, "exterior": 290},
  "ecole_1h": {"resident": 341, "exterior": 361},
  "ecole_1h30": {"resident": 408, "exterior": 428},
  "ecole_2h": {"resident": 469, "exterior": 489},
  "ecole_3h": {"resident": 581, "exterior": 601},
  "ecole_4h30": {"resident": 980, "exterior": 1000},
  "adulte": {"resident": 270, "exterior": 290},
  "etudiant": {"resident": 209, "exterior": 229},
  "equipe": {"resident": 428, "exterior": 448},
  "cours_1h": {"resident": 300, "exterior": 320},
  "cours_2h": {"resident": 535, "exterior": 555}
}', '{"1": 0, "2-3": 16, "4-5": 21, "6-7": 26, "8": 31}')
on conflict (id) do nothing;
