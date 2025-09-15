import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/auth/Signup";
import LoginForm from "./pages/auth/Login";
import { requireAuth } from "./scripts/auth.loader";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CryptoAssets from "./pages/CrytoAssets";
import CoinDetails from "./pages/CoinDetails";
import Swap from "./pages/Swap";
import ActionButtonLayout from "./components/dashboard/ActionButtonsLayout";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Earn from "./pages/Earn";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth/signup",

    element: <Signup />,
  },
  {
    path: "/auth/login",

    element: <LoginForm />,
  },
  {
    path: "/auth/verifyemail",

    element: <VerifyEmail />,
  },
  {
    path: "/auth/forgotpassword",

    element: <ForgotPassword />,
  },

  {
    path: "/dashboard",
    loader: requireAuth,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <CryptoAssets />,
      },

      {
        path: "swap",
        element: <Swap />,
      },
    ],
  },
  {
    path: "coin/:id",
    element: <CoinDetails />,
  },
  {
    path: "/setting",
    element: <ActionButtonLayout />,
    children: [
      {
        index: true,
        element: <Settings />,
      },
    ],
  },

  {
    path: "/swap",
    element: <ActionButtonLayout />,
    children: [
      {
        index: true,
        element: <Swap />,
      },
    ],
  },
  {
    path: "/history",
    element: <ActionButtonLayout />,
    children: [
      {
        index: true,
        element: <History />,
      },
    ],
  },

  {
    path: "/earn",
    element: <ActionButtonLayout />,
    children: [
      {
        index: true,
        element: <Earn />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
