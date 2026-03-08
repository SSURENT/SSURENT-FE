import { useState } from 'react';
import { patchPhoneNum } from '../api/endpoints/PhoneNumChange';
import { useUserInfo } from '../store/userStore';

export const useSubmitPhoneNum = () => {
  const [isSubmitPhoneNumLoading, setIsSubmitPhoneNumLoading] = useState(false);
  const [isSubmitPhoneNumError, setIsSubmitPhoneNumError] = useState(false);

  const handleSubmitPhoneNum = async (phoneNum: string) => {
    try {
      const res = await patchPhoneNum({ phoneNum: phoneNum });
      const setPhoneNum = useUserInfo((state) => state.setPhoneNum);
      setPhoneNum(phoneNum);
    } catch (error) {
      setIsSubmitPhoneNumError(true);
    } finally {
      setIsSubmitPhoneNumLoading(false);
    }
  };

  return {
    handleSubmitPhoneNum,
    isSubmitPhoneNumLoading,
    isSubmitPhoneNumError,
  };
};
