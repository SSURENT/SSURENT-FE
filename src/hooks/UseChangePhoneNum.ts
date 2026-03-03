import { useState } from 'react';
import { patchPhoneNum } from '../api/endpoints/PhoneNumChange';

export const useChangePhoneNum = (setPhoneNum: (num: string) => void) => {
  const [newPhoneNum, setNewPhoneNum] = useState('');
  const [phoneError, setPhoneError] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhoneChange = (value: string) => {
    setNewPhoneNum(value);

    const phoneRegex = /^010-\d{4}-\d{4}$/;

    if (value === '') {
      setPhoneError(true);
    } else {
      setPhoneError(!phoneRegex.test(value));
    }
  };

  const changePhoneNum = async () => {
    if (phoneError) return;

    try {
      await patchPhoneNum({ phoneNum: newPhoneNum });

      setPhoneNum(newPhoneNum);
      const storedUser = sessionStorage.getItem('user');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        const updatedUser = {
          ...parsedUser,
          phoneNum: newPhoneNum,
        };

        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
      alert('전화번호가 성공적으로 변경되었습니다.');

      setIsModalOpen(false);
      setNewPhoneNum('');
    } catch (error) {
      console.log(error);
      alert('전화번호 변경에 실패했습니다.');
    }
  };

  return {
    newPhoneNum,
    phoneError,
    isModalOpen,
    setIsModalOpen,
    handlePhoneChange,
    changePhoneNum,
  };
};
