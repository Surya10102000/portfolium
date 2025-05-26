import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/connectDB";
import User from "@/models/User";
import { Portfolio } from "@/models/Portfolio";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await dbConnect();
      return session;
    },
    async signIn({ profile }) {
      try {
        if (profile === undefined) {
          return false;
        }
        await dbConnect();
        // Add your user to database logic here
        const user = await User.findOne({ email: profile.email });

        if (!user) {
          const newUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.image,
            username: profile.email,
          });

          await Portfolio.create({
            userId: newUser._id,
            hero: {
              name: newUser.name,
              image: newUser.image,
            },
            about: {
              aboutMe: "",
              whatIDo: "",
            },
            projects: [],
            experience: [],
            education: [],
            contact: {
              email: newUser.email,
              socials: [],
            },
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
