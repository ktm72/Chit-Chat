"use client";

import React from "react";
import useActiveChannel from "@/hooks/useActiveChannel";

interface ActiveProps {
  children: React.ReactNode;
}

const ActiveStatus: React.FC<ActiveProps> = ({ children }) => {
  useActiveChannel();
  return <React.Fragment>{children}</React.Fragment>;
};

export default ActiveStatus;
