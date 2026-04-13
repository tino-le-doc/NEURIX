import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validators";
import {
  findUserByEmail,
  findUserById,
  verifyPassword,
  toPublic,
} from "@/lib/users";
import logger from "@/lib/logger";

if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXTAUTH_SECRET must be defined in production. See .env.example."
  );
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error("Email et mot de passe requis");
        }

        const user = findUserByEmail(parsed.data.email);
        if (!user) {
          // Generic error to avoid user enumeration
          logger.warn("login failed: user not found", { email: parsed.data.email });
          throw new Error("Identifiants invalides");
        }

        const ok = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!ok) {
          logger.warn("login failed: bad password", { userId: user.id });
          throw new Error("Identifiants invalides");
        }

        const publicUser = toPublic(user);
        return {
          id: publicUser.id,
          email: publicUser.email,
          name: publicUser.name,
          avatar: publicUser.avatar,
          plan: publicUser.plan,
          role: publicUser.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.avatar = user.avatar;
        token.plan = user.plan;
        token.role = user.role;
      } else if (token?.id) {
        // Refresh derived claims from the store on subsequent requests
        const fresh = findUserById(token.id);
        if (fresh) {
          token.avatar = fresh.avatar;
          token.plan = fresh.plan;
          token.role = fresh.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.avatar = token.avatar;
        session.user.plan = token.plan;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
