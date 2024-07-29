import { z } from "zod";

export const AuthSchema = z.object({
	username: z
		.string()
		.min(4, {
			message: "Minimum username length is 4 character(s)",
		})
		.max(16, {
			message: "Maximum username length is 16 character(s)",
		}),
	password: z
		.string()
		.min(6, {
			message: "Minimum password length is 6 character(s)",
		})
		.max(16, {
			message: "Maximum password length is 16 character(s)",
		})
		.regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
			message: "Password should include at least 1 special character(s)",
		}),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
