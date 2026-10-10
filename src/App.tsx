import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Reports from './pages/Reports';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Landing Page - No Layout */}
          <Route path="/" element={<Landing />} />
          
          {/* Dashboard Routes - With Layout */}
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="resources" element={<Resources />} />
            <Route path="profile" element={<Profile />} />
            <Route path="team" element={<Team />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
