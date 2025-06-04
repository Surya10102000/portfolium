import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/connectDB";
import { IUser } from "@/types/models";

export type UsernameResponse = {
  username: IUser["username"]; // Strictly matches the username type from IUser
};

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { username : newUsername } = await req.json();
    if (!newUsername || newUsername.trim().length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ username: newUsername });

    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 }
      );
    }

    user.username = newUsername.trim();
    await user.save();

    return NextResponse.json({
      success: true,
      newUsername: user.username,
    });
  } catch (err) {
    console.error("Username update error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ email: userEmail })
      .select("username -_id") // Only return username, exclude _id
      .lean()
      .exec() as Pick<IUser, "username"> | null;

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      );
    }

    const response: UsernameResponse = {
      username: user.username
    };

    return NextResponse.json(response);

  } catch (err) {
    console.error("[USERNAME_GET_ERROR]:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}