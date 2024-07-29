"use client"

import { type AuthSchemaType, AuthSchema } from "@/lib/validations"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AuthFormProps {
  submitText: string,
  action: (data: AuthSchemaType) => Promise<{ error: string}>
}

export const AuthForm = ({ action, submitText }: AuthFormProps) => {
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data) => {
    const result = await action(data)
    if(result) {
      form.setError("root", {
        message: result.error
      })
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">{ submitText }</Button>
        {form.formState.errors.root?.message ? (
          <p>{form.formState.errors.root.message}</p>
        ) : null}
      </form>
    </Form>
  )
}
