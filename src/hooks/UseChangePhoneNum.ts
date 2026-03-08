import { useState } from 'react';
export const useChangePhoneNum = () => {
  const [isPhoneNumFormatError, setIsPhoneNumFormatError] = useState(false);
  const [newPhoneNum, setNewPhoneNum] = useState<string>('');

  const handleChangePhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setNewPhoneNum(value);

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (value === '') {
      setIsPhoneNumFormatError(false);
    } else {
      setIsPhoneNumFormatError(!phoneRegex.test(value));
    }
  };
  return {
    handleChangePhoneNum,
    newPhoneNum,
    isPhoneNumFormatError,
  };
};
