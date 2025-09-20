import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/auth/Signup";
import LoginForm from "./pages/auth/Login";
import { requireAuth } from "./scripts/auth.loader";
import DashboardLayout from "./components/dashboard/users/DashboardLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CryptoAssets from "./pages/user/CrytoAssets";
import CoinDetails from "./pages/user/CoinDetails";
import Swap from "./pages/user/Swap";
import ActionButtonLayout from "./components/dashboard/users/ActionButtonsLayout";
import Settings from "./pages/user/Settings";
import History from "./pages/user/History";
import ApplicantDetails from "./pages/admin/ApplicantDetails";
import Earn from "./pages/user/Earn";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminDashboardOverview from "./pages/admin/AdminDashboardOverview";
import UserManagement from "./pages/admin/UserManagement";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    children: [
      {
        path: "/auth/signup",

        element: <Signup />,
      },
      {
        path: "/auth/login",

        element: <LoginForm />,
      },

      {
        path: "/auth/forgotpassword",

        element: <ForgotPassword />,
      },
    ],
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
    ],
  },

  {
    path: "/",
    element: <ActionButtonLayout />,
    children: [
      {
        path: "/dashboard/coin/:id",
        element: <CoinDetails />,
      },
      {
        path: "/dashboard/earn",
        element: <Earn />,
      },
      {
        path: "/dashboard/history",
        element: <History />,
      },
      {
        path: "/dashboard/swap",
        element: <Swap />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "/admin/dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        element: <AdminDashboardOverview />,
        index: true,
      },
      {
        element: <UserManagement />,
        path: "/admin/dashboard/users/",
      },
      {
        element: <ApplicantDetails />,
        path: "/admin/dashboard/users/:id",
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
