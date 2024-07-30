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
        { message: "email is required" },
        { status: 400 }
      );
    }

    const already = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (already) {
      return NextResponse.json(
        { message: "Your email is already registred" },
        { status: 400 }
      );
    }

    const newUser = await Prisma.user.create({
      data: {
        email: email,
      },
    });

    const magicLink = await getEmailToken(newUser.email);
    //send this magic Link

    await sendMail("abhishekshivale21@gmail.com", "signup", magicLink)


    return NextResponse.json(
      { message: "Magic Link Sent Successfully!!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
