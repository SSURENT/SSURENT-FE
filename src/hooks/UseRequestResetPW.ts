import { useState } from 'react';
import { patchChangePwRequest } from '../api/endpoints/PasswordChangeRequest';
import { useUserInfo } from '../store/userStore';

export const useRequestResetPW = () => {
  const studentNum = useUserInfo((state) => state.studentNum);
  const [isRequestResetPWLoading, setIsRequestResetPWLoading] = useState(false);
  const [isRequestResetPWError, setIsRequestResetPWError] = useState(false);
  const setPhoneNum = useUserInfo((state) => state.setPhoneNum);

  const handleRequestResetPW = async (inputPhoneNum: string) => {
    if (!inputPhoneNum) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    try {
      setIsRequestResetPWLoading(true);
      const res = await patchChangePwRequest({ studentNum, inputPhoneNum });
      if (res.code === 'AUTH_200') alert(res.message);
    } catch (error) {
      setIsRequestResetPWError(true);
      alert('비밀번호 변경 요청에 실패했습니다.');
    } finally {
      setIsRequestResetPWLoading(false);
    }
    setPhoneNum(inputPhoneNum);
  };

  return {
    handleRequestResetPW,
    isRequestResetPWLoading,
    isRequestResetPWError,
  };
};
