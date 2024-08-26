import { useState } from "react";
import CommentForm from "./comment";

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments);

  const addComment = (content) => {
    setComments([...comments, { content, replies: [] }]);
  };

  const addReply = (content, commentIndex) => {
    const newComments = [...comments];
    newComments[commentIndex].replies.push({ content });
    setComments(newComments);
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg mt-4">
      <p>{post.content}</p>
      <div className="mt-2">
        {comments.map((comment, index) => (
          <div key={index} className="mt-4">
            <div className="bg-white p-2 rounded-md">
              <p>{comment.content}</p>
              <CommentForm addComment={(content) => addReply(content, index)} />
              <div className="pl-4 mt-2">
                {comment.replies.map((reply, idx) => (
                  <div key={idx} className="mt-2 bg-gray-200 p-2 rounded-md">
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <CommentForm addComment={addComment} />
    </div>
  );
};

export default Post;
