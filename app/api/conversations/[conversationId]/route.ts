import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

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
      },
    });

    if (!existingConv) return new NextResponse("Invalid Id", { status: 400 });

    const deletedConv = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currUser.id],
        },
      },
    });

    return NextResponse.json(deletedConv);
  } catch (e) {
    console.log(e, "ERROR_CONV_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
