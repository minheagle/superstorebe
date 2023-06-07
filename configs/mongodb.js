import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected !");
    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default connect;
