import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/ssulogo.jpg';
import { useAuthStore } from '../../../features/auth/store/useAuthStore';
import '../../styles/App.css';

const AdminHeader: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 활성화된 메뉴 강조 스타일
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    'nav-link px-3 link-dark fw-bold' + (isActive ? ' active' : '');

  return (
    <div className="container">
      <nav className="navbar py-3 mb-4 border-bottom">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* 로고 영역 */}
          <NavLink
            to="/admin"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <img
              src={logo}
              alt="로고 이미지"
              style={{ width: '90px' }}
              className="img-fluid me-2"
            />
            <span className="fs-4">
              SSURENT{' '}
              <span className="text-primary" style={{ fontSize: '0.9rem' }}>
                ADMIN
              </span>
            </span>
          </NavLink>

          {/* 메뉴 리스트 (항상 노출) */}
          <div className="d-flex align-items-center flex-grow-1">
            <ul className="navbar-nav d-flex flex-row ms-5 mb-0">
              <li className="nav-item">
                <NavLink to="/admin/items" className={linkClass}>
                  물품 관리
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/users" className={linkClass}>
                  회원 관리
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/inspect" className={linkClass}>
                  물품 검수
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/stats" className={linkClass}>
                  통계
                </NavLink>
              </li>
            </ul>
          </div>

          {/* 로그아웃 버튼 (항상 우측 고정) */}
          <div className="ms-3">
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-outline-danger"
              style={{ minWidth: '100px' }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
