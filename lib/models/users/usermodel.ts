import mongoose, { Document } from "mongoose";

export interface UserModel extends Document {
  name: {
    first: string;
    last: string;
  };
  email: string;
  account_type: string;
  password: string;
  picture: string;
  sign_up_date: Date;
  last_sign_in_date: Date;
  is_google: boolean;
  is_resume_created: boolean;
}

export interface UserCredModel {
  name: {
    first: string;
    last: string;
  };
  email: string;
  account_type: string;
  password: string;
  picture: string;
  sign_up_date: Date;
  last_sign_in_date: Date;
  is_google: boolean;
  is_resume_created: boolean;
  _id: string;
  token: string;
}

const userSchema = new mongoose.Schema<UserModel>({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  picture: {
    type: String,
  },
  is_google: {
    type: Boolean,
    required: true,
  },
  account_type: {
    type: String,
    required: true,
  },
  sign_up_date: {
    type: Date,
  },
  last_sign_in_date: {
    type: Date,
  },
  is_resume_created: {
    type: Boolean,
  },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
