import { useState } from "react";

const PostForm = ({ addPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(content);
    setContent("");
  };

  return (
    <div className="flex justify-center items-center min-h-[20vh] bg-gray-100 mt-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Create a Post</h2>
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
