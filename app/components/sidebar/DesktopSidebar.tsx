"use client";

import useRoutes from "@/hooks/useRoutes";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

interface ICurrentUser {
  currentUser: User;
}

const DesktopSidebar: React.FC<ICurrentUser> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, isOpenSet] = useState(false);

  return (
    <React.Fragment>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => isOpenSet(false)}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-24 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => isOpenSet((p) => !p)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default DesktopSidebar;
