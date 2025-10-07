alter table public.trainer enable row level security;
alter table public.license enable row level security;
alter table public.student enable row level security;
alter table public.student_profile enable row level security;
alter table public.program enable row level security;
alter table public.program_day enable row level security;
alter table public.program_exercise enable row level security;
alter table public.exercise enable row level security;

drop policy if exists trainer_self on public.trainer;
create policy trainer_self on public.trainer for all using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists license_by_trainer on public.license;
create policy license_by_trainer on public.license for all using (trainer_id = auth.uid()) with check (trainer_id = auth.uid());

drop policy if exists students_of_trainer on public.student;
create policy students_of_trainer on public.student for all using (trainer_id = auth.uid()) with check (trainer_id = auth.uid());

drop policy if exists profiles_students_of_trainer on public.student_profile;
create policy profiles_students_of_trainer on public.student_profile for all using (
  exists(select 1 from public.student s where s.id = student_profile.student_id and s.trainer_id = auth.uid())
) with check (
  exists(select 1 from public.student s where s.id = student_profile.student_id and s.trainer_id = auth.uid())
);

drop policy if exists programs_students_of_trainer on public.program;
create policy programs_students_of_trainer on public.program for all using (
  exists(select 1 from public.student s where s.id = program.student_id and s.trainer_id = auth.uid())
) with check (
  exists(select 1 from public.student s where s.id = program.student_id and s.trainer_id = auth.uid())
);

drop policy if exists program_days_of_program on public.program_day;
create policy program_days_of_program on public.program_day for all using (
  exists(select 1 from public.program p join public.student s on s.id = p.student_id where p.id = program_day.program_id and s.trainer_id = auth.uid())
) with check (
  exists(select 1 from public.program p join public.student s on s.id = p.student_id where p.id = program_day.program_id and s.trainer_id = auth.uid())
);

drop policy if exists program_exercises_of_day on public.program_exercise;
create policy program_exercises_of_day on public.program_exercise for all using (
  exists(select 1 from public.program_day d join public.program p on p.id = d.program_id join public.student s on s.id = p.student_id where d.id = program_exercise.program_day_id and s.trainer_id = auth.uid())
) with check (
  exists(select 1 from public.program_day d join public.program p on p.id = d.program_id join public.student s on s.id = p.student_id where d.id = program_exercise.program_day_id and s.trainer_id = auth.uid())
);

drop policy if exists exercise_read_all on public.exercise;
create policy exercise_read_all on public.exercise for select using (true);
