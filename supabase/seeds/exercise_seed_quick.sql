-- seeds/exercise_seed_quick.sql
insert into exercise (nombre,musculo,tipo,dificultad,equipo,tags,media_url) values
('Press banca','pecho','compuesto',2,'barra',array['pecho'],null),
('Jalón al pecho','espalda','compuesto',1,'máquina',array['espalda'],null),
('Sentadilla goblet','pierna','compuesto',1,'mancuerna',array['rodilla-safe'],null),
('Press militar','hombro','compuesto',2,'barra',array['hombro'],null),
('Plancha','core','aislado',1,'suelo',array['core','baja-impacto'],null);
