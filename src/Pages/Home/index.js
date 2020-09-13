import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { ConnectServerUrl } from '../../utils/constants';
import PostCard from '../../components/PostCard';
import LazyLoad from 'react-lazyload';
import Loader from '../../components/Loader';

const HomePage = (props) => {
  const [loading, setLoading] = useState(true);
  const [browseTag, SetBrowseTag] = useState(props.tag);
  const [posts, SetPosts] = useState();

  useEffect(() => {
    axios
      .get(
        `${ConnectServerUrl}/home?` +
          queryString.stringify({ tag: browseTag }, { withCredentials: true })
      )
      .then((res) => {
        SetPosts(res.data);
        setLoading(false);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {!loading ? (
        posts ? (
          posts.map((post) => (
            <LazyLoad height={200} offset={0} key={post._id}>
              <PostCard {...post} key={post._id} />{' '}
            </LazyLoad>
          ))
        ) : null
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default HomePage;
