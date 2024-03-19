import React from "react";
import { IconType } from "react-icons";

interface IAuthSocialButton {
  icon: IconType;
  onClick: () => void;
}
const AuthSocialButton: React.FC<IAuthSocialButton> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-md ring-1 ring-inset hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
