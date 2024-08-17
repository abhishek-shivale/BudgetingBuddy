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

    if (already) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        isVerified: false,
      }
    });

    const accessToken = getAccessToken(newUser.email);
    const refreshToken = getRefreshToken(newUser.email);

    await Prisma.user.update({
      where: {
        email: email,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    const response = NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
