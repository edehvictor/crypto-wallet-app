import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  type User,
  sendPasswordResetEmail,
} from "firebase/auth";
import Cookies from "js-cookie";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import showToast from "@/utils/toast.utils";
import { app } from "@/lib/firebase";

class FirebaseAuthService {
  private auth;
  private db;
  private authStatePromise: Promise<User | null>;

  constructor() {
    this.auth = getAuth(app);
    this.db = getFirestore(app);

    setPersistence(this.auth, browserLocalPersistence);

    // Create a promise that resolves when auth state is determined
    this.authStatePromise = new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  // Sign Up with Email Check + Verification
  public async handleSignUp(values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      // Check if email already exists
      const methods = await fetchSignInMethodsForEmail(this.auth, values.email);
      if (methods.length > 0) {
        showToast.error("Email already exists. Try logging in instead.");
        return null;
      }

      // Create user account
      const userCred = await createUserWithEmailAndPassword(
        this.auth,
        values.email,
        values.password
      );

      const user = userCred.user;
      if (!user) throw new Error("User not returned from signUp");

      //  Send email verification
      await sendEmailVerification(user, {
        url: `${window.location.origin}/auth/email-verified`,
        handleCodeInApp: true,
      });

      //  Save user profile in Firestore
      await setDoc(doc(this.db, "profile", user.uid), {
        id: user.uid,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        emailVerified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      console.log(user, "user");
      await this.saveSessionToCookies(user);
      showToast.message("Account created successfully");
      window.location.href = "/auth/verifyemail";

      return user;
    } catch (error) {
      const e = error as Error;
      console.error("Error handling sign-up:", e.message);
      showToast.error("Sign-up failed. Please try again.");
      return null;
    }
  }

  // Sign In with Email Verification & Email Existence Check
  public async handleSignIn(values: { email: string; password: string }) {
    try {
      //  Check if email exists in Firebase Auth

      if (!(await this.emailExists(values.email))) {
        showToast.error("Email is not registered. Please sign up first.");
        return null;
      }
      const userCred = await signInWithEmailAndPassword(
        this.auth,
        values.email,
        values.password
      );
      const user = userCred.user;

      //  If email is verified, update Firestore
      if (user.emailVerified) {
        const profileRef = doc(this.db, "profile", user.uid);
        await setDoc(
          profileRef,
          { emailVerified: true, updated_at: new Date().toISOString() },
          { merge: true }
        );
      } else {
        showToast.error("Please verify your email before logging in.");
        return null;
      }

      await this.saveSessionToCookies(user);
      showToast.message("Login successful");
      window.location.href = "/dashboard";
      return user;
    } catch (error) {
      const e = error as Error;
      console.error("Error logging in:", e.message);
      showToast.error(e.message || "Sign-in failed. Please try again.");
      return null;
    }
  }

  public async resendVerificationEmail() {
    const user = await this.getSession();
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      showToast.message("Verification email resent successfully!");
    } else {
      showToast.error("User already verified or not logged in.");
    }
  }

  private async emailExists(email: string) {
    const q = query(
      collection(this.db, "profile"),
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // true if email exists
  }

  public async handleForgotPassword(email: string) {
    try {
      if (!(await this.emailExists(email))) {
        showToast.error("No account found with this email.");
        return false;
      }

      await sendPasswordResetEmail(this.auth, email, {
        url: `${window.location.origin}/auth/login`,
      });

      showToast.message("Password reset link sent to your email.");
      return true;
    } catch (error) {
      const e = error as Error;
      console.error("Error sending password reset email:", e.message);
      showToast.error(e.message || "Failed to send reset email. Try again.");
      return false;
    }
  }

  // Get Session - Wait for auth state to be determined
  public async getSession(): Promise<User | null> {
    try {
      const user = await this.authStatePromise;
      return user;
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  }

  // Alternative method that creates a fresh promise each time
  public async waitForAuthState(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  // Get Current User
  public async getCurrentUser() {
    try {
      // Wait for auth state to be determined
      const user = await this.waitForAuthState();

      if (!user) {
        return {
          success: false,
          authenticated: false,
          message: "No active session",
          user: null,
          profile: null,
        };
      }

      // Fetch user profile from Firestore
      let profileData = null;
      try {
        const docRef = doc(this.db, "profile", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          profileData = docSnap.data();
        }
      } catch (firestoreError) {
        console.error("Error fetching user profile:", firestoreError);
      }

      // Save session to cookies
      await this.saveSessionToCookies(user);
      return {
        success: true,
        authenticated: true,
        user,
        profile: profileData,
      };
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      return {
        success: false,
        authenticated: false,
        message: "Auth check failed",
        user: null,
        profile: null,
      };
    }
  }

  // Save Session to Cookies
  private async saveSessionToCookies(user: User) {
    try {
      const token = await user.getIdToken();
      const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1h expiry
      Cookies.set("wallet--accessToken", token, { expires: expiry });
      console.log("Saved session token to cookies");
    } catch (error) {
      console.error("Error saving session to cookies:", error);
    }
  }

  // Sign Out
  public async signOut() {
    try {
      await signOut(this.auth);
      Cookies.remove("wallet--accessToken");
      showToast.message("Logged out successfully");
    } catch (error) {
      const e = error as Error;
      console.error("Error signing out:", error);
      showToast.error(e.message || "Error signing out");
    }
  }

  // Helper method to check if user is authenticated
  public async isAuthenticated(): Promise<boolean> {
    const user = await this.waitForAuthState();
    return !!user;
  }

  // Helper method to get user profile only
  // public async getUserProfile(userId?: string): Promise<any | null> {
  //   try {
  //     const user = userId ? { uid: userId } : await this.waitForAuthState();

  //     if (!user) return null;

  //     const docRef = doc(this.db, "profile", user.uid);
  //     const docSnap = await getDoc(docRef);

  //     return docSnap.exists() ? docSnap.data() : null;
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error);
  //     return null;
  //   }
  // }
}

export const firebaseAuthService = new FirebaseAuthService();
