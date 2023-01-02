import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Bar from "../components/Bar/Bar";
import Category from "../components/Category/Category";
import Home from "../components/Home/Home";
import Line from "../components/Line/Line";
import Pie from "../components/Pie/Pie";
import AddUpdate from "../components/Product/AddUpdate/AddUpdate";
import Detail from "../components/Product/Detail/Detail";
import Product from "../components/Product/Product";
import Role from "../components/Role/Role";
import User from "../components/User/User";
import Admin from "../containers/Admin/Admin";
import Login from "../containers/Login/Login";

// const Bar = lazy(() => import("../components/Bar/Bar"));
// const Category = lazy(() => import("../components/Category/Category"));
// const Home = lazy(() => import("../components/Home/Home"));
// const Line = lazy(() => import("../components/Line/Line"));
// const Pie = lazy(() => import("../components/Pie/Pie"));
// const AddUpdate = lazy(
//   () => import("../components/Product/AddUpdate/AddUpdate")
// );
// const Detail = lazy(() => import("../components/Product/Detail/Detail"));
// const Product = lazy(() => import("../components/Product/Product"));
// const Role = lazy(() => import("../components/Role/Role"));
// const User = lazy(() => import("../components/User/User"));
// const Admin = lazy(() => import("../containers/Admin/Admin"));
// const Login = lazy(() => import("../containers/Login/Login"));

const routers: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "prud_about",
        children: [
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "product",
            element: <Product />,
            children: [
              {
                path: "addupdate",
                element: <AddUpdate />,
              },
              {
                path: "addupdate/:id",
                element: <AddUpdate />,
              },
              {
                path: "detail/:id",
                element: <Detail />,
              },
            ],
          },
        ],
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
        path: "echats",
        children: [
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
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];

export default routers;
