import { AuthForm } from "@/components/auth-form";
import { signUp } from "@/lib/actions/sign-up";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

const signUpPage = async () => {
	const { user } = await validateRequest();

	if (user) redirect("/");

	return (
		<div className="w-full h-svh grid place-items-center">
			<main className="max-w-md rounded-md border p-6">
        <AuthForm action={signUp} submitText="Sign Up" />
			</main>
		</div>
	);
};

export default signUpPage;
