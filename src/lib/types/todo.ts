import { todo } from "@/lib/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type Todo = InferSelectModel<typeof todo>;
export type NewTodo = InferInsertModel<typeof todo>;

export interface CreateTodoRequest {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

export type TodoCategory = 
  | "work"
  | "personal" 
  | "shopping"
  | "health"
  | "travel"
  | "education"
  | "finance"
  | "home"
  | "entertainment"
  | "other";

export type TodoPriority = "low" | "medium" | "high";