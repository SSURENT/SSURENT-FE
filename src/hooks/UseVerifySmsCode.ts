import { useNavigate } from 'react-router-dom';
import { postVerifyCode } from '../api/endpoints/VerifySmsCode';
import { useUserInfo } from '../store/userStore';

export const useSubmitVerifyCode = () => {
  const navigate = useNavigate();
  const phoneNum: string = useUserInfo((state) => state.phoneNum);
  const handleSubmitVerifyCode = async (inputVerifyCode: string) => {
    if (!inputVerifyCode) {
      alert('인증코드를 입력해주세요.');
      return;
    }
    if (!/^\d{6}$/.test(inputVerifyCode)) {
      alert('인증코드 형식을 맞춰주세요.');
      return;
    }
    try {
      const res = await postVerifyCode({
        phoneNum: phoneNum,
        code: inputVerifyCode,
      });
      sessionStorage.setItem('resetToken', res.resetToken);
      navigate('/reset-pw');
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    handleSubmitVerifyCode,
  };
};
