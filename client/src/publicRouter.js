import React, { useEffect, lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useStore, useSelector } from "react-redux";

import authActions from "./redux/action/index";
// const Loading = lazy(() => import("./component/loading/loading"));
import Loading from "./component/loading/loading";

const PublicRouter = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authActions.checkUserSession());
  }, []);

  if (loading) {
    return <Loading />;
  } else if (isAuthenticated === false) {
    return <Route path={props.path} exact={props.exact || false} component={props.component} />;
  } else if (isAuthenticated === true) {
    return <Redirect to={"/"} />;
  } else {
    return null;
  }
};

export default React.memo(PublicRouter);
