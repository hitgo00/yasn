import React from "react";
import ProfileCard from "./components/ProfileCard";
import PostCard from "./components/PostCard";

export default function ProfilePage() {
  return (
    <div>
      <ProfileCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
