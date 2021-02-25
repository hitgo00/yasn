import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import queryString from "query-string";
import { Cookies } from "react-cookie";
import { ConnectServerUrl } from "../../utils/constants";
import PostCard from "../../components/PostCard";
import LazyLoad from "react-lazyload";
import Loader from "../../components/Loader";

const cookies = new Cookies();
const LIMIT = 10;

const usePaginatedPosts = ({ googleToken, email, tag }) => {
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [endReached, setEndReached] = useState(false);

  const fetchPosts =
    async (pageToFetch) => {
      let nextPage = pageToFetch;  
      if (!endReached)
        await axios
          .get(
            `${ConnectServerUrl}/home?` +
              queryString.stringify(
                { tag, limit: LIMIT, page: pageToFetch, googleToken, email },
                { withCredentials: true }
              )
          )
          .then((res) => {
            console.log(res);
            console.log(posts);
            const mergedPosts = posts.concat(res.data.posts);
            setPosts(mergedPosts);
            if (Number(res.data.page) * LIMIT <= res.data.total) {
              console.log("moree incomminng");
              nextPage = Number(res.data.page) + 1;
              console.log(Number(res.data.page) + 1);
            } else {
              console.log("enddd");
              setEndReached(true);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setFetching(false);
          });
      return nextPage;
    }

  return {
    fetching,
    posts,
    endReached,
    fetchPosts,
  };
};

const HomePage = (props) => {
  const userCookie = cookies.get("userCookie");
  const googleToken = userCookie.Token;
  const email = userCookie.Email;
  const loader = useRef(null);
  const [pageToFetch, setPageToFetch] = useState(1);

  const { fetchPosts, fetching, endReached, posts } = usePaginatedPosts({
    googleToken,
    email,
    tag: props.browseTag,
  });

  // const [loading, setLoading] = useState(true);
  // const [fetching, setFetching] = useState(false);
  // const [browseTag, setBrowseTag] = useState(props.tag);
  // const [posts, setPosts] = useState([]);
  // const [endReached, setEndReached] =  useState(false);
  // const [pageToFetch, setPageToFetch] = useState(1);
  // const loader = useRef(null);

  // console.log(pageToFetch);

  // const fetchPosts = debounce ( () => {
  //   // if(posts.length ===pageToFetch)
  //   axios
  //   .get(
  //     `${ConnectServerUrl}/home?` +
  //       queryString.stringify(
  //         { tag: browseTag, limit: LIMIT, page: pageToFetch,  googleToken, email },
  //         { withCredentials: true }
  //       )
  //   )
  //   .then((res) => {
  //     console.log(res);
  //     console.log(posts);
  //     const mergedPosts  = posts.concat((res.data.posts));
  //     setPosts(mergedPosts);
  //     if(Number(res.data.page)*LIMIT <= res.data.total){
  //       setPageToFetch(Number(res.data.page )+1)
  //     }
  //     else{
  //       console.log("enddd")
  //       setEndReached(true);
  //     }
  //     setLoading(false);
  //   })
  //   .catch((err) => console.log(err)).finally(()=> {setFetching(false)});

  // },700)

  // useEffect(() => {
  //   setPageToFetch(1);
  //   fetchPosts();
  // }, []);

  const handleObserver = useCallback(
    debounce(async (entities) => {
      const target = entities[0];
      if (!endReached && !fetching && target.isIntersecting) {
        console.log("fetchhh");
        await fetchPosts(pageToFetch).then((nextPage) => {
          setPageToFetch(nextPage);
        });
      }
    }, 700),
    [endReached, fetching, pageToFetch]
  );

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return (
    <div>
      {!fetching ? (
        posts ? (
          posts.map((post) => (
            <LazyLoad height={200} offset={0} key={post._id}>
              <PostCard {...post} key={post._id} />
            </LazyLoad>
          ))
        ) : null
      ) : (
        <Loader />
      )}
      {!endReached ? (
        <div className="loading" ref={loader}>
          <h2>Loading...</h2>
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
