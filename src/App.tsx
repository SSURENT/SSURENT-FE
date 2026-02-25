import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './shared/components/Header/Header';
import BottomBar from './shared/components/BottomBar/BottomBar';
import AdminLayout from './shared/components/Layout/AdminLayout';

import Home from './features/home/pages/Home';
import Rent from './features/rent/pages/Rent';
import Return from './features/return/pages/Return';
import MyPage from './features/mypage/pages/MyPage';
import Login from './features/auth/pages/Login';
import ChangePW from './features/auth/pages/ChangePW';
import AdminHome from './features/admin/pages/AdminHome';
import AdminItems from './features/admin/pages/AdminItems';
import AdminMembers from './features/admin/pages/AdminMembers';

// import AdminRoute from './shared/components/AdminRoute';

const App: React.FC = () => {
  return (
    <Routes>
      {/* 유저  */}
      <Route
        path="/"
        element={
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
              <Home />
            </main>
            <BottomBar />
          </div>
        }
      />

      <Route
        path="/rent"
        element={
          <>
            <Header />
            <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
              <Rent />
            </main>
            <BottomBar />
          </>
        }
      />
      <Route
        path="/return"
        element={
          <>
            <Header />
            <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
              <Return />
            </main>
            <BottomBar />
          </>
        }
      />
      <Route
        path="/mypage"
        element={
          <>
            <Header />
            <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
              <MyPage />
            </main>
            <BottomBar />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Header />
            <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
              <Login />
            </main>
            <BottomBar />
          </>
        }
      />
      <Route
        path="/changePW"
        element={
          <>
            <Header />
            <main className="main-content mx-auto w-full max-w-[1200px] flex-1 px-4">
              <ChangePW />
            </main>
            <BottomBar />
          </>
        }
      />

      {/* 관리자  */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="items" replace />} />
        <Route path="items" element={<AdminItems />} />
        <Route path="users" element={<AdminMembers />} />
        <Route path="stats" element={<div>통계 페이지 (준비 중)</div>} />
        <Route path="inspect" element={<div>물품 검수 페이지 (준비 중)</div>} />
      </Route>
    </Routes>
  );
};

export default App;
