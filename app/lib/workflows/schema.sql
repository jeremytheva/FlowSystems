-- workflows table
create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  name text not null,
  description text,
  phase text not null,
  industry text,
  status text not null default 'DRAFT',
  health_score int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- workflow_nodes table
create table if not exists public.workflow_nodes (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  type text not null,
  label text not null,
  description text,
  position_x numeric not null default 0,
  position_y numeric not null default 0,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- workflow_edges table
create table if not exists public.workflow_edges (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  source_node_id uuid not null references public.workflow_nodes(id) on delete cascade,
  target_node_id uuid not null references public.workflow_nodes(id) on delete cascade,
  label text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- helpful indexes
create index if not exists idx_workflow_nodes_workflow_id on public.workflow_nodes(workflow_id);
create index if not exists idx_workflow_edges_workflow_id on public.workflow_edges(workflow_id);
