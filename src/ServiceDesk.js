import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import HomeAdmin from "./pages/HomeAdmin";
import HomeUser from "./pages/HomeUser";
import NewIssue from "./pages/NewIssue";

import "antd/dist/antd.css";
import "./styles/styles.scss";

const ServiceDesk = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/homeAdmin" component={HomeAdmin} />
        <Route exact path="/homeUser" component={HomeUser} />
        <Route exact path="/newIssue" component={NewIssue} />
      </Switch>
    </BrowserRouter>
  );
};

export default ServiceDesk;
