"use client";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, variantSet] = useState<Variant>("LOGIN");
  const [isLoading, isLoadingSet] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      variantSet("REGISTER");
    } else {
      variantSet("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
    isLoadingSet((p) => !p);
    if (variant === "REGISTER") {
      try {
        await axios.post("/api/register", data);
      } catch (e) {
        toast.error("Something went wrong!");
      }
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) toast.error(callback.error);
        if (callback?.ok) toast.success("Logged In!");
      });
    }
    reset();
    isLoadingSet((p) => !p);
  };

  const socialAction = (action: string) => {
    isLoadingSet((p) => !p);

    signIn(action, { redirect: false })
      .then((cb) => {
        if (cb?.error) toast.error(cb.error);
        if (cb?.ok) toast.success("Logged In!");
      })
      .finally(() => isLoadingSet((p) => !p));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          {variant === "REGISTER" ? (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
            />
          ) : null}

          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "REGISTER" ? "REGISTER" : "SIGN IN"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Chit-Chat?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
