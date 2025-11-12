import { runQuery } from "@/lib/db";

export type Task = {
  id: number;
  curriculum: string;
  task: string;
  platform: string;
  dueDate: string;
};

type DbTaskRow = {
  id: number;
  curriculum: string;
  task: string;
  platform: string;
  due_date: string;
};

function mapRowToTask(row: DbTaskRow): Task {
  return {
    id: row.id,
    curriculum: row.curriculum,
    task: row.task,
    platform: row.platform,
    dueDate: row.due_date,
  };
}

export async function getTasks(): Promise<Task[]> {
  const { rows } = await runQuery<DbTaskRow>(
    `SELECT id, curriculum, task, platform, to_char(due_date, 'YYYY-MM-DD') AS due_date
     FROM tasks
     ORDER BY due_date ASC, id ASC`,
  );

  return rows.map(mapRowToTask);
}

export async function createTask(input: {
  curriculum: string;
  task: string;
  platform: string;
  dueDate: string;
}): Promise<Task> {
  const { curriculum, task, platform, dueDate } = input;

  const { rows } = await runQuery<DbTaskRow>(
    `INSERT INTO tasks (curriculum, task, platform, due_date)
     VALUES ($1, $2, $3, $4)
     RETURNING id, curriculum, task, platform, to_char(due_date, 'YYYY-MM-DD') AS due_date`,
    [curriculum, task, platform, dueDate],
  );

  return mapRowToTask(rows[0]);
}

export async function deleteTask(taskId: number): Promise<boolean> {
  const result = await runQuery<{ id: number }>(
    `DELETE FROM tasks
     WHERE id = $1
     RETURNING id`,
    [taskId],
  );

  return (result.rowCount ?? 0) > 0;
}
