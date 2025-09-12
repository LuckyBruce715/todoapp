"use client";

import { signIn, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SignInButton() {
  const { data: session, isPending } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (isPending) {
    return <Button disabled>Loading...</Button>;
  }

  if (session) {
    return null;
  }

  const handleSignIn = async () => {
    if (isSigningIn) return;
    
    try {
      setIsSigningIn(true);
      console.log("Starting sign in process...");
      console.log("Base URL:", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
      
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      
      console.log("Sign in result:", result);
    } catch (error: unknown) {
      console.error("Sign in failed:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : String(error);
      
      alert(`Sign in failed: ${errorMessage}. Check console for details.`);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isSigningIn}
    >
      {isSigningIn ? "Signing in..." : "Sign in"}
    </Button>
  );
}
