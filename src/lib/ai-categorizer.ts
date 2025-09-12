import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { TodoCategory, TodoPriority } from "./types/todo";

const categorySchema = z.object({
  category: z.enum([
    "work",
    "personal", 
    "shopping",
    "health",
    "travel",
    "education",
    "finance",
    "home",
    "entertainment",
    "other"
  ]),
  priority: z.enum(["low", "medium", "high"]),
  reasoning: z.string().optional(),
});

export async function categorizeTodo(title: string, description?: string): Promise<{
  category: TodoCategory;
  priority: TodoPriority;
}> {
  try {
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    
    const { object } = await generateObject({
      model: openai(model),
      schema: categorySchema,
      prompt: `Analyze the following todo item and categorize it:

Title: ${title}
${description ? `Description: ${description}` : ""}

Please categorize this todo item into one of these categories:
- work: Job-related tasks, meetings, projects
- personal: Personal goals, self-care, relationships
- shopping: Purchasing items, groceries, errands
- health: Medical appointments, exercise, wellness
- travel: Trip planning, bookings, travel tasks
- education: Learning, courses, studying
- finance: Bills, banking, investments, budgeting
- home: Household chores, maintenance, organization
- entertainment: Leisure activities, hobbies, fun
- other: Anything that doesn't fit the above

Also determine the priority level:
- high: Urgent or very important tasks
- medium: Important but not urgent tasks  
- low: Nice to have or can be delayed

Consider urgency indicators like "ASAP", "urgent", "today", "deadline", etc.`,
    });

    return {
      category: object.category,
      priority: object.priority,
    };
  } catch (error) {
    console.error("Error categorizing todo:", error);
    return {
      category: "other",
      priority: "medium",
    };
  }
}