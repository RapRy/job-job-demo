import { connectToMongoDB } from "@/lib/db";
import User, { UserModel } from "@/lib/models/users/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const { email, password, isGoogle } = await req.json();

    const user: UserModel | null = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: isGoogle ? "Invalid email" : "Invalid email or password.",
        }),
        { status: 400 }
      );
    }

    if (!isGoogle) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid email or password." }),
          { status: 400 }
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { last_sign_in_date: new Date(), step: user.step ?? 1 },
      { useFindAndModify: false, new: true }
    );

    const token = jwt.sign(
      updatedUser.toObject(),
      process.env.JWT_SECRET as string,
      {
        expiresIn: parseInt(process.env.JWT_EXPIRATION as string),
      }
    );

    return new NextResponse(
      JSON.stringify({ ...updatedUser.toObject(), token }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
