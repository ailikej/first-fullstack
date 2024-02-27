import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Post } from './PostList';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../features/userSlice';

const SinglePostPage = () => {
  const { id } = useParams(); // This hooks allows us to access the id parameter from the URL
  const [post, setPost] = useState<Post | null>(null);

  const token = useSelector(selectUserToken);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]); // Dependency array: re-run the effect if 'id' changes

  if (!post) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
      {/* Add more post details here */}
    </div>
  );
};

export default SinglePostPage;
