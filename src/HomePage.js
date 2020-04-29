import React from "react";
import PostCard from "./components/PostCard";
import UploadImage from "./components/Upload";

const HomePage = () => {
  return (
    <div>
      <UploadImage />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default HomePage;
