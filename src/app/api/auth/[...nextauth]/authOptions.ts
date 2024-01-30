import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Awaitable, User } from "next-auth";
import { Client } from "@/lib/axios";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "signup",
            name: "Sign up",
            credentials: {
                name: { label: "Full Name"},
                email: { label: "Email"},
                password: { label: "Password"},
                referral: { label: "Referral"}
            },
            authorize: async (credentials) => {
                try {
                    if (credentials?.name &&
                       credentials?.email &&
                       credentials?.password &&
                       credentials?.referral
                    ) {
                        const client = await Client();
                        const res = await client.post(
                            "/users",
                            JSON.stringify({
                                name: credentials?.name,
                                email: credentials?.email,
                                password: credentials?.password,
                                referral: credentials?.referral
                            }),
                            {
                                headers: { "Content-Type": "application/json"}
                            }
                        );

                        const user = res.data;

                        
                    }
                } catch (e: any) {
                    throw new Error(e.response.data.error);
                }
                return null
            }
        }),
        CredentialsProvider({
            id:"signin",
            name:"Sign In",
            credentials: {
                email: { label: "Email"},
                password: { label: "Password"},
            },
            authorize: async (credentials) => {
                try {
                    if( credentials?.email && credentials?.password) {
                        const client = await Client();
                        const res = await client.post(
                            "/users/login",
                            JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                              }),
                              {
                                headers: { "Content-Type": "application/json" },
                              }
                        );

                        const user = res.data;

                    }
                } catch (error) {
                    
                }
                return null
            },

        })
    ],
    callbacks: {
        jwt({ user, token }) {
          if (user) {
            token = { ...user };
            return token;
          }
          return token;
        },
        // session({ session, token }) {
        //   session.token = token.token;
        //   session.user = {
        //     id: token.id || "",
        //     email: token.email || "",
        //     name: token.name || "",
        //     lastname: token.lastname || "",
        //   }
        //   return session;
        // },
      },
}