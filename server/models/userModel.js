import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide an username"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);

export default userModel;
