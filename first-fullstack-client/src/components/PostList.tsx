import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is stored under the key 'token'

      try {
        const response = await axios.get("http://localhost:3001/api/posts", {
          headers: {
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data); // Assuming the response body will directly contain the array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle errors here, such as showing an error message
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-6"
          >
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              {/* Add more post details here */}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p className="text-gray-600">No posts found.</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
