"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from './layouts/Dashboard';

const DashboardHome = () => {
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
  return (
    <div>
      {idTabActive === 'homeTab' && <Dashboard />}
    </div>
  );
};

export default DashboardHome;