export interface UpdatingUserProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ChangingPassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
