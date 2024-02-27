import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/userSlice";

const PostForm = ({
  onClose,
  onPostCreated,
}: {
  onClose: () => void;
  onPostCreated: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = useSelector(selectUserToken);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3001/api/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onPostCreated();
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20">
      <div className="bg-white p-4 rounded-lg shadow-lg space-y-3 max-w-md">
        <h2 className="text-lg font-bold">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="content" className="block">
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
