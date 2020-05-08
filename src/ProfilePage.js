import React, { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import PostCard from "./components/PostCard";

import { Cookies } from "react-cookie";
import axios from "axios";
import queryString from "query-string";
import { ConnectServerUrl } from "./constants";

const cookies = new Cookies();
const email = cookies.get("userCookie").Email;

export default function ProfilePage() {
  const [userDetails, SetUserDetails] = useState({});

  useEffect(() => {
    console.log("get request");
    axios
      .get(
        `${ConnectServerUrl}/profile?` +
          queryString.stringify({ email }, { withCredentials: true })
      )
      .then((res) => {
        console.log(res.data[0]);
        SetUserDetails(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <ProfileCard
        name={userDetails.name}
        clubs={userDetails.clubsNumber}
        roll={email.split("@")[0]}
        bio={userDetails.bio}
        posts={userDetails.posts}
        github={userDetails.gitHubUrl}
        linkedin={userDetails.linkedInUrl}
        instagram={userDetails.instaUrl}
      />
      <PostCard />
      <PostCard />
    </div>
  );
}
