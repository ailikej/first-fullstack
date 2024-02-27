import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm"; // Import the PostForm component
import EditPostForm from "./EditPostForm";
import { Link } from "react-router-dom";

export interface Post {
  id: number;
  title: string;
  content: string;
}

const PostList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [showPostForm, setShowPostForm] = useState(false); // State to control the modal visibility
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3001/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  const deletePost = async (postId: number) => {
    const token = localStorage.getItem("token"); // Assuming you store your token in localStorage
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting post:", error);
      // Optionally handle errors, such as showing an error message to the user
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          onClick={() => setShowPostForm(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Post
        </button>
      </div>

      {showPostForm && (
        <PostForm
          onClose={() => setShowPostForm(false)}
          onPostCreated={fetchPosts} // This will refetch posts once a new post is created
        />
      )}
      <div className="mb-4 text-right">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-6 "
          >
            <Link to={`/posts/${post.id}`}>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default button action

                    e.stopPropagation(); // Prevent link navigation
                    setEditingPost(post);
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default button action

                    e.stopPropagation(); // Prevent link navigation
                    deletePost(post.id);
                  }}
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p className="text-gray-600">No posts found.</p>
        </div>
      )}
      {editingPost && (
        <EditPostForm
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onPostUpdated={fetchPosts} // This will refetch posts once a post is updated
        />
      )}
    </div>
  );
};

export default PostList;
