import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import body_parser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import initRouter from "./routes/index.js";
import connect from "./configs/mongodb.js";

const PORT = process.env.PORT ?? 5000;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FE_ORIGIN,
  })
);
app.use(morgan("common"));

app.use(cookieParser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

initRouter(app);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server run on port ${PORT}`);
});
