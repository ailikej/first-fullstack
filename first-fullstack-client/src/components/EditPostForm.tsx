import React, { useState } from "react";
import axios from "axios";
import { Post } from "./PostList";

const EditPostForm = ({
  post,
  onClose,
  onPostUpdated,
}: {
  post: Post;
  onClose: () => void;
  onPostUpdated: () => void;
}) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3001/api/posts/${post.id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onPostUpdated(); // Refresh the posts list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit Post
          </h3>
          <form onSubmit={updatePost} className="mt-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none h-40"
            />
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-3 inline-flex justify-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
