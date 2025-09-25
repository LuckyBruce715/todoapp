"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Sparkles, Brain, Shield, Layers, Zap, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Smart Sorting",
      description: "Automatically categorize and prioritize tasks using intelligent analysis."
    },
    {
      icon: <Layers className="h-8 w-8 text-indigo-600" />,
      title: "Clean, Focused Interface",
      description: "A streamlined UI that helps you stay organized without distractions."
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      title: "Lightning Fast",
      description: "Capture and organize tasks in seconds with minimal clicks."
    },
    {
      icon: <Shield className="h-8 w-8 text-slate-600" />,
      title: "Secure & Private",
      description: "Sign in with Google OAuth; store data securely with encrypted storage."
    }
  ];

  const testimonials = [
    {
      text: "TaskAgent keeps my priorities clear and my work moving.",
      author: "Sarah M.",
      role: "Freelance Designer"
    },
    {
      text: "The categorization and clean UI reduced my planning time drastically.",
      author: "Mike K.",
      role: "Software Developer"
    },
    {
      text: "Simple to use, fast, and reliable—exactly what I needed.",
      author: "Emma L.",
      role: "Student"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/30 dark:via-slate-900/30 dark:to-indigo-950/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo & Title */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                <Briefcase className="h-10 w-10" />
              </div>
              <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100">
                TaskAgent
              </h1>
            </div>

            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
              Professional task management—organized, fast, and secure.
            </p>
            
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let AI help you tame your chaotic todo list with the warmth and playfulness you deserve. 
              No more overwhelming task management - just simple, smart, and delightfully cute organization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {session?.user ? (
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg text-lg px-8 py-4">
                  <Link href="/dashboard">
                    Open My Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg text-lg px-8 py-4">
                  <Link href="/sign-in">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Sparkles className="mr-1 h-4 w-4" />
                100% Free Forever
              </Badge>
            </div>

            {/* Quick Preview */}
            <div className="relative max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border-2 border-pink-100 dark:border-pink-900/50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-4 text-sm text-gray-500">TaskAgent Dashboard</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-400">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Review quarterly reports</span>
                    <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">work</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border-l-4 border-green-400">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Buy groceries for dinner</span>
                    <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">shopping</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border-l-4 border-slate-400">
                    <CheckCircle className="h-4 w-4 text-slate-600" />
                    <span className="text-gray-700 dark:text-gray-300">Call mom this weekend</span>
                    <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">personal</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Why Choose TaskAgent
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We&apos;ve packed all the features you need to stay organized, with none of the complexity you don&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Happy Humans (and their Cats)
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how TaskAgent helps teams and individuals focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 transition-colors duration-300">
                <CardContent className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Streamline Your Workflow?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who organize priorities and deliver work on time
              with TaskAgent. It&apos;s fast, focused, and effective!
            </p>
            
            {session?.user ? (
              <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-4">
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-4">
                <Link href="/sign-in">
                  Start Organizing Today
                </Link>
              </Button>
            )}
            
            <p className="text-sm mt-4 opacity-75">
              No credit card required • Set up in under 30 seconds
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
