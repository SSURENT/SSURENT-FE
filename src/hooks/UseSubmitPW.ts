import { useState } from 'react';
import { patchChangePW } from '../api/endpoints/PasswordChange';

export const useSubmitPW = () => {
  const [isSubmitPWLoading, setIsSubmitPWLoading] = useState(false);
  const [isSubmitPWError, setIsSubmitPWError] = useState(false);

  const handleSubmitPW = async (inputPassword: string) => {
    const resetToken: string = sessionStorage.getItem('resetToken') ?? '';
    if (!inputPassword) {
      alert('새로운 비밀번호를 입력해주세요.');
      return;
    }
    if (!resetToken) {
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      return;
    }

    try {
      setIsSubmitPWLoading(true);
      await patchChangePW({ resetToken, newPassword: inputPassword });
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
