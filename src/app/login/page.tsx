"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Login to Gift Guide</h1>
      <div className="space-y-4">
        <Button onClick={() => signIn('google', { callbackUrl: '/onboarding' })}>
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}

