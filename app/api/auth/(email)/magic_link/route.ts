import { Prisma } from "@/database/Prisma";
import {
  decodeToken,
  getAccessToken,
  getRefreshToken,
  verifyEmailToken,
} from "@/utils/Token";
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

    const user = await Prisma.user.update({
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
    return response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
