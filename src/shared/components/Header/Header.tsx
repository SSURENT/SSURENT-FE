import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import logo from '../../assets/images/ssulogo.jpg';
import '../../styles/App.css';
import './Header.css';
import { useAuthStore } from '../../../features/auth/store/useAuthStore';
import { useUserInfo } from '../../../store/userStore';
import { useRef, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const hideLoginButton =
    location.pathname === '/login' || location.pathname === '/changePW';
  const isLoggedIn = !!sessionStorage.getItem('accessToken');
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === 'admin';
  console.log(`Header.tsx__role: ${role}`);
  const navigate = useNavigate();
  const goToMyPage = () => navigate('/mypage');

  const studentNum = useUserInfo((state) => state.studentNum);
  const name = useUserInfo((state) => state.name);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    'nav-link px-3 link-dark fw-bold' + (isActive ? ' active' : '');

  const profileRef = useRef<HTMLDivElement>(null);

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

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`navbar-collapse ${
              isOpen ? 'd-block' : 'd-none'
            } d-lg-flex`}
          >
            <ul className="navbar-nav me-auto ms-lg-5 mb-3 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/rent" className={linkClass}>
                  대여하기
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/return" className={linkClass}>
                  반납하기
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/mypage" className={linkClass}>
                  마이페이지
                </NavLink>
              </li>
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink to="/admin/items" className={linkClass}>
                      물품관리
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/users" className={linkClass}>
                      회원관리
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/stats" className={linkClass}>
                      통계
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/inspect" className={linkClass}>
                      검수하기
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {!hideLoginButton && (
              <div className="text-center text-lg-end mt-2 mt-lg-0">
                {!isLoggedIn ? (
                  <NavLink to="/login">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                      style={{ maxWidth: '200px' }}
                    >
                      로그인
                    </button>
                  </NavLink>
                ) : (
                  <div
                    className="position-relative"
                    ref={profileRef}
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <button
                      className="btn btn-light rounded-circle"
                      style={{
                        width: '45px',
                        height: '45px',
                      }}
                      onClick={goToMyPage}
                    >
                      👤
                    </button>

                    {isProfileOpen &&
                      createPortal(
                        <div
                          className="custom-profile-overlay"
                          style={{
                            position: 'fixed',
                            top:
                              profileRef.current?.getBoundingClientRect()
                                .bottom ?? 0,
                            right:
                              window.innerWidth -
                              (profileRef.current?.getBoundingClientRect()
                                .right ?? 0),
                          }}
                        >
                          <div className="custom-profile-box">
                            <div className="custom-profile-user">
                              <div className="custom-profile-id">
                                {studentNum}
                              </div>
                              <div className="custom-profile-name">
                                {name}님
                              </div>
                              <div className="custom-profile-penalty">
                                현재 연체 횟수 : 0번
                              </div>
                            </div>
                          </div>
                        </div>,
                        document.body,
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
