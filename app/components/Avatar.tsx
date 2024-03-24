import { User } from "@prisma/client";

interface IUser {
  user?: User;
}
const Avatar = ({ user }: IUser) => {
  return <div>Avatar</div>;
};

export default Avatar;
