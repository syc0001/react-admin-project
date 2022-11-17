import { Navigate } from "react-router-dom";
import Admin from "../pages/admin";
import Login from "../pages/login";

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];
