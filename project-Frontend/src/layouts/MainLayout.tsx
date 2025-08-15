import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;