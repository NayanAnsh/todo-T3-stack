"use server";
import { signIn } from "@/auth";

export const OnClick = async (provider: "google" | "github") => {
  await signIn(provider, {
    redirectTo: '/',
  });
};
