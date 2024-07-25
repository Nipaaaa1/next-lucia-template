import { AuthForm } from "@/components/auth-form";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation"
import { signIn } from "@/lib/actions/sign-in";

const signInPage = async () => {
	const { user } = await validateRequest();

	if (user) redirect("/");
	return (
		<div className="w-full h-svh grid place-items-center">
			<main className="max-w-md rounded-md border p-6">
        <AuthForm action={signIn} submitText="Sign In" />
			</main>
		</div>
	);
};

export default signInPage;
