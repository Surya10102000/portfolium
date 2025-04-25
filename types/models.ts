import { Document, Schema, Model, model } from 'mongoose';

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
  about: {
    title: string;
    description: string;
    image?: string;
  };
  projects: Array<{
    title: string;
    description: string;
    url?: string;
    image?: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
  }>;
  contact: {
    email: string;
    socials: Array<{
      platform: string;
      url: string;
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
}