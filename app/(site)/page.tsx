import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height={"48"}
          width={"48"}
          className="mx-auto w-auto"
          src={"/images/chat_icon.png"}
        />
        <h1 className="mt-6 text-center font-bold tracking-tighter text-gray-900">
          Chit Chat
        </h1>
      </div>
      <AuthForm />
    </div>
  );
}
