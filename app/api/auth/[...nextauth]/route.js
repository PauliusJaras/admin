import NextAuth, { getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import axios from "axios";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    signIn: async ({ user }) => {
      const isAllowedToSignIn = await checkAdminEmails(user?.email);
      return isAllowedToSignIn;

    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function isAdminRequest() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw "Users that are not admins are not allowed to make requests";
  }
}

async function checkAdminEmails(email) {
  const adminEmails = await axios.get(
    process.env.NEXTAUTH_URL +"/api/admins?email=" + email
  );
  const data = adminEmails.data;
  return data;
}
