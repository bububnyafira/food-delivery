/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import styles from "@/src/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
// import toast from "react-hot-toast";
// import { LOGIN_USER } from "../../../graphql/actions/login.action";
// import { useMutation } from "@apollo/client";
// import Cookies from "js-cookie";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = ({
  setActivateState,
  setOpen,
}: {
  setActivateState: (e: string) => void;
  setOpen: (e: boolean) => void;
}) => {
  // const [Login, { loading }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({ resolver: zodResolver(formSchema) });
  const [show, setShow] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    reset();
    // const loginData = {
    //   email: data.email,
    //   password: data.password,
    // };
    // const response = await Login({ variables: { loginData } });
    // if (response.data.Login.user) {
    //   toast.success("Login Succescful!");
    //   Cookies.set("refresh_token", response.data.Login.refreshToken);
    //   Cookies.set("access_token", response.data.Login.accessToken);
    //   setOpen(false);
    //   reset();
    //   window.location.reload();
    // } else {
    //   toast.error(response.data.Login.error.message);
    // }
  };

  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>Login with email</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginemail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {errors.email.message}
          </span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}            
            placeholder="password"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute text-white bottom-2 right-2 z-1 cursor-pointer"
              size={25}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute text-white bottom-2 right-2 z-1 cursor-pointer"
              size={25}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}
        <div className="w-full mt-5">
          <span
            className={`${styles.label} text-[#2190ff] block text-right mb-2 cursor-pointer`}
            onClick={() => setActivateState("Forgot-Password")}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting}
            className={`${styles.button}`}
          />
        </div>
        <br />
        <h5 className="text-center pt-3 font-Poppins text-[16px] text-white">
          Or join with
        </h5>
        <div
          className="flex items-center text-white justify-center my-3"
          onClick={() => signIn()}
        >
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center text-white pt-4 font-Poppins text-[14px]">
          Not have any account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActivateState("Signup")}
          >
            Sign up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;
