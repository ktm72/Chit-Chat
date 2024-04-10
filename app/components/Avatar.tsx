import useActiveList from "@/hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";

interface IUser {
  user?: User;
}
const Avatar = ({ user }: IUser) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="avatar"
          src={user?.image || "/images/placeholder.png"}
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white h-2 w-2 top-0 right-0 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;
