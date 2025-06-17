import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { Portfolio } from "@/models/Portfolio";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found ", status: 404 });
    }
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const existingPortfolio = await Portfolio.findOne({ userId: user._id });
    if (existingPortfolio?.hero?.image?.publicId) {
      await cloudinary.uploader.destroy(existingPortfolio.hero.image.publicId);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "portfolio-images",
            tags: ["portfolio-profile"],
          },
          function (error, result) {
            if (error) {
              reject(error || new Error("Upload failed"));
              return;
            }
            // Type assertion to CloudinaryUploadResult
            resolve(result as CloudinaryUploadResult);
          }
        )
        .end(buffer);
    });

    await Portfolio.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          "hero.image": {
            url: result.secure_url,
            publicId: result.public_id,
          },
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found ", status: 404 });
    }

  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio?.hero?.image?.publicId) {
      return NextResponse.json({ error: "No image found" }, { status: 404 });
    }

    if (publicId && publicId !== portfolio.hero.image.publicId) {
      return NextResponse.json(
        { error: "Unauthorized operation" },
        { status: 403 }
      );
    }

    await cloudinary.uploader.destroy(portfolio.hero.image.publicId);

    await Portfolio.findOneAndUpdate(
      { userId: user._id },
      { $unset: { "hero.image": 1 } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
