import axios, { all } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../store/userStore';
// #1 로그인 API
export const requestLogin = async (
  studentNum: string,
  password: string,
  setUserId: (studentNum: string) => void,
) => {
  const navigate = useNavigate();
  if (!studentNum || !password) {
    alert('학번과 비밀번호를 모두 입력해주세요.');
    return;
  }

  try {
    // NOTE: 얘는 테스트용 엔드포인트 코드
    const res = await axios.post('http://168.107.50.60:8080/api/auth/login', {
      // const res = await axios.post('/auth/login', {
      studentNum: studentNum,
      password: password,
    });

    if (res.data.code === '200') {
      alert('로그인 성공!');
      setUserId(studentNum);
      // NOTE: 홈으로 가는 위치를 모르겠어서 일단 '/'로 함
      navigate('/');
      const token = res.data.accessToken;
      localStorage.setItem('token', token);
    } else if (res.data.code === '401') {
      alert('로그인에 실패했습니다.');
    } else if (res.data.code === '403') {
      alert('이미 탈퇴한 사용자입니다.');
    }
  } catch (error) {
    alert('로그인에 실패했습니다. 학번이나 비밀번호를 확인해주세요.');
  }
};

// #2 비밀번호 변경 요청 API
export const patchChanePwRequset = async () => {
  try {
    const res = await axios.patch('/auth/sms', {});
  } catch (error) {
    alert('비밀번호 변경 요청에 실패했습니다.');
  }
};

// #3 인증번호 입력 API
export const postVerifyCode = async (verifyCode: string) => {
  try {
    const res = await axios.post('/auth/num', {
      // NOTE: 나중에 키값 변경
      verify_code: verifyCode,
    });
  } catch (error) {
    alert('인증번호 전송에 실패했습니다.');
  }
};

// #4 비밀번호 변경 API
export const patchChangePW = async (changedPw: string) => {
  try {
    const res = await axios.patch('/auth/pw', {
      password: changedPw,
    });
  } catch (error) {
    alert('변경된 비밀번호 전송에 실패했습니다.');
  }
};

// #5 로그아웃 API
export const postLogout = async () => {
  try {
    const res = await axios.post('/auth/logout', {});
  } catch (error) {
    alert('로그아웃에 실패했습니다.');
  }
};

// #6 사용자 정보 불러오기 API
export const getUserInfo = async () => {
  try {
    const res = await axios.get('/api/users', {});
    return res.data.data;
  } catch (error) {
    alert('사용자의 정보를 불러오는데에 실패했습니다.');
  }
};

// #7 징계내역 불러오기 API
export const getPenaltyHistory = async () => {
  try {
    const res = await axios.get('/api/users/penalties', {});
    return res.data.data;
  } catch (error) {
    alert('징계내역 불러오기에 실패했습니다');
  }
};

// #8 전화번호 변경 API
export const patchPhoneNum = async (changedPhoneNum: string) => {
  try {
    const res = await axios.patch('/api/users/phone-number', {
      phoneNum: changedPhoneNum,
    });
  } catch (error) {
    alert('전화번호 변경에 실패했습니다.');
  }
};
