import { Prisma } from "@/database/Prisma";
import { getEmailToken } from "@/utils/Token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log(req);
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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const magicLink = await getEmailToken(already.email);
    //send this magic Link

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
