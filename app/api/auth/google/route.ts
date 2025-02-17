import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const oAuthClient = new OAuth2Client(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
      "http://localhost:3000"
    );

    const { tokens } = await oAuthClient.getToken(code);

    const ticket = await oAuthClient.verifyIdToken({
      idToken: tokens?.id_token ?? "",
    });

    oAuthClient.setCredentials(tokens);

    const payload = ticket.getPayload();

    return new NextResponse(JSON.stringify(payload), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Somethin went wrong" }),
      { status: 500 }
    );
  }
}
