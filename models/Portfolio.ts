  import { IPortfolio } from "@/types/models";
  import { model, models, Schema } from "mongoose";

  const PortfolioSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hero: {
      name: { type: String },
      role: String,
      description: String,
      image: String
    },
    about: {
      aboutMe: { type: String },
      whatIDo: { type: String},
      techStack: [String]
    },
    projects: [{
      projectName: { type: String },
      description: { type: String },
      date: String,
      image: String,
      projectLink: String,
      githubLink: String,
    }],
    experience: [{
      role: { type: String },
      duration: { type: String },
      company: { type: String },
      description: String
    }],
    education: [{
      universityName: { type: String },
      courseName: { type: String },
      description: String,
      duration: String
    }],
    contact: {
      email: { type: String },
      socials: [{
        platform: { type: String },
        url: { type: String }
      }]
    }
  }, { timestamps: true });

  export const Portfolio = models?.Portfolio || model<IPortfolio>("Portfolio", PortfolioSchema);