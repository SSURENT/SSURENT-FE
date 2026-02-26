import axios, { all } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../store/userStore';
// #1 로그인 API
export const requestLogin = async (
  studentNum: string,
  password: string,
  setUserId: (studentNum: string) => void,
) => {
  const res = await axios.post('http://168.107.50.60:8080/v1/api/auth/login', {
    // const res = await axios.post('/api/auth/login', {
    studentNum: studentNum,
    password: password,
  });
  return res;
};

// #2 비밀번호 변경 요청 API
export const patchChanePwRequset = async () => {
  try {
    const res = await axios.patch('/auth/sms', {});
    return res;
  } catch (error) {
    alert('비밀번호 변경 요청에 실패했습니다.');
  }
};

// #3 사용자가 인증번호 전송 API
export const postVerifyCode = async (verifyCode: string) => {
  try {
    const res = await axios.post('/auth/num', {
      // NOTE: 나중에 키값 변경
      verify_code: verifyCode,
    });
    return res;
  } catch (error) {
    alert('인증번호 전송에 실패했습니다.');
  }
};

// #4 변경된 비밀번호 전송 API
export const patchChangePW = async (changedPw: string) => {
  try {
    const res = await axios.patch('/auth/pw', {
      password: changedPw,
    });
    return res;
  } catch (error) {
    alert('변경된 비밀번호 전송에 실패했습니다.');
  }
};

// #5 로그아웃 API
export const postLogout = async () => {
  try {
    const res = await axios.post('/auth/logout', {});
    return res;
  } catch (error) {
    alert('로그아웃에 실패했습니다.');
  }
};

// #6 사용자 정보 불러오기 API
export const getUserInfo = async () => {
  try {
    const res = await axios.get('/api/users', {});
    return res.data.data;
    return res;
  } catch (error) {
    alert('사용자의 정보를 불러오는데에 실패했습니다.');
  }
};

// #7 징계내역 불러오기 API
export const getPenaltyHistory = async () => {
  try {
    const res = await axios.get('/api/users/penalties', {});
    return res.data.data;
    return res;
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
    return res;
  } catch (error) {
    alert('전화번호 변경에 실패했습니다.');
  }
};
