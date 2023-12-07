import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the User document structure
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  role: String
}

// Schema definition for the User model
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  role: { type: String, required: true }
});

// Create and export the User model based on the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;