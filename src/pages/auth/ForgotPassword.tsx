import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { firebaseAuthService } from "@/services/authservice";
import showToast from "@/utils/toast.utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      showToast.message("Please enter your email.");
      return;
    }

    setIsLoading(true);
    const success = await firebaseAuthService.handleForgotPassword(email);
    setIsLoading(false);

    if (success) {
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen w-screen  flex flex-col justify-center items-center bg-[#F7F5F4] p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-lg border rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-500">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <Button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="bg-blue-600 cursor-pointer w-full text-white font-semibold hover:bg-blue-700"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
              <p
                onClick={() => (window.location.href = "/auth/login")}
                className="text-sm text-blue-500 text-center cursor-pointer hover:underline"
              >
                Back to Login
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
