import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Navbar from "./Navbar";
import { BottomGradient, LabelInputContainer } from "./ui/custom";
// import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("signup");

      const response = await axiosInstance.post("auth/register", userData);
      toast(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast("Error while creating user!");
    }
  };
  return (
    <>
      <Navbar currentPage="register" />
      <div className="flex justify-center p-5">
        {/* <div className="bg-slate-50 min-w-full m-3">Hello</div> */}
        <div className="m-5 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-300 dark:text-neutral-200">
            Welcome to Aceternity
          </h2>
          <p className="text-neutral-400 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to aceternity if you can because we don&apos;t have a login
            flow yet
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div> */}
            <LabelInputContainer>
              <Label className="text-neutral-100 my-1" htmlFor="name">
                Name
              </Label>
              <Input
                className="mb-3"
                name="name"
                id="name"
                placeholder="Name"
                onChange={handleChange}
                type="text"
                value={userData.name}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="age" className="text-neutral-100">
                Age
              </Label>
              <Input
                className="mb-3"
                name="age"
                id="age"
                placeholder="18"
                onChange={handleChange}
                type="number"
                value={userData.age}
              />
            </LabelInputContainer>
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
              Sign up &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
