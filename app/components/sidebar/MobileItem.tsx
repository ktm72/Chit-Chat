"use client";
import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface IMobileItem {
  href: string;
  icon: IconType;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<IMobileItem> = ({
  icon: Icon,
  href,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 hover:text-black hover:bg-gray-100",
        active ? "bg-gray-100 text-black" : "text-gray-500"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
