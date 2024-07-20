import { cookies } from "next/headers"
import { lucia } from "../auth"
import { validateRequest } from "../validate-request"
import { redirect } from "next/navigation"

export const signOut = async (): Promise<ActionResult> => {
  "use server"

  const { session } = await validateRequest()

  if(!session) {
    return {
      error: "Unauthorized"
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect("/")
} 

interface ActionResult {
  error: string
}
