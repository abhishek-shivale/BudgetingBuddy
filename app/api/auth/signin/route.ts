import { Prisma } from "@/database/Prisma";
import { sendMail } from "@/utils/sendEmail";
import { getEmailToken } from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body as { email: string };

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const already = await Prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!already) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const magicLink = await getEmailToken(already.email);
    //send this magic Link
    await sendMail("abhishekshivale21@gmail.com", "signin", magicLink)

    return NextResponse.json(
      { message: "Magic Link Sent Successfully!!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
