import React from "react";
import "./Authentication.css";
import Login from "./login/login";
import Register from "./register/register";
import { Route, useRouteMatch, Redirect } from "react-router-dom";

export default function Authentication() {
  const { path } = useRouteMatch();
  return (
    <div className="authentication__conatiner">
      <Route path={`${path}/login`} exact component={Login} />
      <Route path={`${path}/register`} exact component={Register} />
      {/* <Redirect from="/auth" to={`${path}/login`} exact /> */}
      {/* The default route */}
      {/* <Route path={path}>
        <Login />
      </Route> */}
      {/* <Login /> */}
      {/* <Register /> */}
    </div>
  );
}
