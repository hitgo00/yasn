import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import Loader from "./components/Loader";

const AuthenticatedApp = lazy(() => import("./App"));
const UnauthenticatedApp = lazy(() => import("./SignIn"));

const Connect = () => {
  const user = true;
  return (
    <Suspense fallback={<Loader />}>
      <React.StrictMode>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.StrictMode>
    </Suspense>
  );
};

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <SignIn />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

ReactDOM.render(<Connect />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
