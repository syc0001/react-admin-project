import { Navigate } from "react-router-dom";
import Admin from "../containers/admin";
import Login from "../containers/login";

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
