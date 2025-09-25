"use client";

import { useSession, signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const { data: session, isPending } = useSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/30 dark:via-slate-900/30 dark:to-indigo-950/30">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/30 dark:via-slate-900/30 dark:to-indigo-950/30">
      <Card className="w-full max-w-md border-2 border-slate-200 dark:border-slate-800/50 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
              <Briefcase className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              TaskAgent
            </h1>
          </div>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Welcome back!</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Sign in to manage tasks efficiently with TaskAgent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-6"></div>
          
          <Button
            onClick={async () => {
              await signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
              });
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            size="lg"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
          
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            Free forever • No credit card required • Set up in 30 seconds
          </div>
          
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/50 dark:to-purple-950/50 rounded-lg p-4 mt-6 border border-pink-100 dark:border-pink-900/50">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="font-semibold mb-1">✨ What you&apos;ll get:</div>
              <div className="space-y-1">
                <div>• AI-powered task categorization</div>
                <div>• Smart priority detection</div>
                <div>• Beautiful, clutter-free interface</div>
                <div>• Secure cloud synchronization</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
