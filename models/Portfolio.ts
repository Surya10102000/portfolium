import { Schema, model } from "mongoose";
import { IPortfolio } from "../types/models";

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    about: {
      title: { type: String, default: "About Me" },
      description: { type: String, default: "" },
      image: String,
    },
    projects: [
      {
        title: String,
        description: String,
        url: String,
        image: String,
      },
    ],
    skills: [
      {
        name: String,
        level: { type: Number, min: 0, max: 100 },
      },
    ],
    contact: {
      email: String,
      socials: [
        {
          platform: String,
          url: String,
        },
      ],
    },
  },
  { timestamps: true }
);

export default model<IPortfolio>("Portfolio", PortfolioSchema);
