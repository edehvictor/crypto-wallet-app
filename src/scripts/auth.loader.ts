import { redirect } from "react-router";
import showToast from "@/utils/toast.utils";
import { useAuthStore, type Profile } from "@/hooks/useProfile";
import { firebaseAuthService } from "@/services/auth.service";

export async function requireAuth() {
  try {
    const userData = await firebaseAuthService.getCurrentUser();
    const firebaseUser = userData.user;
    const profileData = userData.profile;

    // console.log("Firebase User:", firebaseUser);
    // console.log("Firestore Profile:", profileData);
    // console.log("Authenticated:", userData.authenticated);

    if (!userData.authenticated || !firebaseUser) {
      console.log("User not authenticated, redirecting to signup");
      return redirect("/auth/signup");
    }

    if (!userData.authenticated) {
      // console.log("Profile data missing, redirecting to complete profile");
      showToast.error("Please check if your're signed in");
    }

    // Update auth store
    try {
      useAuthStore.getState().setAuthenticated(userData.authenticated);
      useAuthStore.getState().setProfile(profileData as Profile);
    } catch (storeError) {
      console.warn("Store update failed:", storeError);
    }

    // console.log("Auth check successful, user can proceed");
    return { user: userData.authenticated };
  } catch (error) {
    console.error("Auth check failed:", error);
    showToast.error("An authentication error occurred");
    return redirect("/auth/signup");
  }
}

export async function authLoader() {
  try {
    const user = await firebaseAuthService.getCurrentUser();

    if (user.authenticated) {
      return redirect("/dashboard");
    }

    return { user };
  } catch (error) {
    console.error("Auth check failed:", error);
    showToast.error("An authentication error occurred");
    return redirect("/auth/signup");
  }
}
