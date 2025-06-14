import { NextResponse } from "next/server";
import { Portfolio } from "@/models/Portfolio";
import { getServerSession } from "next-auth";
import { Experience } from "@/types/userData";
import User from "@/models/User";
import mongoose from "mongoose";

type ExperienceDocument = Experience & {
  _id: mongoose.Types.ObjectId;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formData }: { formData: Experience } = await req.json();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body once
    const requestBody = await req.json();
    const { experienceId, formData } = requestBody;

    // Validate required fields
    if (!experienceId || !formData) {
      return NextResponse.json(
        { error: "Missing experienceId or formData" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create update object dynamically
    const updateObj: Record<string, unknown> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        updateObj[`experience.$.${key}`] = value;
      }
    });

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      {
        userId: user._id,
        "experience._id": experienceId,
      },
      { $set: updateObj },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    // Find and return the updated experience
    const updatedExperience = updatedPortfolio.experience.find(
      (exp: ExperienceDocument) => exp._id.toString() === experienceId
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { error: "Updated experience not found in array" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedExperience, { status: 200 });
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { experienceId }: { experienceId: string } = await req.json();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
