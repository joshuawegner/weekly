import { NextRequest, NextResponse } from "next/server";

import { deleteTask } from "@/lib/tasks";

export const revalidate = 0;

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id?: string }> }) {
  const { id: idParam } = await context.params;

  if (!idParam || !/^\d+$/.test(idParam)) {
    return NextResponse.json(
      { message: "Task id must be a positive integer." },
      { status: 400 },
    );
  }

  const taskId = Number.parseInt(idParam, 10);

  try {
    const deleted = await deleteTask(taskId);

    if (!deleted) {
      return NextResponse.json(
        { message: "Task not found." },
        { status: 404 },
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to delete task ${taskId}`, error);
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 },
    );
  }
}
