import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Données de test - en production, ce serait une base de données
const testUsers = [
  {
    id: "1",
    email: "jean.dupont@example.com",
    name: "Jean Dupont",
    password: "password123", // Hash en production!
    avatar: "👨‍💼",
    plan: "Pro",
  },
  {
    id: "2",
    email: "marie.martin@example.com",
    name: "Marie Martin",
    password: "password123",
    avatar: "👩‍💼",
    plan: "Starter",
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = testUsers.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error("Utilisateur non trouvé");
        }

        // En production, utiliser bcrypt pour vérifier le hash
        if (user.password !== credentials.password) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          plan: user.plan,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.avatar = user.avatar;
        token.plan = user.plan;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.avatar = token.avatar;
        session.user.plan = token.plan;
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

  secret: process.env.NEXTAUTH_SECRET || "neurix-secret-key-2026",
};

export default NextAuth(authOptions);
