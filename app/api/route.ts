import dbConnect from "@/lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method == "GET") {
    res.status(200).json({ message: "Hello from Next.js!" });
  }
}
