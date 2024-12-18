"use client";

import React from 'react';
import Header from './layouts/Header';
import { useSelector } from 'react-redux';
import DashboardHome from './layouts/DashboardHome';

const Admin = () => {
  const idTabActive = useSelector((state: { header: { idTabActive: string } }) => state.header.idTabActive);
  return (
    <div style={{ overflow: 'hidden' }}>
      <Header />
      {idTabActive === 'homeTab' && <DashboardHome />}
    </div>
  );
};

export default Admin;