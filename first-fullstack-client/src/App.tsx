import React from "react";
import AppRouter from "./Router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-red-500 min-h-screen">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
