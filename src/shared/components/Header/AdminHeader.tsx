import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../features/auth/store/useAuthStore';

const AdminHeader: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-bottom py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          to="/admin"
          className="text-decoration-none text-dark fs-4 fw-bold"
        >
          SSURENT{' '}
          <span className="text-primary" style={{ fontSize: '0.9rem' }}>
            ADMIN
          </span>
        </Link>

        <nav className="d-flex gap-4 fw-semibold">
          <Link to="/admin/items" className="nav-link">
            물품 관리
          </Link>
          <Link to="/admin/users" className="nav-link">
            회원 관리
          </Link>
          <Link to="/admin/inspect" className="nav-link">
            물품 검수
          </Link>
          <Link to="/admin/stats" className="nav-link">
            통계
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
