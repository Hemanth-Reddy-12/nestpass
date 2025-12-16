import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mainRoutes from "./routes/main.routes.js";
import { connectDB } from "./config/connectDB.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1", mainRoutes);

if (process.env.NODE_ENV === "development") {
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log("listen at port : " + PORT);
  });
}

export default app;
