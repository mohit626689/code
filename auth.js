import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import clientPromise from "./libs/mongo";

const config = {
  providers: [
    Resend({
      apikey: process.env.RESEND_KEY,
      from: "noreply@resend.codefastsaas.com",
      name: "email",
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
