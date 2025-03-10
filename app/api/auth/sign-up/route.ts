import { connectToMongoDB } from "@/lib/db";
import User from "@/lib/models/users/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const { email, confirmPassword, isGoogle } = await req.json();

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return new NextResponse(
        JSON.stringify({ message: `${email} already in use.` }),
        {
          status: 400,
        }
      );

    const hashedPassword = await bcrypt.hash(confirmPassword, 12);

    await User.create({
      name: {
        first: "",
        last: "",
      },
      email,
      password: isGoogle ? "" : hashedPassword,
      accountType: "CANDIDATE",
      sign_up_date: new Date().toUTCString(),
      is_google: isGoogle,
    });

    return new NextResponse(
      JSON.stringify({
        message: `${email} successfully registered.`,
      }),
      {
        status: 200,
      }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
