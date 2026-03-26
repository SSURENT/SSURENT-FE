import { postVerifyCode } from '../api/endpoints/VerifySmsCode';
import { useUserInfo } from '../store/userStore';

export const useSubmitVerifyCode = () => {
  const phoneNum: string = useUserInfo((state) => state.phoneNum);
  const handleSubmitVerifyCode = async (inputVerifyCode: string) => {
    // NOTE: 나중에 inputVerifyCode 형식 검사 로직 짤 듯?
    if (!inputVerifyCode) {
      alert('인증코드를 입력해주세요.');
      return;
    }
    try {
      const res = await postVerifyCode({
        phoneNum: phoneNum,
        code: inputVerifyCode,
      });
      alert(`UseSubmitVerifyCode.ts_resetToken: ${res.resetToken}`);
      // TODO: 스웨거에 에러코드 뜨면 에러처리하기
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    handleSubmitVerifyCode,
  };
};
