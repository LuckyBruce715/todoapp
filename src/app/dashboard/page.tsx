"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Todo, CreateTodoRequest, TodoCategory, TodoPriority } from "@/lib/types/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Calendar, Cat, Heart, Sparkles, Star } from "lucide-react";

const CATEGORY_COLORS: Record<TodoCategory, string> = {
  work: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  personal: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  shopping: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  health: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
  travel: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  education: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
  finance: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  home: "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300",
  entertainment: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300",
};

const PRIORITY_COLORS: Record<TodoPriority, string> = {
  high: "border-l-rose-400 bg-rose-50/50 dark:bg-rose-950/20",
  medium: "border-l-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
  low: "border-l-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
};

const PRIORITY_BADGES: Record<TodoPriority, { color: string; icon: React.ReactElement }> = {
  high: { color: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300", icon: <Star className="h-3 w-3" /> },
  medium: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300", icon: <Star className="h-3 w-3" /> },
  low: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300", icon: <Star className="h-3 w-3" /> },
};

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<CreateTodoRequest>({
    title: "",
    description: "",
    dueDate: "",
  });

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchTodos();
    }
  }, [session?.user]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
            <Cat className="h-5 w-5" />
            <span>Loading your tasks...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    redirect("/sign-in");
  }

  const handleAddTodo = async () => {
    if (!newTodo.title.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const todo = await response.json();
        setTodos([todo, ...todos]);
        setNewTodo({ title: "", description: "", dueDate: "" });
        setIsAddDialogOpen(false);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter(t => t.id !== todoId));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-12 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900/50 dark:to-purple-900/50 animate-pulse rounded-xl"></div>
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 animate-pulse rounded-xl border-l-4 border-pink-300"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-lg">
                  <Cat className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    My Tasks
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Heart className="h-4 w-4 text-pink-400" />
                    <span>
                      {completedCount} of {totalCount} tasks completed
                    </span>
                    {completedCount === totalCount && totalCount > 0 && (
                      <span className="text-pink-500">🎉 All done!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="border-2 border-pink-100 dark:border-pink-900/50">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <Cat className="h-5 w-5 text-pink-500" />
                    Add New Task
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Tell me what you need to do, and I&apos;ll help you organize it! 🐾
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="What needs to be done?"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="border-pink-200 dark:border-pink-800 focus:border-pink-400"
                  />
                  <Textarea
                    placeholder="Any extra details? (optional)"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="border-pink-200 dark:border-pink-800 focus:border-pink-400"
                  />
                  <Input
                    type="date"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                    className="border-pink-200 dark:border-pink-800 focus:border-pink-400"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-pink-200 dark:border-pink-800">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddTodo} 
                    disabled={!newTodo.title.trim()}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    Add Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Progress Bar */}
          {totalCount > 0 && (
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-pink-100 dark:border-pink-900/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round((completedCount / totalCount) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Tasks */}
          {todos.length === 0 ? (
            <Card className="py-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-2 border-pink-100 dark:border-pink-900/50">
              <CardContent className="text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-400 to-purple-500 text-white mx-auto mb-6 shadow-lg">
                  <Cat className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  No tasks yet! 
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Ready to get organized? Add your first task and let our AI kitten help you categorize it perfectly! 🐱
                </p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
                  size="lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Your First Task
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {todos.map((todo) => (
                <Card 
                  key={todo.id} 
                  className={`${PRIORITY_COLORS[(todo.priority as TodoPriority) || "medium"]} border-l-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-pink-100 dark:border-pink-900/50 hover:shadow-lg transition-all duration-200`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => handleToggleComplete(todo)}
                          className="border-pink-300 dark:border-pink-700 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                        />
                        <div className="flex-1 min-w-0">
                          <CardTitle className={`text-lg leading-tight ${
                            todo.completed 
                              ? "line-through text-gray-400 dark:text-gray-600" 
                              : "text-gray-900 dark:text-gray-100"
                          }`}>
                            {todo.title}
                          </CardTitle>
                          {todo.description && (
                            <p className={`text-sm mt-1 ${
                              todo.completed 
                                ? "text-gray-400 dark:text-gray-600" 
                                : "text-gray-600 dark:text-gray-400"
                            }`}>
                              {todo.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {todo.category && (
                          <Badge variant="secondary" className={CATEGORY_COLORS[todo.category as TodoCategory]}>
                            {todo.category}
                          </Badge>
                        )}
                        {todo.priority && (
                          <Badge variant="outline" className={PRIORITY_BADGES[(todo.priority as TodoPriority)].color}>
                            <span className="flex items-center gap-1">
                              {PRIORITY_BADGES[(todo.priority as TodoPriority)].icon}
                              {todo.priority}
                            </span>
                          </Badge>
                        )}
                      </div>
                      {todo.dueDate && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(todo.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}