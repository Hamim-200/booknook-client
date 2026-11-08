import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import client from "@/lib/mongodb";

const db = client.db(process.env.DB_NAME || "booknook");

export const auth = betterAuth({
  // Store users, sessions and accounts in MongoDB
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    // The PDF asks for at least 6 characters (the default is 8)
    minPasswordLength: 6,
    // The PDF wants the user sent to the Login page after registering,
    // so we do not sign them in automatically
    autoSignIn: false,
  },

  // Google login
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    // Lets a logged-in user get a signed token for our Express server.
    // The public keys for checking it are served at /api/auth/jwks
    jwt({
      jwt: {
        // Only put what Express needs inside the token
        definePayload: ({ user }) => ({
          email: user.email,
          name: user.name,
        }),
      },
    }),
    // Must stay the LAST plugin. It lets Next.js save the login cookie.
    nextCookies(),
  ],
});