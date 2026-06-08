import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import AdminHeader from '../components/Header/AdminHeader';
const AdminRoute = () => {
  const { role } = useAuthStore();

  // 1. 관리자가 아니면 홈으로 쫓아냄 (문지기 역할)
  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // 2. 관리자라면 헤더 + 하위 페이지를 함께 보여줌 (레이아웃 역할)
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-content">
        <Outlet /> {/* 실제 페이지 내용 (AdminItems 등) */}
      </main>
    </div>
  );
};

export default AdminRoute;
