import { model, Model, models, Schema } from "mongoose";
const bcrypt = require("bcrypt");

export interface UserInterface {
  _id?: string;
  username: string;
  email: string;
  password: string;
  recipes_created: string[];
  recipes_liked: string[];
  images?: string[];
}

const UserSchema = new Schema<UserInterface, Model<UserInterface>>({
  username: {
    type: String,
    required: [true, "Please create a username."],
    index: { unique: true },
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    index: { unique: true },
  },
  password: {
    type: String,
    required: [true, "Please create a password."],
    minLength: [4, "Password too short."],
    maxLength: [18, "Password too long."],
  },
  // These will be lists of recipe id's
  recipes_created: { type: [String], index: { unique: true } },
  recipes_liked: { type: [String], index: { unique: true } },
  images: { type: [String] },
});

// Encrypt password
UserSchema.pre("save", async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (e) {
    throw Error("Password hash error in User.tsx");
  }
});

export default (models.User as Model<UserInterface>) ||
  model<UserInterface>("User", UserSchema);
