import React from 'react';
import "./Home.css"
import {Link} from "react-router-dom";
import {PersonFill} from "react-bootstrap-icons";
import {Building} from "react-bootstrap-icons";
import {Alarm} from "react-bootstrap-icons";
import CardCarousel from "../components/carousel/carousel";

function Home() {
    return (
        <main className="main-content">
            <h1>학교에서 급하게 필요한</h1>
            <h1>물품이 있다면?</h1>
            <h2>지금 바로 SSURENT에서!</h2>
            <div className="button-container">
                <Link to="/rent">
                    <button type="button" className="btn btn-primary">물품대여 바로가기</button>
                </Link>
                <Link to="/return">
                    <button type="button" className="btn btn-primary">물품반납 바로가기</button>
                </Link>
            </div>
            <div className="middle-describes">
                <h2 >대여사업이 뭔가요</h2>
                <h4>
                    컴퓨터학부 학우분들의 보다 나은 생활을 위해<br/>
                    컴퓨터학부의 학생회비 납부자를 대상으로<br/>
                    물품 대여 사업을 진행하고 있습니다
                </h4>
            </div>
            <div className="info-cards-container">
                <div className="info-card">
                    <PersonFill className="info-icon" color="#000000" />
                    <br/>
                    <br/>
                    <h3>이용 대상</h3>
                    <p>컴퓨터학부 학생회비 납부자</p>
                </div>
                <div className="info-card">
                    <Building className="info-icon" color="#000000" />
                    <br/>
                    <br/>
                    <h3>대여 장소</h3>
                    <p>정보과학관 B1층 컴퓨터학부 학생회실</p>
                </div>
                <div className="info-card">
                    <Alarm className="info-icon" color="#000000" />
                    <br/>
                    <br/>
                    <h3>이용 시간</h3>
                    <p>평일 10:00 ~ 16:00</p>
                </div>
            </div>
            <div className= "bottom-info">
                <h3>학교생활 중 필요한 물건</h3>
                <h1>대부분 여기 다 있을걸요?</h1>
            </div>
            <section className="carousel-section">
                <CardCarousel />
            </section>
            <div className="return-info-section">
                <div className="return-info-content">
                    <h3 className="right">대여한 물건</h3>
                    <h3 className="right"><span className="highlight">언제까지 반납해야</span> 해요?</h3>
                    <br/>
                    <br/>
                    <h3 className="left">당일로부터 <span style={{ color: '#AA0000', fontWeight: 'bold' }}>3일 이내</span>에</h3>
                    <h3 className="left">반납하면 됩니다</h3>
                    <h4>주말 및 공유일이 포함된 경우 해당 날짜들을 제외한 3일입니다.</h4>
                    <br/>
                    <h4>기간을 넘길 시 경고 1회가 누적되며</h4>
                    <h4><span style={{ color: '#AA0000', fontWeight: 'bold' }}>경고 3회 누적 시 이용이 제한될 수 있습니다.</span></h4>
                </div>
            </div>
            <div className="bottom-ask">
                <h4 style={{ color: '#3278F9', fontWeight: 'bold' }}>더 궁금하거나 요청사항이 있으신가요?</h4>
                <div className="d-flex justify-content-between align-items-center">
                    <h2>대여사업 관리자에게 직접 문의해보세요</h2>
                    <Link to="/" className="contact-link">
                        문의하러가기
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default Home;