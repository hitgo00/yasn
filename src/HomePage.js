import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { ConnectServerUrl } from "./constants";
import PostCard from "./components/PostCard";

const HomePage = () => {
  const [browseTag, SetBrowseTag] = useState("");

  useEffect(() => {
    axios
      .get(
        `${ConnectServerUrl}/posts?` +
          queryString.stringify({ tag: browseTag }, { withCredentials: true })
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [browseTag]);

  return (
    <div>
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default HomePage;
