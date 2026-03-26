import { useState } from 'react';
import { postSmsCode } from '../api/endpoints/SendSmsCode';
import { useUserInfo } from '../store/userStore';

export const useSendSmsCode = () => {
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
      const res = await postSmsCode({
        studentNum: inputStudentNum,
        phoneNum: inputPhoneNum,
      });
      alert(`UseRequestResetPW.ts_res: ${res}`);
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
