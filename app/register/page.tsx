"use client";
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { RegisterSchema } from '@/schemas/authSchema';
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
import { RegisterUser } from '@/actions/register';
import { OnClick } from '@/actions/socialLogin';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';


const Login_page = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          username: "",
          password:"",
        },
      })
      function onSubmit(values: z.infer<typeof RegisterSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        (values)
        RegisterUser(values)
      }
  return (
    <div className='p-4' >

  
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input  placeholder="username" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="example@domain.com" {...field} />
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