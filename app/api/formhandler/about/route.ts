import { Portfolio } from "@/models/Portfolio";
import User from "@/models/User";
import { AboutSection} from "@/types/userData";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData: AboutSection = (await req.json()).formData;
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { about } = await Portfolio.findOneAndUpdate(
      { userId: user._id },
      { $set: { about: formData } },
      { new: true, upsert: true }
    );

    return NextResponse.json(about, { status: 200 });
  } catch (err: any) {
    console.error("Error in hero form handler:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
