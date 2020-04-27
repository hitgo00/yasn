import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import PrimarySearchAppBar from "./components/PrimarySearchAppBar";

import NavAppBar from "./components/NavAppBar";

import { Router } from "@reach/router";
import HomePage from "./HomePage";
import { StoreProvider } from "easy-peasy";

import ChatApp from "./ChatApp";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <PrimarySearchAppBar />
         */}
        {/* <NavBar /> */}
        <NavAppBar />

        <StoreProvider store={store}>
          <Router>
            <HomePage path="/" />
            <ChatApp path="/chat" />
          </Router>
        </StoreProvider>
      </header>
    </div>
  );
}

export default App;
