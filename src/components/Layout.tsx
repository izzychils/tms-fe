import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      {/* Animated Liquid Background */}
      <div className="liquid-background">
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
      </div>

      <Sidebar />
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
