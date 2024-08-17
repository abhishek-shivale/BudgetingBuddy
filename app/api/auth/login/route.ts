import { Prisma } from "@/database/Prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getAccessToken, getRefreshToken } from "@/utils/token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email: string; password: string };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }

    const already = await Prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!already) {
      return NextResponse.json({ message: "User does not exist" }, { status: 400 });
    }

    const match = await bcrypt.compare(password, already.password as string);

    if (!match) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
    }

    const accessToken = getAccessToken(email);
    const refreshToken = getRefreshToken(email);

    await Prisma.user.update({
      where: {
        email: email,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
