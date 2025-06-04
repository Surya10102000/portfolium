import { Portfolio } from "@/models/Portfolio";
import User from "@/models/User";
import { UserData } from "@/types/userData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const portfolio = (await Portfolio.findOne({ userId: user._id })) as UserData;

    return NextResponse.json(portfolio, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error /api/profile GET", err },
      { status: 500 }
    );
  }
}
