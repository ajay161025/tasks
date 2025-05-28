import mongoose from "mongoose";

const newSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },

    task: String,
  },
  { timestamps: true }
);

export default mongoose.model("task", newSchema);
