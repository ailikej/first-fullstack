import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PostList from './components/PostList';
import Signup from './components/Signup';
import SinglePostPage from './components/SinglePostPage';
import PrivateRoute from './components/PrivateRoute';

const AppRouter = () => {
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
    </Routes>
  );
};

export default AppRouter;
