"use client";
import { Button } from "antd";
import Image from "next/image";

import img from "@/assets/Auth/login.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  return (
    <div className="flex flex-col  lg:flex-row lg:border text-black w-full">
      {/* Left side - Background Image */}
      <div className="hidden  lg:flex lg:w-1/2 relative">
        <div className="bg-black/50 absolute w-full h-full "></div>
        <Image
          src={img}
          alt="Wind turbine background"
          width={800}
          height={700}
          className="object-cover w-full h-[800px]"
          priority
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="w-full max-w-md space-y-6 p-6 border shadow-xl rounded-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold pb-5">Set new password</h1>
          </div>

          <form className="space-y-10 pb-10">
            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-3 py-3 pr-10 border border-black rounded"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full py-3 pl-3 pr-10 border border-black rounded"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500"
                  aria-label="Toggle Confirm Password Visibility"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button className="w-full  py-6 bg-[#E2C59F] text-lg font-semibold text-white">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
