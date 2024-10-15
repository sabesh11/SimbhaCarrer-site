import React from 'react';
import Sidebar from '../Components/Sidebar'; 
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{  flexGrow: 1 }}>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
