import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import esES from "antd/lib/locale-provider/es_ES";

import Login from "./pages/Login";
import HomeAdmin from "./pages/HomeAdmin";
import HomeUser from "./pages/HomeUser";
import HomeGraphs from "./pages/HomeGraphs";

import "antd/dist/antd.css";
import "./styles/styles.scss";

const ServiceDesk = () => {
  return (
    <ConfigProvider locale={esES}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/homeAdmin" component={HomeAdmin} />
          <Route exact path="/homeUser" component={HomeUser} />
          <Route exact path="/homeGraphs" component={HomeGraphs} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default ServiceDesk;
