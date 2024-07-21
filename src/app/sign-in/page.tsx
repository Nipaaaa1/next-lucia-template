import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/actions/sign-in"
import { validateRequest } from "@/lib/validate-request"
import { redirect } from "next/navigation"

const signInPage = async () => {
  const { user } = await validateRequest()

  if(user) redirect("/")
  return (
    <div className="w-full h-svh grid place-items-center">
      <main className="max-w-md rounded-md border p-6">
        <form className="w-full flex flex-col gap-4" action={signIn}>
          <Label htmlFor="username">Username</Label>
				  <Input className="w-full" name="username" id="username" />
				  <br />
				  <Label htmlFor="password">Password</Label>
				  <Input className="w-full" type="password" name="password" id="password" />
				  <br />
				  <Button className="w-full py-4 flex justify-center" type="submit">Sign In</Button>
        </form>
      </main>
    </div>
  )
}

export default signInPage
