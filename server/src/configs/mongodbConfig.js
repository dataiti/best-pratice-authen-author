import mongoose from "mongoose";
import { env } from "~/configs/envConfig";

export const CONNECT_DATABASE = async () => {
  mongoose
    .connect(env.MONGODB_URI)
    .then(() => {
      console.log("✅ Connect DB successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
};
