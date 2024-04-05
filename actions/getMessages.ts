import prisma from "@/libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const messages = prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (e) {
    return [];
  }
};

export default getMessages;
