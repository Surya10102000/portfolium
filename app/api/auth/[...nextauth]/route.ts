import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/connectDB";
import User from "@/models/User";
import { Portfolio } from "@/models/Portfolio";
import { generateUsername } from "@/utils/generateUsername";

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

        // Check if user exists
        const user = await User.findOne({ email: profile.email });

        if (!user) {
          // Create new user and portfolio for first-time sign-in
          const newUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: "",
            username: generateUsername(profile?.name as string),
          });

          await Portfolio.create({
            userId: newUser._id,
            template: "default",
            hero: {
              name: newUser.name,
              image: "",
            },
            about: {
              aboutMe: "",
              whatIDo: "",
            },
            projects: [],
            experience: [],
            education: [],
            contact: {
              email: profile.email,
            },
          });
        } else {
          const existingPortfolio = await Portfolio.findOne({
            userId: user._id,
          });
          if (!existingPortfolio) {
            // Create portfolio if it doesn't exist
            await Portfolio.create({
              userId: user._id,
              template: "default",
              hero: {
                name: user.name,
                image: "",
              },
              about: {
                aboutMe: "",
                whatIDo: "",
              },
              projects: [],
              experience: [],
              education: [],
              contact: {
                email: profile.email,
              },
            });
          }
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
