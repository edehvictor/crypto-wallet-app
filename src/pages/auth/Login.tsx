"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { firebaseAuthService } from "@/services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      await firebaseAuthService.handleSignIn(values);
      setIsLoading(false);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleForgotPassword = async () => {
    navigate("/auth/forgotpassword");
  };

  return (
    <div className="relative min-h-screen w-screen bg-[#181818]  flex flex-col justify-center items-center [#F7F5F4] p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-md border-0 rounded-2xl bg-[#303030] ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-100">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-200">
              Login to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-100">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute  right-2 top-2 text-gray-100  w-5 h-5" />
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            className="text-slate-300  placeholder:text-[#98A2B3]  border border-gray-400 focus:border-gray-300 "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-100">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-5 h-5" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className={`w-full border text-slate-100 rounded-lg pl-10 pr-10 py-2 focus:ring outline-none placeholder:text-sm placeholder:text-[#98A2B3] `}
                          />
                          <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 bg-none"
                          >
                            {showPassword ? (
                              <EyeOff className="text-gray-100" size={18} />
                            ) : (
                              <Eye className="text-gray-100" size={18} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between ">
                  <label className="flex items-center  text-slate-100">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="mr-2 "
                    />
                    Remember me
                  </label>

                  <label className="flex justify-between cursor-pointer text-sm space-x-1">
                    <span
                      className=" hover:underline text-slate-100"
                      onClick={handleForgotPassword}
                    >
                      Forgot password
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black disabled:text-slate-100 cursor-pointer text-base"
                >
                  {" "}
                  {isLoading ? "logging in..." : "Sign In"}
                </Button>

                <p className="text-sm text-center text-slate-100 cursor-pointer ">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/auth/signup")}
                    className="text-white hover:underline"
                  >
                    Sign up
                  </span>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
