import NextAuth, { Awaitable, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return profile;
      },
    }),
    CredentialsProvider({
      id: "signIn",
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize(credentials, req) {
        return credentials as Awaitable<User>;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, email, credentials, profile }) {
    //   return true;
    // },
    async redirect({ baseUrl, url }) {
      return baseUrl;
    },
    async jwt({ token, account, profile, user, session, trigger }) {
      console.log(token, account, profile, user, session, trigger);
      if (user) {
        token.user = user;
        return token as Awaitable<JWT>;
      }
      return token as Awaitable<JWT>;
    },
    async session({ newSession, session, token, trigger, user }) {
      // console.log(newSession, session, token, trigger, user);
      console.log(token);
      return session as Awaitable<Session>;
    },
  },
});

export { handler as GET, handler as POST };
