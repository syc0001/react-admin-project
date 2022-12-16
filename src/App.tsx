import { Fragment, FC } from "react";
import { useRoutes } from "react-router-dom";
import "./App.less";
import routers from "./routes/index";

const App: FC<any> = () => {
  const RouteElement = useRoutes(routers);
  return (
    <Fragment>
      {RouteElement}
    </Fragment>
  );
};

export default App;
