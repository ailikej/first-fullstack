import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import PostList from "./components/PostList";
import Signup from "./components/Signup";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PostList />} />
      {/* Redirect user to PostList (or any other page) after login */}
      <Route path="/after-login" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
