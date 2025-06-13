import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPortfolio extends Document {
  userId: Schema.Types.ObjectId;
  template : string;
  hero: {
    name: string;
    role?: string;
    description?: string;
    image?: string;
  };
  about?: {
    aboutMe: string;
    whatIDo: string;
    techStack?: string[];
  };
  projects?: Array<{ 
    projectName: string;
    description: string;
    date?: string;
    image?: string;
    projectLink?: string; 
    techStack?: string[]; 
  }>;
  experience?: Array<{ 
    role: string;
    duration: string;
    company: string;
    description?: string;
  }>;
  education?: Array<{ 
    universityName: string;
    courseName: string;
    description?: string;
    duration?: string;
  }>;
  contact?: {
    email: string;
    socials: Array<{
      platform: string; 
      url: string; 
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
}