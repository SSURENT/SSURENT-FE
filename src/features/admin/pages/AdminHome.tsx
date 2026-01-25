import React from 'react';
import { Link } from 'react-router-dom';
import {
  BoxSeam,
  People,
  ClipboardCheck,
  BarChartLine,
  ExclamationCircle,
  ChevronRight,
} from 'react-bootstrap-icons';
import './Admin.css';

const AdminHome: React.FC = () => {
  const stats = [
    { title: '대여 중', count: 12, color: 'primary', icon: <BoxSeam /> },
    {
      title: '반납 대기',
      count: 5,
      color: 'warning',
      icon: <ClipboardCheck />,
    },
    {
      title: '연체 물품',
      count: 2,
      color: 'danger',
      icon: <ExclamationCircle />,
    },
    { title: '전체 회원', count: 156, color: 'success', icon: <People /> },
  ];

  const adminMenus = [
    {
      title: '물품 관리',
      link: '/admin/items',
      icon: <BoxSeam />,
      desc: '재고 수정 및 등록',
    },
    {
      title: '회원 관리',
      link: '/admin/users',
      icon: <People />,
      desc: '권한 및 이용 제한',
    },
    {
      title: '물품 검수',
      link: '/admin/inspect',
      icon: <ClipboardCheck />,
      desc: '반납 승인 대기 목록',
    },
    {
      title: '대여 통계',
      link: '/admin/stats',
      icon: <BarChartLine />,
      desc: '이용 로그 분석',
    },
  ];

  return (
    <div className="admin-dashboard py-4">
      <div className="row row-cols-2 row-cols-lg-4 g-3 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="col">
            <div className="card border-0 shadow-sm p-3 h-100">
              <div className="d-flex align-items-center">
                <div
                  className={`bg-${stat.color} bg-opacity-10 p-3 rounded-3 me-3 text-${stat.color} d-flex align-items-center justify-content-center`}
                  style={{ width: '48px', height: '48px' }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-muted small">{stat.title}</div>
                  <div className="fs-4 fw-bold">{stat.count}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 text-start">
        <div className="col-12 col-xl-8">
          <h5 className="fw-bold mb-3 text-start">주요 관리 기능</h5>
          <div className="row g-3">
            {adminMenus.map((menu, idx) => (
              <div key={idx} className="col-12 col-md-6">
                <Link to={menu.link} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm p-3 hover-bg-light transition-all">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="fs-3 me-3 text-secondary d-flex align-items-center">
                          {menu.icon}
                        </div>
                        <div className="text-start">
                          <div className="fw-bold text-dark">{menu.title}</div>
                          <div className="small text-muted">{menu.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="text-muted" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <h5 className="fw-bold mb-3 text-start">최근 활동</h5>
          <div className="card border-0 shadow-sm">
            <div className="list-group list-group-flush text-start">
              <div className="list-group-item py-3">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1 fw-bold text-danger">연체 발생</h6>
                  <small className="text-muted">3분 전</small>
                </div>
                <p className="mb-1 small">김철수 학우 - 보조배터리 외 1건</p>
              </div>
              <div className="list-group-item py-3">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1 fw-bold text-primary">신규 반납</h6>
                  <small className="text-muted">1시간 전</small>
                </div>
                <p className="mb-1 small">
                  이영희 학우 - 우산 반납 검수 대기 중
                </p>
              </div>
              <div className="list-group-item py-3 text-center">
                <Link to="/admin" className="small text-decoration-none">
                  전체 로그 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
