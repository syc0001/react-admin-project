import React, { Fragment } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import "./App.less";
import routes from "./routes/index";

function App() {
  const RouteElement = useRoutes(routes);
  return (
    <Fragment>
      {/* Hello World
      <button>Login</button> */}
      
      {/* <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes> */}

      {RouteElement}
    </Fragment>
  );
}

export default App;
