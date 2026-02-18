import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/ssulogo.jpg';
import '../../styles/App.css';

import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const hideLoginButton =
    location.pathname === '/login' || location.pathname === '/changePW';
  const [isOpen, setIsOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    'nav-link px-3 link-dark fw-bold' + (isActive ? ' active' : '');

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg py-3 mb-4 border-bottom">
        <div className="container-fluid">
          <NavLink
            to="/"
            className="d-flex align-items-center text-dark text-decoration-none"
            onClick={closeNavbar}
          >
            <img
              src={logo}
              alt="로고 이미지"
              style={{ width: '90px' }}
              className="img-fluid me-2"
            />
            <span className="fs-4">SSURENT</span>
          </NavLink>
          {/* 햄버거 버튼 (모바일에서만 보임)*/}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="navbarNav"
            className={`navbar-collapse ${isOpen ? 'd-block' : 'd-none'} d-lg-flex`}
          >
            <ul className="navbar-nav me-auto ms-lg-5 mb-3 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/rent" className={linkClass} onClick={closeNavbar}>
                  대여하기
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/return"
                  className={linkClass}
                  onClick={closeNavbar}
                >
                  반납하기
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/info" className={linkClass} onClick={closeNavbar}>
                  정보
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/mypage"
                  className={linkClass}
                  onClick={closeNavbar}
                >
                  마이페이지
                </NavLink>
              </li>
            </ul>

            {!hideLoginButton && (
              <div className="text-center text-lg-end mt-2 mt-lg-0">
                <NavLink to="/login" onClick={closeNavbar}>
                  <button
                    type="button"
                    className="btn btn-outline-primary w-100"
                    style={{ maxWidth: '200px' }}
                  >
                    로그인
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
