import React from 'react';
import Sidebar from './Sidebar';
import { ModalDetailContent } from '../modules';
import BottomBar from './BottomBar';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full">
      <NavBar />

      <div className="flex flex-row w-full h-full">
        <Sidebar />
        {children}
        <BottomBar />
      </div>

      <ModalDetailContent />
    </div>
  );
};

export default Layout;
