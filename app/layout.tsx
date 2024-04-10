import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterContext from "./context/ToasterContext";

import "./globals.css";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./context/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chit-Chat",
  description: "Chat with Chit-Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus>{children}</ActiveStatus>
        </AuthContext>
      </body>
    </html>
  );
}
