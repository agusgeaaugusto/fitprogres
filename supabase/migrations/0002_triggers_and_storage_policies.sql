-- 0002_triggers_and_storage_policies.sql

-- Trigger: al crear usuario en auth.users, si tiene 'is_trainer' en metadata o por defecto true, insertar en trainer.
create or replace function public.handle_auth_user_created()
returns trigger
language plpgsql
security definer
as $$
declare
  v_email text;
  v_name text;
  v_is_trainer boolean;
begin
  v_email := new.email;
  v_name := coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1));
  v_is_trainer := coalesce((new.raw_user_meta_data->>'is_trainer')::boolean, true);
  if v_is_trainer then
    insert into public.trainer(id,email,nombre,licencia_estado)
    values (new.id, v_email, v_name, 'inactivo')
    on conflict (id) do nothing;
  end if;
  return new;
end
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_auth_user_created();

-- Storage bucket 'photos' y políticas por prefijo progress/<uid>/
-- Crear bucket si no existe
do $$
begin
  if not exists (select 1 from storage.buckets where id = 'photos') then
    perform storage.create_bucket('photos', public => false);
  end if;
end $$;

-- Policies (reemplazar si existen)
do $$
begin
  -- Remove existing conflicting policies named photos_*
  delete from pg_policies where polname in ('photos_read_own','photos_insert_own','photos_update_own','photos_delete_own');
exception when others then null;
end $$;

create policy photos_read_own on storage.objects
  for select to authenticated
  using (
    bucket_id = 'photos'
    and (name like ('progress/' || auth.uid()::text || '/%'))
  );

create policy photos_insert_own on storage.objects
  for insert to authenticated
  with check (bucket_id = 'photos' and (name like ('progress/' || auth.uid()::text || '/%')));

create policy photos_update_own on storage.objects
  for update to authenticated
  using (bucket_id = 'photos' and (name like ('progress/' || auth.uid()::text || '/%')))
  with check (bucket_id = 'photos' and (name like ('progress/' || auth.uid()::text || '/%')));

create policy photos_delete_own on storage.objects
  for delete to authenticated
  using (bucket_id = 'photos' and (name like ('progress/' || auth.uid()::text || '/%')));
