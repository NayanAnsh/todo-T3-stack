"use client";
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { LoginSchema } from '@/schemas/authSchema';
import { FcGoogle } from "react-icons/fc";
import {FaGithub} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from '@/actions/login';
import { OnClick } from '@/actions/socialLogin';


const Login_page = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password:"",
        },
      })
      function onSubmit(values: z.infer<typeof LoginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        login(values)
        console.log("Submit")
        console.log(values)
      }
  return (
    <div>

  
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input  placeholder="email" {...field} />
            </FormControl>
            <FormDescription>
              Your Email
            </FormDescription>
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
              <Input type='password' placeholder="password" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  <Button
        size="lg"
        variant="outline"
        onClick={() => {
          OnClick("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          OnClick("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
  </div>
  )
}

export default Login_page