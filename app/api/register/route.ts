import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const hassedPass = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hassedPass,
      },
    });

    return NextResponse.json(user);
  } catch (e: any) {
    console.log(e, "REGISTRATION ERROR");

    return new NextResponse("Internal Error", { status: 500 });
  }
}
