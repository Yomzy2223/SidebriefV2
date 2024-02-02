import NextAuth from "next-auth/next";

interface User {
  email: string;
  fullname?: string;
  id: string;
  isPartner: boolean;
  isStaff: boolean;
  isVerified: boolean;
  phone?: number;
  picture?: string;
  referral?: string;
  refreshToken: string;
  token: string;
  tokenExpiresIn: number;
  userName?: string;
}

interface JWT {}

declare module "next-auth" {
  interface User extends User {}

  interface Session {
    user: typeof User;
    message: string;
  }

  interface Profile extends User {
    name: string;
    family_name: string;
    given_name: string;
    exp: number;
    picture: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: typeof User;
  }
}
