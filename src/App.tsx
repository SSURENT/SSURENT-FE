import React from 'react';
import './shared/styles/App.css';
import Header from "./shared/components/Header/Header";
import BottomBar from "./shared/components/BottomBar/BottomBar";
import { Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import Rent from "./features/rent/pages/Rent";
import Return from "./features/return/pages/Return";
import MyPage from "./features/mypage/pages/MyPage";
import Login from "./features/auth/pages/Login";
import ChangePW from "./features/auth/pages/ChangePW";

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: 0, width: '100%', boxSizing: 'border-box' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/return" element={<Return />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/changePW" element={<ChangePW />} />
                </Routes>
            </main>
            <BottomBar />
        </div>
    );
}
export default App;