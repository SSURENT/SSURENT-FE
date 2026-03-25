import { useState } from 'react';
import { patchChangePW } from '../api/endpoints/PasswordChange';

export const useSubmitPW = () => {
  const [isSubmitPWLoading, setIsSubmitPWLoading] = useState(false);
  const [isSubmitPWError, setIsSubmitPWError] = useState(false);

  const handleSubmitPW = async (inputPassword: string) => {
    const refreshToken: string = sessionStorage.getItem('refreshToken') ?? '';
    if (!inputPassword) {
      alert('새로운 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitPWLoading(true);
      await patchChangePW({ refreshToken, newPassword: inputPassword });
    } catch (error) {
      setIsSubmitPWError(true);
      alert('비밀번호 변경에 실패했습니다.');
    } finally {
      setIsSubmitPWLoading(false);
    }
  };

  return {
    handleSubmitPW,
    isSubmitPWLoading,
    isSubmitPWError,
  };
};
