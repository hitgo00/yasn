import React, { useState, useRef, useCallback } from "react";
import { Cookies } from "react-cookie";
import PostCard from "../../components/PostCard";
import LazyLoad from "react-lazyload";
import Loader from "../../components/Loader";
import usePaginatedPosts from "./usePaginatedPosts";

const cookies = new Cookies();

const options = {
  root: null,
  rootMargin: "35px",
  threshold: 0.1,
};

const HomePage = (props) => {
  const userCookie = cookies.get("userCookie");
  const googleToken = userCookie.Token;
  const email = userCookie.Email;
  const [pageToFetch, setPageToFetch] = useState(1);

  const { fetching, hasMore, posts } = usePaginatedPosts({
    googleToken,
    email,
    tag: props.browseTag,
    pageToFetch,
  });

  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (fetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageToFetch((pageToFetch) => pageToFetch + 1);
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [fetching, hasMore]
  );

  return (
    <div>
      {posts
        ? posts.map((post, index) => {
            if (posts.length === index + 1) {
              console.log("last");
              return (
                <div ref={lastElementRef} key={post._id}>
                  <PostCard {...post} key={post._id} />
                </div>
              );
            }
            return (
              <LazyLoad height={200} offset={0} key={post._id}>
                <PostCard {...post} key={post._id} />
              </LazyLoad>
            );
          })
        : null}
      {fetching && <Loader />}
    </div>
  );
};

export default HomePage;
