"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  {
    ssr: false,
  }
);

const ToasterContext = () => {
  return <Toaster />;
};

export default ToasterContext;
