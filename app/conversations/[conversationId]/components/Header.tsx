"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

type Props = {
  conversation: Conversation & {
    users: User[];
  };
};

const Header: React.FC<Props> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, drawerOpenSet] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active" : "";
  }, [conversation, isActive]);
  return (
    <React.Fragment>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => drawerOpenSet((p) => !p)}
      />
      <div className="bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-sky-600 hover:text-sky-600 cursor-pointer"
            href="/conversations"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <h5>{conversation.name || otherUser.name}</h5>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => drawerOpenSet((p) => !p)}
          size={32}
          className="text-sky-600 hover:text-sky-600 transition cursor-pointer"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
