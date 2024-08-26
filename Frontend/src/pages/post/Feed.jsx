import { useState } from "react";
import PostForm from "./postForm";
import Post from "./post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (content) => {
    setPosts([...posts, { content, comments: [] }]);
  };

  return (
    <div className="p-4">
      <PostForm addPost={addPost} />
      <div className="mt-4">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
