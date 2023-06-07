import express from "express";
import * as dotenv from "dotenv";
import initRouter from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const app = express();
initRouter(app);

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
