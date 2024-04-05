import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (converasationId: string) => {
  try {
    const currUser = await getCurrentUser();

    if (!currUser?.email) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: converasationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (e) {
    return null;
  }
};

export default getConversationById;
