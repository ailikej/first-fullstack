import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import PostList from "./components/PostList";
import Signup from "./components/Signup";
import SinglePostPage from "./components/SinglePostPage";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { setUserToken } from "./features/userSlice";

const AppRouter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setUserToken({ token })); // Rehydrate your app's state with the token
    } else {
      navigate("/login");
    }
    setIsLoading(false); // Set loading to false after handling token
  }, [dispatch, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PostList />
          </PrivateRoute>
        }
      />
      <Route path="/posts" element={<Navigate to="/" replace />} />
      <Route
        path="/posts/:id"
        element={
          <PrivateRoute>
            <SinglePostPage />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/after-login" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
