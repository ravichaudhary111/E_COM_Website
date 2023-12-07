import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document, Schema } from 'mongoose';

interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  mobileNumber: string;
  role: string;
  password: string;
}

// Define a new interface extending IUser to include the 'token' property
interface IUserWithToken extends IUser {
  token: string;
}

class UserService {
  async registerUser(username: string, mobileNumber: string, email: string, role: string, password: string) {
    try {
      let query: object = {}
      if (mobileNumber && email) {
        query = { $or: [{ email }, { mobileNumber }] }
      }
      const existingUser = await User.findOne(query);
      console.log("===existingUser========", existingUser)
      if (existingUser) {
        /// throw new Error('User already exists');
        return "User already exists";
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        mobileNumber,
        role,
        password: hashedPassword,
      });

      await newUser.save();

      return newUser;
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) {
        console.log("================11111", error.message)
        throw new Error(error.message); // Throw the specific error message received
      } else {
        console.log("=============222===11111")

        throw new Error('Error registering user');
      }
    }
  }

  async loginUser(email: string, mobileNumber: number, password: string) {
    try {
      let query: any = {};
      if (email) {
        query = { email };
      } else if (mobileNumber) {
        query = { mobileNumber };
      } else {
        throw new Error('Please provide mobileNumber or email');
      }

      const user = await User.findOne(query);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }
      const JWT_SECRET = process.env.SECRET_KEY || "jkdsess";
      const token = jwt.sign({
        userId: user._id,
        role: user.role,
        username: user.username
      }, JWT_SECRET, { expiresIn: '1h' });

      // Create a new object with user properties and 'token'
      const userWithToken: IUserWithToken = {
        ...user.toObject(), // Convert Mongoose document to a plain object
        token,
      };

      return userWithToken;
    } catch (error) {
      console.log("error", error);

      if (error instanceof Error) {
        console.log("================11111", error.message);
        throw new Error(error.message); // Throw the specific error message received
      } else {
        throw new Error('Error logging in');
      }
    }
  }
}

export default UserService;
