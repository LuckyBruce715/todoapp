import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  fetchOptions: {
    onError(context) {
      console.error("Auth client error details:", {
        error: context.error,
        request: context.request,
        response: context.response,
        url: context.request?.url,
        status: context.response?.status,
        statusText: context.response?.statusText,
      });
    },
  },
})

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient