-- supabase/storage_setup.sql
-- Crea bucket 'photos' (privado) y políticas básicas
-- Requiere rol de servicio o desde SQL editor con privilegios.
select storage.create_bucket('photos', public => false);

-- Policies en storage.objects (RLS)
-- Nota: en proyectos nuevos ya hay RLS habilitado en storage.objects
create policy "photos_read_own" on storage.objects for select
  to authenticated
  using (bucket_id = 'photos' and (owner = auth.uid() or (right(name, 36) like auth.uid()::text))); -- heurística por ruta userId/

create policy "photos_insert_own" on storage.objects for insert
  to authenticated
  with check (bucket_id = 'photos');

create policy "photos_update_own" on storage.objects for update
  to authenticated
  using (bucket_id = 'photos');

create policy "photos_delete_own" on storage.objects for delete
  to authenticated
  using (bucket_id = 'photos');
