import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

interface IUsersLayout {
  children: React.ReactNode;
}

const UsersLayout = async ({ children }: IUsersLayout) => {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
