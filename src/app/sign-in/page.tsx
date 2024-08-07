import { AuthForm } from "@/components/auth-form";
import { signIn } from "@/lib/actions/sign-in";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

const signInPage = async () => {
	const { user } = await validateRequest();

	if (user) redirect("/");
	return (
		<main className="max-w-md bg-white rounded-md shadow-md p-6">
			<AuthForm action={signIn} submitText="Sign In" />
		</main>
	);
};

export default signInPage;
