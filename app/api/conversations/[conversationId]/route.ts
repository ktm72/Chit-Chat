import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currUser = await getCurrentUser();

    if (!currUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConv = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: true,
      },
    });

    if (!existingConv) return new NextResponse("Invalid Id", { status: 400 });

    const messageIds = existingConv.messages.map((message) => message.id);

    const deletedConv = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currUser.id],
        },
      },
    });

    await prisma.user.update({
      where: {
        id: currUser.id,
      },
      data: {
        conversationIds: {
          set: currUser.conversationIds.filter((id) => id !== conversationId),
        },
        seenMessageIds: {
          set: currUser.seenMessageIds.filter((id) => !messageIds.includes(id)),
        },
      },
    });

    existingConv.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:remove", existingConv);
      }
    });

    return NextResponse.json(deletedConv);
  } catch (e) {
    console.log(e, "ERROR_CONV_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
