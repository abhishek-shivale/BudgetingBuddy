import React from 'react';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
