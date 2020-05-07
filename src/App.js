import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";
// import PrimarySearchAppBar from "./components/PrimarySearchAppBar";

import NavAppBar from "./components/NavAppBar";

import { Router } from "@reach/router";
import HomePage from "./HomePage";
import { StoreProvider } from "easy-peasy";

import ProfilePage from "./ProfilePage";
import AddPostPage from "./AddPostPage";
import SignIn from "./SignIn";
import AddProfile from "./AddProfile";

import ChatApp from "./ChatApp";
import { store } from "./store";
import { ConnectServerUrl } from "./constants";
import queryString from "query-string";
import { Cookies } from "react-cookie";
import ProfileContext from "./components/ProfileContext";

const cookies = new Cookies();

function App() {
  const userCookie = cookies.get("userCookie");
  const userEmail = userCookie.Email;

  const [profile, setProfile] = useContext(ProfileContext);

  useEffect(() => {
    axios
      .get(
        `${ConnectServerUrl}/checkprofile?` +
          queryString.stringify({ email: userEmail }, { withCredentials: true })
      )
      .then((res) => {
        console.log(res.data);
        if (!res.data) setProfile(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {profile ? (
          <>
            <NavAppBar>
              <StoreProvider store={store}>
                <Router>
                  <HomePage path="/" />
                  <ChatApp path="/chat" />
                  <ProfilePage path="/profile" />
                  <AddPostPage path="/add" />
                  <SignIn path="/signin" />
                </Router>
              </StoreProvider>
            </NavAppBar>
          </>
        ) : (
          <AddProfile />
        )}
        {/* <AddProfile />

        <NavAppBar>
          <StoreProvider store={store}>
            <Router>
              <HomePage path="/" />
              <ChatApp path="/chat" />
              <ProfilePage path="/profile" />
              <AddPostPage path="/add" />
              <SignIn path="/signin" />
            </Router>
          </StoreProvider> */}
        {/* </NavAppBar> */}
      </header>
    </div>
  );
}

export default App;
