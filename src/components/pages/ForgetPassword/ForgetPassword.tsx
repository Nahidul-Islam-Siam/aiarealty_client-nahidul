"use client"

import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import img from "@/assets/Auth/forget.png";
import { ForgotPasswordResponse, useForgotPasswordMutation } from "@/redux/service/auth/authApi";
import { useForm, SubmitHandler } from "react-hook-form"; // Import React Hook Form
import { toast } from "sonner";

// Define the form data interface
interface ForgetPasswordFormData {
  email: string;
}

export default function ForgetPassword() {
  const [forgotPassword] = useForgotPasswordMutation();

  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordFormData>();

  // Handle form submission
const onSubmit: SubmitHandler<ForgetPasswordFormData> = async (data) => {
const response = await forgotPassword({ email: data.email }).unwrap() as ForgotPasswordResponse;
  if (response) {
    toast.success(response?.message); 
  } else {
    toast.error("An error occurred"); 
  }
};;

  return (
    <div className="flex flex-col lg:flex-row lg:border text-black w-full">
      {/* Left side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
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

      {/* Right side - Forget Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 p-6 border shadow-xl rounded-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Forget Password</h1>
            <p className="text-sm">Reset your password</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Please enter a valid email address"
                  }
                })}
                className="w-full pl-3 py-3 border border-black rounded"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-6 bg-[#E2C59F] text-lg font-semibold text-white"
            >
              Send Verification Code
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            {"Remember the password? "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
