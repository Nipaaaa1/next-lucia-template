import { generateIdFromEntropySize } from "lucia";
import { AuthSchema } from "../validations"
import { hash } from "@node-rs/argon2";
import { db } from "../db"
import { lucia } from "../auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (formData: FormData): Promise<ActionResult> => {
  "use server"

  const data = {
    username: formData.get("username"),
    password: formData.get("password")
  }

  const validatedData = AuthSchema.safeParse(data)

  if(!validatedData.success) {
    console.log(validatedData.error)
    return {
      error: validatedData.error.message
    }
  }

  const passwordHash = await hash(validatedData.data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  const userId = generateIdFromEntropySize(10)

  const existingUser = await db.user.findUnique({
    where: {
      username: validatedData.data.username
    }
  })

  if(existingUser) {
    return {
      error: "Username is already taken"
    }
  }

  await db.user.create({
    data: {
      id: userId,
      username: validatedData.data.username,
      password_hash: passwordHash
    }
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect("/")

}

interface ActionResult {
  error: string
}
