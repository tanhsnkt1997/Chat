import React, { useEffect, memo, lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useStore, useSelector } from "react-redux";

import Loading from "./component/loading/loading";
import authActions from "./redux/action/index";
// const Loading = lazy(() => import("./component/loading/loading"));

const PrivateRouter = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("vao check session !!!");
    dispatch(authActions.checkUserSession());
  }, []);

  if (loading) {
    return <Loading />;
  } else if (isAuthenticated === false) {
    return <Redirect to={"/auth/login"} />;
  } else if (isAuthenticated === true) {
    return <Route path={props.path} exact={props.exact || false} component={props.component} />;
  } else {
    return null;
  }

  //   return user ? <Route path={props.path} exact={props.exact || false} component={props.component} /> : <Redirect to={"/auth/login"} />;
};

export default React.memo(PrivateRouter);
