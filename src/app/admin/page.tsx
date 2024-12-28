"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from './layouts/Dashboard';
import Slogan from './layouts/Slogan';
import About from './layouts/About';
import Service from './layouts/Service';
import Contact from './layouts/Contact';

const DashboardHome = () => {
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
  return (
    <div>
      {idTabActive === 'homeTab' && <Dashboard />}
      {idTabActive === 'sloganTab' && <Slogan />}
      {idTabActive === 'aboutTab' && <About />}
      {idTabActive === 'serviceTab' && <Service />}
      {idTabActive === 'contactTab' && <Contact />}
    </div>
  );
};

export default DashboardHome;