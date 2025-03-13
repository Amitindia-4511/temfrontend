import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Navbar from "./Navbar";
import { BottomGradient, LabelInputContainer } from "./ui/custom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, authUser, isLoging } = useAuthStore();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await login(userData);
  }
  return (
    <>
      <div>
        <Navbar currentPage="login" />
      </div>
      <div className="m-5 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-300 dark:text-neutral-200">
          Welcome to Aceternity
        </h2>
        <p className="text-neutral-400 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to aceternity if you can because we don&apos;t have a login flow
          yet
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label className="text-neutral-100" htmlFor="email">
              Email Address
            </Label>
            <Input
              className="mb-3"
              name="email"
              id="email"
              placeholder="Chat@email.com"
              onChange={handleChange}
              type="email"
              value={userData.email}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label className="text-neutral-100" htmlFor="password">
              Password
            </Label>
            <Input
              className="mb-3"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              type="password"
              value={userData.password}
            />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 dark:from-zinc-900 dark:to-zinc-900 to-from-zinc-900 dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </>
  );
}
