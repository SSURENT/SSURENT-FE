import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './shared/components/Header/Header';
import AdminHeader from './shared/components/Header/AdminHeader';
import BottomBar from './shared/components/BottomBar/BottomBar';
import AdminLayout from './shared/components/Layout/AdminLayout';
import { useAuthStore } from './features/auth/store/useAuthStore';
import Home from './features/home/pages/Home';
import Rent from './features/rent/pages/Rent';
import Return from './features/return/pages/Return';
import MyPage from './features/mypage/pages/MyPage';
import Login from './features/auth/pages/Login';
import SendSmsCode from './features/auth/pages/SendSmsCode.tsx';
import VerifyCode from './features/auth/pages/VerifySmsCode.tsx';
import ResetPW from './features/auth/pages/ResetPW.tsx';

import Penalty from './features/mypage/pages/Penalty';
import AdminItems from './features/admin/pages/AdminItems';
import AdminMembers from './features/admin/pages/AdminMembers';
import AdminMemberDetail from './features/admin/pages/AdminMemberDetail';
import AdminPenaltyEdit from './features/admin/pages/AdminPenaltyEdit';
import AdminRentalEdit from './features/admin/pages/AdminRentalEdit';
import { useAutoRefreshToken } from './hooks/UseAutoRefreshToken.ts';
import { useUserInfo } from './store/userStore';
import AdminStatistics from '../src/features/admin/pages/AdminStatistics.tsx';

/** * 💡 핵심 수정 사항: MemberProvider 임포트
 * 폴더 구조상 features/admin/context 안에 있다면 아래 경로가 맞을 겁니다.
 */
import { MemberProvider } from './features/admin/context/MemberContext';
import AdminInspect from './features/admin/pages/AdminInspect.tsx';

const useAuth = () => {
  const accessToken = useUserInfo((state) => state.accessToken);
  const role = useUserInfo((state) => state.role);
  return {
    isAuthenticated: !!accessToken,
    isAdmin: role === 'ADMIN',
  };
};

// ============================================================
// 권한 보호 컴포넌트
// ============================================================
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requireAdmin && !isAdmin) {
    alert('관리자 권한이 없습니다.');
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// ============================================================
// 유저 레이아웃 (공통 헤더/푸터)
// ============================================================
const UserLayout: React.FC = () => {
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === 'admin' || role === 'super_admin';

  return (
    <div className="flex min-h-screen flex-col">
      {isAdmin ? <AdminHeader /> : <Header />}
      <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="rent" element={<Rent />} />
          <Route path="return" element={<Return />} />
          <Route
            path="mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="penalty" element={<Penalty />} />
          <Route path="login" element={<Login />} />
          <Route path="send-sms-code" element={<SendSmsCode />} />
          <Route path="verify-code" element={<VerifyCode />} />
          <Route path="reset-pw" element={<ResetPW />} />
        </Routes>
      </main>
      <BottomBar />
    </div>
  );
};

// ============================================================
// 메인 App 컴포넌트
// ============================================================
const App: React.FC = () => {
  useAutoRefreshToken();

  return (
    <Routes>
      {/* 유저 서비스 경로 */}
      <Route path="/*" element={<UserLayout />} />

      {/* 관리자 서비스 경로 (MemberProvider로 감싸기) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            {/* 💡 여기서 MemberProvider를 감싸줘야 하위 Admin 페이지들이 에러가 안 납니다! */}
            <MemberProvider>
              <AdminLayout />
            </MemberProvider>
          </ProtectedRoute>
        }
      >
        {/* <Route index element={<Navigate to="items" replace />} /> */}
        <Route index element={<Navigate to="/" replace />} />
        <Route path="items" element={<AdminItems />} />
        <Route path="users" element={<AdminMembers />} />
        <Route path="users/:id" element={<AdminMemberDetail />} />
        <Route path="users/:id/penalty" element={<AdminPenaltyEdit />} />
        <Route path="stats" element={<AdminStatistics />} />
        <Route path="users/:id/rental-edit" element={<AdminRentalEdit />} />
        <Route path="inspect" element={<AdminInspect />} />
      </Route>
    </Routes>
  );
};

export default App;
