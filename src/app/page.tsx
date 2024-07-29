import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/sign-out";
import { validateRequest } from "@/lib/validate-request";
import Link from "next/link";

const Home = async () => {
	const { user } = await validateRequest();

	if (!user) {
		return (
			<main className="max-w-md bg-white rounded-md shadow-md flex flex-col gap-4 p-6">
				<h1 className="text-2xl">Please Sign In or Sign Up</h1>
				<Button className="w-full py-4 flex justify-center" asChild>
					<Link href="/sign-in">Sign In</Link>
				</Button>
				<Button
					variant="outline"
					className="w-full py-4 flex justify-center"
					asChild
				>
					<Link href="/sign-up">Sign Up</Link>
				</Button>
			</main>
		);
	}

	return (
		<main className="max-w-md bg-white rounded-md shadow-md flex flex-col gap-4 p-6">
			<h1 className="text-2xl">Hello, {user.username}</h1>
			<form action={signOut}>
				<Button className="w-full py-4 flex justify-center" type="submit">
					Sign Out
				</Button>
			</form>
		</main>
	);
};

export default Home;
