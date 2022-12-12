import React, { Fragment } from "react";
import { useRoutes } from "react-router-dom";
import "./App.less";
import routes from "./routes/index";

function App() {
  const RouteElement = useRoutes(routes);
  return (
    <Fragment>
      {RouteElement}
    </Fragment>
  );
}

export default App;
