import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/endpoints/UserInfo';
import { useUserInfo } from '../store/userStore';

export const useGetUserInfo = () => {
  const setUserInfo = useUserInfo((state) => state.setUserInfo);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
  const [isUserInfoError, setIsUserInfoError] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo();
      console.log(`--UseGetUserInfo--`);
      console.log(`res: ${res.name}`);
      setUserInfo(res.studentNum, res.name, res.role, res.status, res.phoneNum);
    } catch (error) {
      setIsUserInfoError(true);
    } finally {
      setIsUserInfoLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return {
    isUserInfoLoading,
    isUserInfoError,
  };
};
