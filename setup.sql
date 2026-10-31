-- 在 Supabase 的 SQL Editor 里整段粘贴运行一次
create table if not exists public.timelog (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.timelog enable row level security;
drop policy if exists "own row" on public.timelog;
create policy "own row" on public.timelog
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
