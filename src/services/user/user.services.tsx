import {CHANGE_PASSWORD_URL, USER_URL} from '@env';
import {ChangingPassword} from '.';
import {apiService} from '..';
import {UpdatingUserProfile} from './user.types';

export const userService = {
  updateProfile,
  changePassword,
};

async function updateProfile(updatingProfile: UpdatingUserProfile) {
  const _updatingProfile = await apiService.authorizedPut(
    USER_URL,
    updatingProfile,
  );

  return _updatingProfile;
}

async function changePassword(changingPassword: ChangingPassword) {
  const _changePassword = await apiService.authorizedPut(
    CHANGE_PASSWORD_URL,
    changingPassword,
  );

  return _changePassword;
}
