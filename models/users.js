import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 15,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 20,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
