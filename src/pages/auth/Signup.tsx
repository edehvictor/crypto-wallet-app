import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "Enter your first name" }),
    lastName: z.string().min(2, { message: "Enter your last name" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, sethowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await firebaseAuthService.handleSignUp(values);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen w-screen bg-[#181818]  flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl mx-auto ">
        <Card className="shadow-lg bg-[#303030] rounded-2xl px-4 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-300">
              Join CWA to manage your crypto portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-100">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="text-slate-100 placeholder:text-[#98A2B3]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-100">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="placeholder:text-[#98A2B3] text-slate-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-100">Email </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute  right-2 top-2 text-gray-200  w-5 h-5" />
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            className=" placeholder:text-[#98A2B3] text-slate-100 border border-gray-400 focus:border-gray-300 "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-100">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-5 h-5" />
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
                              <EyeOff className="text-gray-200" size={18} />
                            ) : (
                              <Eye className="text-gray-200" size={18} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-100">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-5 h-5" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className={`w-full border text-slate-100 rounded-lg pl-10 pr-10 py-2 focus:ring outline-none placeholder:text-sm placeholder:text-[#98A2B3] `}
                          />
                          <div
                            onClick={() =>
                              sethowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 bg-none"
                          >
                            {showPassword ? (
                              <EyeOff className="text-gray-200" size={18} />
                            ) : (
                              <Eye className="text-gray-200" size={18} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between ">
                  {/* <label className="flex items-center  text-slate-100">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="mr-2 text-slate-100"
                    />
                    Remember me
                  </label> */}

                  <label className="flex w-full justify-between cursor-pointer text-sm space-x-1">
                    <span className="text-slate-100">
                      {" "}
                      Already have an account?
                    </span>
                    <span
                      onClick={() => navigate("/auth/login")}
                      className="text-white  underline"
                    >
                      Sign in
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant={"default"}
                  disabled={isLoading}
                  className=" w-full bg-black disabled:text-slate-100 text-white cursor-pointer font-semibold"
                >
                  {isLoading ? "Creating Account..." : "Sign up"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
