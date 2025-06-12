import { Portfolio } from "@/models/Portfolio";
import User from "@/models/User";
import { Contact } from "@/types/userData";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData: Contact = (await req.json()).formData;
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { contact } = await Portfolio.findOneAndUpdate(
      { userId: user._id },
      { $set: { contact: formData } },
      { new: true, upsert: true }
    );

    return NextResponse.json(contact, { status: 200 });
  } catch (err: unknown) {
    console.error("Error in hero form handler:", err instanceof Error ? err.message : 'Unknown error');
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
