import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './shared/components/Header/Header';
import BottomBar from './shared/components/BottomBar/BottomBar';

import Home from './features/home/pages/Home';
import Rent from './features/rent/pages/Rent';
import Return from './features/return/pages/Return';
import MyPage from './features/mypage/pages/MyPage';
import Login from './features/auth/pages/Login';
import ChangePW from './features/auth/pages/ChangePW';
import Penalty from './features/mypage/pages/Penalty';

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/return" element={<Return />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changePW" element={<ChangePW />} />
          <Route path="/penalty" element={<Penalty />} />
        </Routes>
      </main>

      <BottomBar />
    </div>
  );
};

export default App;
