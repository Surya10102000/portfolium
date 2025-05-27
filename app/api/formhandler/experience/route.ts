import { NextResponse } from "next/server";
import { Portfolio } from "@/models/Portfolio";
import { getServerSession } from "next-auth";
import { Experience } from "@/types/userData";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { formData }: { formData: Experience } = await req.json();
    
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: user._id },
      { $push: { experience: formData } },
      { new: true, upsert: true }
    );

    const experience: Experience = updatedPortfolio.experience.slice(-1)[0];

    return NextResponse.json(experience, { status: 200 });

  } catch (error) {
    console.error("Error adding experience:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { experienceId, formData }: { experienceId: string; formData: Experience } = await req.json();
    
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: user._id, "experience._id": experienceId },
      {
        $set: {
          "experience.$.role": formData.role,
          "experience.$.duration": formData.duration,
          "experience.$.company": formData.company,
          "experience.$.description": formData.description,
        },
      },
      { new: true }
    );

    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    const updatedExperience = updatedPortfolio.experience;

    return NextResponse.json(updatedExperience, { status: 200 });

  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.log("Deleting exp")
    const { experienceId }: { experienceId: string } = await req.json();
    console.log(experienceId)
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: user._id },
      { $pull: { experience: { _id: experienceId } } },
      { new: true }
    );

    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Experience deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}