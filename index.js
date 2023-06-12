import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import initRouter from "./routes/index.js";
import connect from "./configs/mongodb.js";

const PORT = process.env.PORT ?? 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server run on port ${PORT}`);
});
