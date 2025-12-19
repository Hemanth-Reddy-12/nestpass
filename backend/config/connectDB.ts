import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URL as string;
    const connection = await mongoose.connect(connectionString);
    console.log(
      "database connected successfully , ",
      connection.connection.host
    );
  } catch (error) {
    console.log("error when try to connect to Database" + error);
  }
};
