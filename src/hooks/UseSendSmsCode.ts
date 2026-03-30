import { useState } from 'react';
import { postSmsCode } from '../api/endpoints/SendSmsCode';
import { useUserInfo } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

export const useSendSmsCode = () => {
  const navigate = useNavigate();
  const [isSendSmsCodeLoading, setIsSendSmsCodeLoading] = useState(false);
  const [isSendSmsCodePWError, setIsSendSmsCodePWError] = useState(false);
  const setPhoneNum = useUserInfo((state) => state.setPhoneNum);

  const handleSendSmsCode = async (
    inputStudentNum: string,
    inputPhoneNum: string,
  ) => {
    if (!inputPhoneNum) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    try {
      setIsSendSmsCodeLoading(true);
      await postSmsCode({
        studentNum: inputStudentNum,
        phoneNum: inputPhoneNum,
      });
      navigate('/verify-code');
    } catch (error) {
      setIsSendSmsCodePWError(true);
      alert('비밀번호 변경 요청에 실패했습니다.');
    } finally {
      setIsSendSmsCodeLoading(false);
    }
    setPhoneNum(inputPhoneNum);
  };

  return {
    handleSendSmsCode,
    isSendSmsCodeLoading,
    isSendSmsCodePWError,
  };
};
