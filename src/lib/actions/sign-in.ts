"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "../auth";
import { db } from "../db";
import { AuthSchema, type AuthSchemaType } from "../validations";

export const signIn = async (data: AuthSchemaType): Promise<ActionResult> => {
	const validatedData = AuthSchema.safeParse(data);

	if (validatedData.error) {
		return {
			error: validatedData.error.message,
		};
	}

	const existingUser = await db.user.findFirst({
		where: {
			username: validatedData.data.username,
		},
	});

	if (!existingUser) {
		return {
			error: "Incorrect username or password",
		};
	}

	const validatedPassword = await verify(
		existingUser.password_hash,
		validatedData.data.password,
		{
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		},
	);

	if (!validatedPassword) {
		return {
			error: "Incorrect username or password",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/");
};

interface ActionResult {
	error: string;
}
