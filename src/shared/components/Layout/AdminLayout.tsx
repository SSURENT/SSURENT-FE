import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import BottomBar from '../BottomBar/BottomBar';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 관리자 전용 헤더 */}
      <AdminHeader />

      <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
        <Outlet />
      </main>

      <BottomBar />
    </div>
  );
};

export default AdminLayout;
