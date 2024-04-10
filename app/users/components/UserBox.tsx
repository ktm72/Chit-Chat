"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

type Props = {
  data: User;
};

const UserBox: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [isLoading, isLoadingSet] = useState(false);

  const handleClick = useCallback(() => {
    isLoadingSet((p) => !p);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => router.push(`/conversations/${data.data.id}`))
      .finally(() => isLoadingSet((p) => !p));
  }, [data, router]);

  return (
    <React.Fragment>
      {isLoading ? <LoadingModal /> : null}
      <div
        onClick={handleClick}
        className="w-full flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex jb items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserBox;
