import { Prisma } from '@/database/Prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getToken } from '@/utils/api/token';
import ApiResponse from '@/utils/api/ApiResponse';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email: string; password: string };
    console.log(email, password);

    if (!email || !password) {
      return NextResponse.json(
        new ApiResponse(
          'Email and Password are required',
          400,
          null,
          false,
          null,
        ),
      );
    }

    const already = await Prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (already) {
      return NextResponse.json(
        new ApiResponse('User already exists', 400, null, false, null),
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isVerified: false,
      },
    });

    const token = await getToken({
      name: newUser.name as string,
      isVerified: newUser.isVerified as boolean,
      email: newUser.email,
      id: newUser.id,
    });

    await Prisma.user.update({
      where: {
        email,
      },
      data: {
        token,
      },
    });

    const response = NextResponse.json(
      new ApiResponse('User created successfully', 200, null, true, null),
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 30 * 12,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      new ApiResponse('Internal Server Error', 500, null, false, null),
    );
  }
}
