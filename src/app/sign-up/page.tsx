import { AuthForm } from "@/components/auth-form";
import { signUp } from "@/lib/actions/sign-up";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

const signUpPage = async () => {
	const { user } = await validateRequest();

	if (user) redirect("/");

	return (
			<main className="max-w-md bg-white rounded-md shadow-md p-6">
        <AuthForm action={signUp} submitText="Sign Up" />
			</main>
	);
};

export default signUpPage;
