import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
// import PostCard from "./components/PostCard";
import { StoreProvider } from "easy-peasy";

import ChatApp from "./ChatApp";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PrimarySearchAppBar />
        {/* <PostCard /> */}
        <StoreProvider store={store}>
          <ChatApp />
        </StoreProvider>

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      </header>
    </div>
  );
}

export default App;
