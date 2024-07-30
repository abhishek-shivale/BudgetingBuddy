import { Prisma } from "@/database/Prisma";
import {
  decodeToken,
  getAccessToken,
  getRefreshToken,
  verifyEmailToken,
} from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Token } = body as { Token: string };

    if (!Token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const verify = await verifyEmailToken(Token);

    if (!verify) {
      return NextResponse.json(
        { message: "Token is Invalid" },
        { status: 400 }
      );
    }

    const { email } = decodeToken(Token) as { email: string };

    const refreshToken = getRefreshToken(email);
    const accessToken = getAccessToken(email);

    const exists = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!exists) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    await Prisma.user.update({
      where: {
        email: email,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    const response = NextResponse.json(
      { message: "Verified Successfully!!", data: accessToken },
      { status: 200 }
    );
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
