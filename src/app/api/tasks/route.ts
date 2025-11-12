import { NextResponse } from "next/server";

import { createTask, getTasks } from "@/lib/tasks";

type CreateTaskRequest = {
  curriculum: string;
  task: string;
  platform: string;
  dueDate: string;
};

export const revalidate = 0;

export async function GET() {
  try {
    const tasks = await getTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    return NextResponse.json({ message: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<CreateTaskRequest>;
    const requiredFields: Array<keyof CreateTaskRequest> = ["curriculum", "task", "platform", "dueDate"];

    for (const field of requiredFields) {
      const value = payload[field];

      if (typeof value !== "string" || value.trim() === "") {
        return NextResponse.json(
          { message: `"${field}" must be a non-empty string.` },
          { status: 400 },
        );
      }
    }

    const dueDate = new Date(payload.dueDate ?? "");

    if (Number.isNaN(dueDate.getTime())) {
      return NextResponse.json(
        { message: "dueDate must be a valid ISO 8601 date string." },
        { status: 400 },
      );
    }

    const normalizedDueDate = dueDate.toISOString().slice(0, 10);

    const task = await createTask({
      curriculum: payload.curriculum!.trim(),
      task: payload.task!.trim(),
      platform: payload.platform!.trim(),
      dueDate: normalizedDueDate,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Failed to create task", error);
    return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
  }
}
