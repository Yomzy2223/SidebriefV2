import { Client } from "@/lib/axios";
import NextAuth, { Awaitable, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
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
      async authorize(credentials) {
        try {
          if (
            credentials?.fullName &&
            credentials?.email &&
            credentials?.password &&
            credentials?.referral &&
            credentials?.isStaff
          ) {
            const client = await Client();
            const { fullName, email, password, referral, isStaff, isPartner } = credentials;
            const payload = {
              fullName,
              email,
              password,
              referral,
              isStaff: isStaff === "true" ? true : false,
              isPartner: isPartner === "true" ? true : false,
            };
            const response = await client.post("/users", payload, {
              headers: { "Content-Type": "application/json" },
            });
            if (response.data) return response.data as Awaitable<User>;
            return null;
          }
        } catch (e: any) {
          throw new Error(e.response.data.error);
        }
      },
    }),
    CredentialsProvider({
      id: "signIn",
      async authorize(credentials, req) {
        if (credentials?.email && credentials?.password) {
          try {
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
          } catch (e: any) {
            throw new Error(e.response.data.error);
          }
          return null;
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
      console.log("Tokkkken: ", token);
      session.user = token.user.data;
      session.message = token.user.message;
      // console.log("Returning session", session);
      return session as Awaitable<Session>;
    },
  },
});

export { handler as GET, handler as POST };
