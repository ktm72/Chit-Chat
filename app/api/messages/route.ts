import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currUser = await getCurrentUser();
    const body = await request.json();

    const { message, image, conversationId } = body;

    if (!currUser?.id || !currUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMsg = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currUser.id,
          },
        },
        seen: {
          connect: {
            id: currUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMsg.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMsg);
  } catch (e) {
    console.log(e, "ERROR_MESSAGES");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
