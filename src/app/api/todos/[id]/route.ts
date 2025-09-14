import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { todo } from "@/lib/schema";
import { UpdateTodoRequest } from "@/lib/types/todo";
import { eq, and } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const todoId = parseInt(resolvedParams.id);
    if (isNaN(todoId)) {
      return NextResponse.json(
        { error: "Invalid todo ID" },
        { status: 400 }
      );
    }

    const body: UpdateTodoRequest = await request.json();
    
    const updateData: Partial<typeof todo.$inferInsert> = {};
    
    if (typeof body.title === "string") {
      updateData.title = body.title.trim();
    }
    if (typeof body.description === "string") {
      updateData.description = body.description.trim();
    }
    if (typeof body.completed === "boolean") {
      updateData.completed = body.completed;
    }
    if (body.dueDate) {
      updateData.dueDate = new Date(body.dueDate);
    }
    if (body.priority) {
      updateData.priority = body.priority;
    }

    updateData.updatedAt = new Date();

    const [updatedTodo] = await db
      .update(todo)
      .set(updateData)
      .where(and(eq(todo.id, todoId), eq(todo.userId, session.user.id)))
      .returning();

    if (!updatedTodo) {
      return NextResponse.json(
        { error: "Todo not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const todoId = parseInt(resolvedParams.id);
    if (isNaN(todoId)) {
      return NextResponse.json(
        { error: "Invalid todo ID" },
        { status: 400 }
      );
    }

    const [deletedTodo] = await db
      .delete(todo)
      .where(and(eq(todo.id, todoId), eq(todo.userId, session.user.id)))
      .returning();

    if (!deletedTodo) {
      return NextResponse.json(
        { error: "Todo not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}