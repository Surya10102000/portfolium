import { Schema, model, models } from 'mongoose';
import { IUser } from '../types/models';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Check if model already exists before creating it
export default models?.User || model<IUser>('User', UserSchema);