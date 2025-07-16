/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import img from "@/assets/Auth/login.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "antd";
import { useLoginUserMutation, UserRole } from "@/redux/service/auth/authApi";
import { toast } from "sonner";
import { setUser } from "@/redux/features/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
  user: string;
  accessToken: string;
  refreshToken: string;
}

// Define response structure
export interface LoginResponseData {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone: string | null;
    streetAddress: string | null;
    city: string | null;
    zipCode: string | null;
    region: string | null;
    country: string | null;
    Image: string[];
    exp: number;
    iat: number;
    userId: string;
  };
  accessToken: string;
  refreshToken: string;
  updatedUser: any;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [loginUserMutation, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res: {
        message: string;
        data: LoginResponseData;
        success: boolean;
      } = await loginUserMutation(data).unwrap();
      console.log(res, "login result");

      if (res.success) {
        toast.success(res?.message);
        dispatch(
          setUser({
            user: res?.data?.user,
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
          })
        );

        Cookies.set("accessToken", res?.data?.accessToken);
        Cookies.set("refreshToken", res?.data?.refreshToken);

        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:border text-black w-full">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="bg-black/50 absolute w-full h-full"></div>
        <Image
          src={img}
          alt="Login background"
          width={800}
          height={700}
          className="object-cover w-full h-[800px]"
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 p-6 border shadow-xl rounded-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-3 py-3 border border-black rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <div className="flex items-center justify-between pb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <Link
                    href="/forget-password"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
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
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-6 rounded-lg bg-[#E2C59F] text-lg font-semibold text-white"
              loading={isLoading}
            >
              Continue
            </Button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center justify-center space-x-2">
              <span className="flex-grow border-t" />
              <div className="relative text-xs uppercase flex-shrink-0">
                <span className="text-gray-500">Or continue with</span>
              </div>
              <span className="flex-grow border-t" />
            </div>
          </div>

          <div className="py-2"></div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
