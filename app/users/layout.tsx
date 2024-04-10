import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "@/actions/getUsers";
import UserList from "./components/UserList";

interface IUsersLayout {
  children: React.ReactNode;
}

const UsersLayout = async ({ children }: IUsersLayout) => {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
