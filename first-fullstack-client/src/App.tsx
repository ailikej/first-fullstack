import { useEffect, useState } from 'react';
import AppRouter from './Router';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserToken } from './features/userSlice';

function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserToken({ token }));
    }
    setIsCheckingAuth(false);
  }, [dispatch]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="bg-red-100 min-h-screen">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
