import { z } from "zod";

export const AuthSchema = z.object({
	username: z.string().min(4).max(16),
	password: z.string().min(6).max(16),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
