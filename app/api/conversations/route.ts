import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currUser?.id || !currUser?.email) {
      return new NextResponse("Unathourized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const _newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      _newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            "conversation:new",
            _newConversation
          );
        }
      });
      return NextResponse.json(_newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) return NextResponse.json(singleConversation);

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (e) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
