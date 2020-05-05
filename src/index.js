import React, { Suspense, lazy, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import Loader from "./components/Loader";
import { CookiesProvider, Cookies } from "react-cookie";

const AuthenticatedApp = lazy(() => import("./App"));
const UnauthenticatedApp = lazy(() => import("./SignIn"));
const cookies = new Cookies();

console.log(cookies.get("userCookie"));

const Connect = () => {
  const userCookie = cookies.get("userCookie");
  const [emailDomain, setEmailDomain] = useState(
    userCookie ? userCookie.Email.split("@")[1] : ""
  );

  const [user, setUser] = useState(false);
  //    emailDomain === "daiict.ac.in" ? true : false
  //  );
  useEffect(() => {
    if (emailDomain === "daiict.ac.in") setUser(true);
  }, [cookies]);

  // if (userCookie) {
  //   setEmailDomain(userCookie.Email.split("@")[1]);
  //
  // }
  // let user = false;
  // if (emailDomain === "daiict.ac.in") {
  //   setUser(true);
  // }
  return (
    <CookiesProvider>
      <Suspense fallback={<Loader />}>
        <React.StrictMode>
          {/* {console.log(Cookies.get("userCookie"))} */}
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.StrictMode>
      </Suspense>
    </CookiesProvider>
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
