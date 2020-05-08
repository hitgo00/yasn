import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { ConnectServerUrl } from "./constants";
import PostCard from "./components/PostCard";
import LazyLoad from "react-lazyload";

const HomePage = (props) => {
  const [browseTag, SetBrowseTag] = useState(props.tag);
  const [posts, SetPosts] = useState();

  useEffect(() => {
    axios
      .get(
        `${ConnectServerUrl}/home?` +
          queryString.stringify({ tag: browseTag }, { withCredentials: true })
      )
      .then((res) => {
        console.log(res.data);
        SetPosts(res.data);
      })

      .catch((err) => console.log(err));
  }, [browseTag]);

  return (
    <div>
      {posts
        ? posts.map((post) => (
            <LazyLoad height={200} offset={10} key={post._id}>
              <PostCard {...post} key={post._id} />{" "}
            </LazyLoad>
          ))
        : null}
    </div>
  );
};

export default HomePage;
