import { postVerifyCode } from '../api/endpoints/VerifyCode';

export const useSubmitVerifyCode = () => {
  const handleSubmitVerifyCode = async (inputVerifyCode: string) => {
    // NOTE: 나중에 inputVerifyCode 형식 검사 로직 짤 듯?
    if (!inputVerifyCode) {
      alert('인증코드를 입력해주세요.');
      return;
    }
    try {
      const res = await postVerifyCode({ verifyCode: inputVerifyCode });
      if (res.code === 'AUTH_200') alert(res.message);
      // TODO: 스웨거에 에러코드 뜨면 에러처리하기
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleRequestVerifyCode = async () => {
    // TODO: 인증코드를 사용자한테 전송하는 api는 아직 sms회사?를 못 정해서 미정인 듯
  };

  return {
    handleSubmitVerifyCode,
    handleRequestVerifyCode,
  };
};
