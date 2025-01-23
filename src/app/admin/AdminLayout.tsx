"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SideBar from './components/SideBar';
import Dashboard from './layouts/Dashboard';
import Slogan from './layouts/Slogan';
import About from './layouts/About';
import Service from './layouts/Service';
import Contact from './layouts/Contact';
import Messages from './layouts/Messages';
import Header from './components/Header';
import NotificationPage from '../components/NotificationPage';
import LoadingPage from '../components/LoadingPage';
import Profile from './layouts/Profile';
import ConfirmDialog from '../components/ConfirmDialog';

const AdminLayout = () => {
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
  const isLoadingSubmit = useSelector((state: { admin: { isLoadingSubmit: boolean } }) => state.admin.isLoadingSubmit);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [dialogConfirmData, setConfirmDialogData] = useState({
    handleConfirm: () => { },
    ConfirmDialogHeader: { id: '', en: '' },
    ConfirmDialogMessage: { id: '', en: '' },
    ConfirmDialogWarning: { id: '', en: '' },
    TextCancel: { id: '', en: '' },
    TextConfirm: { id: '', en: '' },
  });
  return (
    <div className="w-[100vw] h-[100vh] flex">
      <LoadingPage
        className='bg-black bg-opacity-60 fixed inset-0 z-50'
        color='#00B300'
        isLoading={isLoadingSubmit}
        textLoading='Loading Submit...'
      />
      <div className="hidden xl:flex w-[20vw]">
        <SideBar setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />
      </div>
      <div className="w-full xl:w-[80vw] h-full flex flex-col">
        <div className="h-[10vh]">
          <Header setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />
        </div>
        <div className="flex-1 overflow-auto">
          {idTabActive === 'homeTab' && <Dashboard />}
          {idTabActive === 'sloganTab' && <Slogan setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />}
          {idTabActive === 'aboutTab' && <About setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />}
          {idTabActive === 'serviceTab' && <Service setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />}
          {idTabActive === 'contactTab' && <Contact setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />}
          {idTabActive === 'messagesTab' && <Messages setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />}
          {idTabActive === 'profileTab' && <Profile setConfirmDialogData={setConfirmDialogData} openConfirmDialog={() => setIsOpenConfirmDialog(true)} disableConfirmDialog={() => setIsOpenConfirmDialog(false)} />}
        </div>
        <div className='flex justify-center'>
          <NotificationPage />
          <ConfirmDialog
            dialogConfirmData={dialogConfirmData}
            isOpen={isOpenConfirmDialog}
            handleCancel={() => setIsOpenConfirmDialog(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;