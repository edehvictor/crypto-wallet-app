import { useEffect, useState } from "react";
import { firebaseAuthService } from "@/services/authservice";
import { getAuth, type User } from "firebase/auth";
import showToast from "@/utils/toast.utils";

export default function VerifyEmail() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await firebaseAuthService.getCurrentUser();
        setUserData(user.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleVerifyEmail = async () => {
    if (!userData) return;
    try {
      setSending(true);
      await firebaseAuthService.resendVerificationEmail();
      showToast.success("Verification email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      showToast.error("Failed to send verification email");
    } finally {
      setSending(false);
    }
  };

  const handleCheckVerification = async () => {
    try {
      setChecking(true);
      if (!auth.currentUser) {
        showToast.error("No user found. Please log in again.");
        return;
      }

      await auth.currentUser.reload(); // refresh user info
      if (auth.currentUser.emailVerified) {
        showToast.success("Email verified successfully! Redirecting...");
        window.location.href = "/auth/login";
      } else {
        showToast.error("Email not verified yet. Check your inbox.");
      }
    } catch (error) {
      console.error("Error checking email verification:", error);
      showToast.error("Failed to check verification status");
    } finally {
      setChecking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#70FF00]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col font-sora items-center justify-center p-4 bg-[#181818]">
      <div className="w-full max-w-md rounded-lg bg-[#303030] p-8 shadow-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-center text-slate-100 font-montserrat font-medium">
            Check your email to verify your account before logging in.
          </p>

          <button
            onClick={handleVerifyEmail}
            disabled={sending}
            className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-500"
          >
            {sending ? "Sending..." : "Resend Verification Email"}
          </button>

          <button
            onClick={handleCheckVerification}
            disabled={checking}
            className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-500"
          >
            {checking ? "Checking..." : "I’ve Verified My Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
