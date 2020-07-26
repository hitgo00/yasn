import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import PostCard from '../components/PostCard';
import LazyLoad from 'react-lazyload';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import queryString from 'query-string';
import { ConnectServerUrl } from '../constants';
import Loader from '../components/Loader';

const cookies = new Cookies();
const email = cookies.get('userCookie').Email;

export default function ProfilePage(props) {
  const [loading, setLoading] = useState(true);
  const [userDetails, SetUserDetails] = useState({});

  useEffect(() => {
    console.log('get request');
    if (props.username) {
      axios
        .get(
          `${ConnectServerUrl}/username?` +
            queryString.stringify(
              { username: props.username },
              { withCredentials: true }
            )
        )
        .then((res) => {
          console.log(res.data[0]);
          SetUserDetails(res.data[0]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `${ConnectServerUrl}/profile?` +
            queryString.stringify({ email }, { withCredentials: true })
        )
        .then((res) => {
          console.log(res.data[0]);
          SetUserDetails(res.data[0]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [props.username]);

  return (
    <div>
      {!loading ? (
        userDetails ? (
          <ProfileCard
            name={userDetails.name}
            clubs={userDetails.clubsNumber}
            roll={userDetails.email.split('@')[0]}
            bio={userDetails.bio}
            posts={userDetails.posts}
            github={userDetails.gitHubUrl}
            linkedin={userDetails.linkedInUrl}
            instagram={userDetails.instaUrl}
          />
        ) : null
      ) : (
        <Loader />
      )}

      {!loading ? (
        userDetails.posts ? (
          userDetails.posts
            .slice(0)
            .reverse()
            .map((post) => (
              <LazyLoad height={200} offset={40} key={post._id}>
                <PostCard {...post} key={post._id} Name={userDetails.name} />
              </LazyLoad>
            ))
        ) : null
      ) : (
        <Loader />
      )}
    </div>
  );
}
