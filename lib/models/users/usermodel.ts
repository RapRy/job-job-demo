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
}

const userSchema = new mongoose.Schema<UserModel>({
  name: {
    first: {
      type: String,
      require: true,
    },
    last: {
      type: String,
      require: true,
    },
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  picture: {
    type: String,
  },
  is_google: {
    type: Boolean,
    require: true,
  },
  account_type: {
    type: String,
    require: true,
  },
  sign_up_date: {
    type: Date,
  },
  last_sign_in_date: {
    type: Date,
  },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
