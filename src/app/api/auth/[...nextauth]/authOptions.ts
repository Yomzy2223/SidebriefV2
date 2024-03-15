import { Client } from "@/lib/axios";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Awaitable, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        if (profile.name && profile.email && profile.sub) {
          const { name, email, sub, picture } = profile;
          try {
            const client = await Client();
            const payload = {
              fullName: name,
              email,
              picture,
              googleId: sub,
              isPartner: false,
              isStaff: true,
            };
            const response = await client.post("/users/google", payload);
            return { id: sub, ...response.data };
          } catch (e: any) {
            console.log(e);
            throw new Error(e);
          }
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "signUp",
      name: "Sign up",
      credentials: {
        fullName: { label: "Full Name" },
        email: { label: "Email" },
        password: { label: "Password" },
        referral: { label: "Referral" },
      },
      authorize: async (credentials) => {
        try {
          if (
            credentials?.fullName &&
            credentials?.email &&
            credentials?.password &&
            credentials?.referral
          ) {
            const client = await Client();
            const { fullName, email, password, referral } = credentials;
            const payload = {
              fullName,
              email,
              password,
              referral,
              isStaff: false,
              isPartner: false,
            };
            const response = await client.post("/users", JSON.stringify(payload), {
              headers: { "Content-Type": "application/json" },
            });
            if (response.data) return response.data as Awaitable<User>;
            return null;
          }
        } catch (e: any) {
          throw new Error(e.response.data.error);
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "signIn",
      name: "Sign In",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      authorize: async (credentials, req) => {
        try {
          if (credentials?.email && credentials?.password) {
            const client = await Client();
            const { email, password } = credentials;
            const response = await client.post(
              "/users/login",
              JSON.stringify({ email, password }),
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            console.log(response.data);
            if (response.data) return response.data as Awaitable<User>;
          }
          return null;
        } catch (e: any) {
          throw new Error(e.response.data.error);
        }
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
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token as Awaitable<JWT>;
    },
    async session({ session, token }) {
      session.user = token.user.data;
      session.message = token.user.message;
      return session as Awaitable<Session>;
    },
  },
};
