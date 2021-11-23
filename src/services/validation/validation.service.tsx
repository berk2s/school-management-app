import {
  EMAIL_VALIDATION_URL,
  PHONE_NUMBER_VALIDATION_URL,
  USERNAME_VALIDATION_URL,
} from '@env';
import {ValidationResponse} from '.';
import {apiService} from '..';

export const validationService = {
  isUsernameTaken,
  isPhoneNumberTaken,
  isEmailTaken,
};

async function isUsernameTaken(username: string): Promise<Boolean> {
  const url = USERNAME_VALIDATION_URL;
  const validationResponse: ValidationResponse = await apiService.get(
    `${url}/${username}`,
  );

  return validationResponse.isTaken;
}

async function isPhoneNumberTaken(phoneNumber: string): Promise<Boolean> {
  const url = PHONE_NUMBER_VALIDATION_URL;
  const validationResponse: ValidationResponse = await apiService.get(
    `${url}/${phoneNumber}`,
  );

  return validationResponse.isTaken;
}

async function isEmailTaken(email: string): Promise<Boolean> {
  const url = EMAIL_VALIDATION_URL;
  const validationResponse: ValidationResponse = await apiService.get(
    `${url}/${email}`,
  );

  return validationResponse.isTaken;
}
