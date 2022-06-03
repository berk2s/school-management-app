import {USERINFO_URL} from '@env';
import {apiService} from '..';
import {UserInfo} from '../../redux/types';

export const authService = {
  getUserInfo,
};

async function getUserInfo() {
  const userInfo: UserInfo = await apiService.get(USERINFO_URL);

  return userInfo;
}
