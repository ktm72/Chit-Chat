import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
type IParams = {
  conversationId?: string;
};

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currUser = await getCurrentUser();

    const { conversationId } = params;
    if (!currUser?.id || !currUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const lastMsg = conversation.messages[conversation.messages.length - 1];

    if (!lastMsg) return NextResponse.json(conversation);

    const updateMsg = await prisma.message.update({
      where: {
        id: lastMsg.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: currUser.id,
          },
        },
      },
    });

    return NextResponse.json(updateMsg);
  } catch (e) {
    console.log(e, "ERROR_MSG_SEEN");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
