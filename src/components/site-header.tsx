import Link from "next/link";
import { UserProfile } from "@/components/auth/user-profile";
import { ModeToggle } from "./ui/mode-toggle";
import { Cat, Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-pink-100 dark:border-pink-900/30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link
            href="/"
            className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors group"
          >
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-md group-hover:shadow-lg transition-shadow">
                <Cat className="h-6 w-6" />
              </div>
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">
              KittyTask
            </span>
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <UserProfile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}