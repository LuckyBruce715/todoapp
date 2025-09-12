import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { todo } from "@/lib/schema";
import { CreateTodoRequest } from "@/lib/types/todo";
import { categorizeTodo } from "@/lib/ai-categorizer";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await db
      .select()
      .from(todo)
      .where(eq(todo.userId, session.user.id))
      .orderBy(desc(todo.createdAt));

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateTodoRequest = await request.json();
    
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const { category, priority } = await categorizeTodo(body.title, body.description);

    const [newTodo] = await db
      .insert(todo)
      .values({
        title: body.title.trim(),
        description: body.description?.trim(),
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        category,
        priority,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}