import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes";
import { connectDB } from "./config/connectDB";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser() as any);

connectDB();

app.use("/api/v1", routes);

if (process.env.NODE_ENV === "development") {
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log("listen at port : " + PORT);
  });
}

export default app;
