import NextAuth, { getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb";

const adminEmails = ['pjariukas@gmail.com', "paulius.jaras@outlook.com"]

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user}) => {
      if(adminEmails.includes(session?.user?.email)) {
        return session;
      } else{
        return false;
      }
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function  isAdminRequest(){
  const session = await getServerSession(authOptions);
  if(!adminEmails.includes(session?.user?.email)) {
    throw 'Users that are not admins are not allowed to make requests';
  } 
}
