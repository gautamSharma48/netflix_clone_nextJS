import Input from "@/components/input";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [variant, setVariant] = useState("login");

  const toogleVariant = useCallback(() => {
    setState({
      email: "",
      username: "",
      password: "",
    });
    setVariant((currentVariant: any) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const checkRender = useCallback(
    (loading: boolean, statement: any, elseStatement: any = null) => {
      if (loading) {
        return statement;
      }
      return elseStatement;
    },
    []
  );

  const loginHandler = useCallback(async () => {
    try {
      const { email, password } = state || null;
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  const registerHandler = useCallback(async () => {
    try {
      const { email, password, username } = state || null;
      await axios.post("/api/register", {
        email,
        password,
        name: username,
      });
      loginHandler();
    } catch (error) {
      console.log(error);
    }
  }, [loginHandler, state]);

  const registerLoginHnadler = useCallback(async () => {
    if (variant === "register") {
      registerHandler();
    } else {
      loginHandler();
    }
  }, [loginHandler, registerHandler, variant]);

  return (
    <div className="relative h-full w-full lg:bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full pb-5 lg:bg-opacity-50">
        <nav className="px-12 py-5 sticky top-0 bg-black lg:bg-transparent z-50">
          <Image
            height={"12"}
            width={"200"}
            className="w-auto h-auto"
            src="/images/logo.png"
            alt="logo"
            priority={true}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-white text-4xl mb-8 font-semibold">
              {checkRender(
                variant === "register",
                "Create an Account",
                "Sign In"
              )}
            </h1>
            <div className="flex flex-col gap-4">
              {checkRender(
                variant === "register",
                <Input
                  id="username"
                  onChange={(event: any) =>
                    setState((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                  value={state.username}
                  label="Username"
                  type="text"
                />
              )}

              <Input
                id="email"
                onChange={(event: any) =>
                  setState((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                value={state.email}
                label="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={(event: any) =>
                  setState((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                value={state.password}
                label="Password"
                type="password"
              />
            </div>
            <button
              onClick={registerLoginHnadler}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {checkRender(variant === "register", "Register", "Sign In")}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 ">
              {checkRender(
                variant === "login",
                "First time using Netflix?",
                "Already have an account?"
              )}

              <span
                onClick={toogleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {checkRender(variant === "login", "Create an account", "Login")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
