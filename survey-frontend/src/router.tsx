import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Surveys from "./pages/Surveys";

// import SurveyPublicView from "./views/SurveyPublicView";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import SurveyView from "./pages/SurveyView";
import SurveyPublicView from "./pages/SurveyPublicView";
// import SurveyView from "./views/SurveyView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/surveys/create",
        element: <SurveyView />,
      },
      {
        path: "/surveys/:id",
        element: <SurveyView />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/survey/public/:slug",
    element: <SurveyPublicView />,
  },
]);

export default router;
