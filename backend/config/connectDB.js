import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      "database connected successfully , ",
      connection.connection.host
    );
  } catch (error) {
    console.log("error when try to connect to Database" + error.message);
  }
};
