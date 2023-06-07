import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
