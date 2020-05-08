import React, { Suspense, lazy, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import Loader from "./components/Loader";
import { CookiesProvider, Cookies } from "react-cookie";

import ProfileContext from "./components/ProfileContext";

const AuthenticatedApp = lazy(() => import("./App"));
const UnauthenticatedApp = lazy(() => import("./SignIn"));
const cookies = new Cookies();

console.log(cookies.get("userCookie"));

const Connect = () => {
  const profileHook = useState(true);

  const userCookie = cookies.get("userCookie");
  const [emailDomain, setEmailDomain] = useState(
    userCookie ? userCookie.Email.split("@")[1] : ""
  );

  const [user, setUser] = useState(false);

  useEffect(() => {
    if (emailDomain === "daiict.ac.in") setUser(true);
  }, [cookies]);

  return (
    <CookiesProvider>
      <ProfileContext.Provider value={profileHook}>
        <Suspense fallback={<Loader />}>
          <React.StrictMode>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
          </React.StrictMode>
        </Suspense>
      </ProfileContext.Provider>
    </CookiesProvider>
  );
};

ReactDOM.render(<Connect />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
