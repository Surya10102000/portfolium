import { Portfolio } from "@/models/Portfolio";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const portfolio = await Portfolio.findOne({ userId: user._id });

    return NextResponse.json(portfolio, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error /api/profile GET" },
      { status: 500 }
    );
  }
}
