"use client"

import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

export const AuthProvider = (props: PropsWithChildren) => {
  return <SessionProvider>{props.children}</SessionProvider>
}