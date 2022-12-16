import { Navigate } from "react-router-dom";
import Bar from "../components/Bar/Bar";
import Category from "../components/Category/Category";
import Home from "../components/Home/Home";
import Line from "../components/Line/Line";
import Pie from "../components/Pie/Pie";
import Product from "../components/Product/Product";
import Role from "../components/Role/Role";
import User from "../components/User/User";
import Admin from "../containers/Admin/Admin";
import Login from "../containers/Login/Login";

const routers = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <Navigate to="/admin/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "role",
        element: <Role />,
      },
      {
        path: "bar",
        element: <Bar />,
      },
      {
        path: "line",
        element: <Line />,
      },
      {
        path: "pie",
        element: <Pie />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];

export default routers;