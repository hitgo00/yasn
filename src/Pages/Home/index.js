import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import queryString from 'query-string';
import { Cookies } from 'react-cookie';
import { ConnectServerUrl } from '../../utils/constants';
import PostCard from '../../components/PostCard';
import LazyLoad from 'react-lazyload';
import Loader from '../../components/Loader';

const cookies = new Cookies();

const LIMIT = 10;
const HomePage = (props) => {
  const userCookie = cookies.get('userCookie');
  const googleToken = userCookie.Token;
  const email = userCookie.Email;

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [browseTag, setBrowseTag] = useState(props.tag);
  const [posts, setPosts] = useState([]);
  const [endReched, setEndReached] =  useState(false);
  const [currentPostsPage, setCurrentPostsPage] = useState(0);
  const loader = useRef(null);

  const fetchPosts = useCallback( () => {
    axios
    .get(
      `${ConnectServerUrl}/home?` +
        queryString.stringify(
          { tag: browseTag, limit: LIMIT, page: currentPostsPage + 1,  googleToken, email },
          { withCredentials: true }
        )
    )
    .then((res) => {
      console.log(res);
      console.log(posts);
      const mergedPosts  = posts.concat((res.data.posts));
      setPosts(mergedPosts);
      if(Number(res.data.page)*LIMIT <= res.data.total){
        setCurrentPostsPage(Number(res.data.page))
      }
      else{
        console.log("enddd")
        setEndReached(true);
      } 
      setLoading(false);
    })
    .catch((err) => console.log(err)).finally(()=> {setFetching(false)});
    
  },[browseTag, currentPostsPage, email, googleToken, posts])

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (!endReched && !fetching && target.isIntersecting) { 
      console.log("fetchhh")
      setFetching(true);
      fetchPosts();
    }
  },[endReched, fetchPosts, fetching])

  useEffect(() => {
    var options = {
       root: null,
       rootMargin: "20px",
       threshold: 1.0
    };
   // initialize IntersectionObserver
   // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
       observer.observe(loader.current)
    }

}, [handleObserver]);



  return (
    <div>
      {!loading ? (
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
      {!endReched? <div className="loading" ref={loader}>
          <h2>Loading...</h2>
      </div> : null}
    </div>
  );
};

export default HomePage;
