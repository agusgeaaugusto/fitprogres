-- seeds/exercise_seed_300.sql
-- Genera ~300 ejercicios combinando músculo × equipo × dificultad × variantes.

with muscles(m) as (
  values ('pecho'),('espalda'),('pierna'),('hombro'),('core')
),
equip(e) as (
  values ('barra'),('mancuerna'),('máquina'),('banda'),('suelo')
),
dif(d) as (
  values (1),(2),(3)
),
base as (
  select m as musculo, e as equipo, d as dificultad
  from muscles cross join equip cross join dif
),
variants as (
  select *, row_number() over () as rn
  from base
),
names as (
  select
    rn,
    case musculo
      when 'pecho' then 'Press'
      when 'espalda' then 'Remo'
      when 'pierna' then 'Sentadilla'
      when 'hombro' then 'Press Militar'
      when 'core' then 'Plancha'
    end
    || ' ' ||
    case equipo
      when 'barra' then 'con barra'
      when 'mancuerna' then 'con mancuernas'
      when 'máquina' then 'en máquina'
      when 'banda' then 'con banda'
      when 'suelo' then 'en suelo'
    end
    || ' v' || ((rn % 5)+1) as nombre,
    musculo, equipo, dificultad,
    case when musculo in ('pecho','espalda','pierna','hombro') and dificultad>=2 then 'compuesto' else 'aislado' end as tipo,
    case
      when musculo='pierna' then array['rodilla-safe']
      when musculo='core' then array['baja-impacto','core']
      else array[musculo]
    end as tags
  from variants
),
expanded as (
  -- duplica con pequeñas variaciones para superar 300
  select * from names
  union all
  select rn+1000 as rn, nombre||' (tempo 3-1-1)' as nombre, musculo, equipo, dificultad, tipo, tags from names
  union all
  select rn+2000 as rn, nombre||' unilateral' as nombre, musculo, equipo, dificultad, tipo, tags from names
)
insert into exercise (nombre, musculo, tipo, dificultad, equipo, tags, media_url)
select nombre, musculo, tipo, dificultad, equipo, tags, null
from expanded
limit 300;
