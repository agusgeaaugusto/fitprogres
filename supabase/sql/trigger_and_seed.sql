create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.trainer (id, email) values (new.id, new.email) on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

insert into public.exercise (nombre, musculo, tipo, dificultad, tags) values
('Press banca','pecho','compuesto',1,'{barra,pecho}'),
('Aperturas mancuernas','pecho','aislamiento',1,'{mancuerna,pecho}'),
('Remo con barra','espalda','compuesto',2,'{barra,espalda}'),
('Jalón al pecho','espalda','compuesto',1,'{polea,espalda}'),
('Sentadilla','pierna','compuesto',2,'{barra,pierna}'),
('Prensa inclinada','pierna','compuesto',1,'{maquina,pierna}'),
('Press militar','hombro','compuesto',2,'{barra,hombro}'),
('Elevaciones laterales','hombro','aislamiento',1,'{mancuerna,hombro}'),
('Plancha','core','aislamiento',1,'{suelo,core}')
on conflict do nothing;
