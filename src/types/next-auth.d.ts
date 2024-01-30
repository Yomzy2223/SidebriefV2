import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    email: string;
    password: string;
  }

  interface Session {
    user: User;
  }
}
