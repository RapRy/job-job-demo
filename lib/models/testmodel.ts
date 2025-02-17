import mongoose, { Document, Types } from "mongoose";

export interface CommentModel extends Document {
  text: string;
}

const commentSchema = new mongoose.Schema<CommentModel>(
  {
    text: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comments", commentSchema);

export default Comment;
