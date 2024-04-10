"use client";
import useConversation from "@/hooks/useConservation";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface Props {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList = ({ initialItems, users }: Props) => {
  const [items, itemsSet] = useState(initialItems);
  const [isModalOpen, isModalOpenSet] = useState(false);
  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const newHandler = (conv: FullConversationType) => {
      itemsSet((curr) => {
        if (find(curr, { id: conv.id })) {
          return curr;
        }

        return [conv, ...curr];
      });
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
    };
  }, [pusherKey]);
  return (
    <React.Fragment>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => isModalOpenSet(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => isModalOpenSet((p) => !p)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </React.Fragment>
  );
};

export default ConversationList;
