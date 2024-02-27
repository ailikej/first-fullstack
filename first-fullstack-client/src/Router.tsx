import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import PostList from "./components/PostList";
import Signup from "./components/Signup";
import SinglePostPage from "./components/SinglePostPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts" element={<Navigate to="/" replace />} />
      <Route path="/posts/:id" element={<SinglePostPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/after-login" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
