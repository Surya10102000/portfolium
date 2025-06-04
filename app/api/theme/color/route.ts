// app/api/theme/color/route.ts
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { Portfolio } from "@/models/Portfolio";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const { color } = await req.json();
    
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: user._id },  
      { $set: { primaryColor: color } },
      { new: true, upsert: true }  // Return updated doc, create if doesn't exist
    );

    return NextResponse.json({ success: true, portfolio: updatedPortfolio });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update color", err },
      { status: 500 }
    );
  }
}