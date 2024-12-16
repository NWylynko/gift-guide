"use server"

import { auth } from "@/auth"
import { db, schemas } from "@/db/client"

type AccentColor = "red" | "blue" | "green" | "yellow" | "purple" | "pink" | "orange" | "teal" | "indigo" | "cyan"

export const createUser = async (username: string, accentColor: AccentColor) => {

  const session = await auth();

  console.log(session)

  if (!session) {
    throw new Error("User must be authenticated to create a user")
  }

  if (!session.authId) {
    throw new Error("User must have an authId to create a user")
  }

  await db
    .insert(schemas.user)
    .values({
      authId: session.authId,
      username,
      accentColor,
    })
}