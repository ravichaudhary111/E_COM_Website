import mongoose from 'mongoose';

const mongoURI: string | undefined = process.env.DBURL
//"mongodb+srv://ravichaudhary:Ravi%4000@cluster0.oalgdm1.mongodb.net/";

const connectDB = async (): Promise<void> => {
  try {
    if (mongoURI) {
      console.log(mongoURI)
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;