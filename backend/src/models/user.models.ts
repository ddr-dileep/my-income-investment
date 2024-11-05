import { model, Schema, Document } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  updateHistory: [
    {
      type: String,
      default: Date.now,
      select: false,
      required: true,
    },
  ],
});

const User = model("User", userSchema);
export default User;

export interface UserProperties extends Document {
  name: string;
  email: string;
  password: string;
}
