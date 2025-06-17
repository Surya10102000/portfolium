// app/api/theme/template/route.ts
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { Portfolio } from "@/models/Portfolio";
import { UserData } from "@/types/userData";
import dbConnect from "@/lib/connectDB";

export async function PUT(req: Request) {
  try {
    dbConnect();
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { template }: { template: string } = await req.json();

    const updatedPortfolio : UserData = await Portfolio.findOneAndUpdate(
      { userId: user._id },
      { template },
      { new: true, upsert: true }
    );

    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: "Failed to update portfolio" },
        { status: 500 }
      );
    }

    console.log(updatedPortfolio);

    return NextResponse.json({
      success: true,
      template: updatedPortfolio.template,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update template", err },
      { status: 500 }
    );
  }
}
