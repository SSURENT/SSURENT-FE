import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import '../../../features/admin/pages/Admin.css';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-root flex min-h-screen flex-col bg-light">
      <AdminHeader />
      <main className="container-fluid px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
