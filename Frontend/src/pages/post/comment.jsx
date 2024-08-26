import { useState } from "react";

const CommentForm = ({ addComment }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white p-1 rounded-md">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
