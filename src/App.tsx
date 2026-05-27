import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Camera } from './pages/Camera';
import { ManualEntry } from './pages/ManualEntry';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

const App: React.FC = () => {
  const user = useAppStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/camera" 
            element={user ? <Camera /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/manual" 
            element={user ? <ManualEntry /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/history" 
            element={user ? <History /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
