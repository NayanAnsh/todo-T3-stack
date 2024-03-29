import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas/authSchema";
import { getUserByEmail } from "./data/user";

export default {
  providers: [ 
    GitHub({clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRECT,}),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRECT,
    })
    ,Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);
      if (validatedFields.success) {
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) return user;
      }
      return null;
    },
  }),],
} satisfies NextAuthConfig

//        const user = {password:(await bcrypt.hash("todo",10)).toString()}//await getUserByEmail(email);
