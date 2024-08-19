import React from 'react';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { UserProvider } from '@/context/userContext';
import ProtectedRoute from '@/components/global/ProtectedRoute';

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <UserProvider>
      <ProtectedRoute>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            {props.children}
          </div>
        </div>
      </ProtectedRoute>
    </UserProvider>
  );
};

export default Layout;
