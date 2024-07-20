import { z } from "zod";

export const AuthSchema = z.object({
  username: z.string().min(4).max(16).regex(/a-zA-Z0-9/),
  password: z.string().min(6).max(16).regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/)
})

export type AuthSchemaType = z.infer<typeof AuthSchema>
