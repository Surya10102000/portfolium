import { Portfolio } from "@/models/Portfolio";
import User from "@/models/User";
import { Project } from "@/types/userData";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type ProjectDocument = Project & {
  _id: mongoose.Types.ObjectId;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formData }: { formData: Project } = await req.json();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: user._id },
      { $push: { projects: formData } },
      { new: true, upsert: true }
    );
    const project: Project = updatedPortfolio.projects.slice(-1)[0];

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error adding project:", error);
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
    const { projectId, formData } = requestBody;

    // Validate required fields
    if (!projectId || !formData) {
      return NextResponse.json(
        { error: "Missing projectId or formData" },
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
        updateObj[`projects.$.${key}`] = value;
      }
    });

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      {
        userId: user._id,
        "projects._id": projectId,
      },
      { $set: updateObj },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Find and return the updated project
    const updatedProject = updatedPortfolio.projects.find(
      (pro: ProjectDocument) => pro._id.toString() === projectId
    );

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Updated project not found in array" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}