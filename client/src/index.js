import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { AuthContextProvider } from "./context/auth/authContext";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./redux/reducer/index";
import rootSaga from "./redux/saga/index";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
//compose kết hợp middleware voi nhau
// const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// const store = compose(
//   applyMiddleware(sagaMiddleware),
//   typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
//     ? (a) => a
//     : window.__REDUX_DEVTOOLS_
// Then run the saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
