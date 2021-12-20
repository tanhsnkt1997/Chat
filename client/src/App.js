import { lazy, Suspense } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { AuthContext } from "./context/auth/authContext";
import PrivateRouter from "./privateRouter";
import PublicRouter from "./publicRouter";

const Home = lazy(() =>
  import("./component/home/home.jsx").catch(() => console.log("Error in importing home."))
);
const Authentication = lazy(() =>
  import("./component/authentication/authentication").catch(() =>
    console.log("Error in importing authentication.")
  )
);

const VideoCall = lazy(() =>
  import("./component/chatShow/header/navToolBox/videocall/index.jsx").catch(() =>
    console.log("Error in importing VideoCall.")
  )
);

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<></>}>
          <Switch>
            <PublicRouter path="/auth" component={Authentication} />
            <PrivateRouter path="/" exact={true} component={Home} />
            {/* <Route path="/groupcall/:room" exact={true} component={VideoCall} /> */}
            <PrivateRouter path="/groupcall/:room" exact={true} component={VideoCall} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
