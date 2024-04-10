"use client";

import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type Props = {
  users: User[];
};

const AvatarGroup: React.FC<Props> = ({ users }) => {
  const slicedUsers = users.slice(0, 3);
  const positionMap = {
    0: "top left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, i) => (
        <div
          key={user.id}
          className={clsx(
            "absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]",
            positionMap[i as keyof typeof positionMap]
          )}
        >
          <Image
            alt="group"
            fill
            src={user?.image || "/images/placeholder.png"}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
