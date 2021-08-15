import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NewIssue from "./pages/NewIssue";

import "antd/dist/antd.css";
import "./styles/styles.scss";

const ServiceDesk = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/newIssue" component={NewIssue} />
      </Switch>
    </BrowserRouter>
  );
};

export default ServiceDesk;
