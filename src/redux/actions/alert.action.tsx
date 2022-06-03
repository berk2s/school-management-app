import {alertService} from '../../services';
import {
  CLEAR_FLASH_MESSAGE,
  FlashNotificationContent,
  NEW_FLASH_MESSAGE,
} from '../types';

export function sendFlashNotification(content: FlashNotificationContent) {
  return (dispatch: any, getState: any) => {
    const {alert} = getState();

    if (alert.flashMessage.text.trim() != '') return;

    return alertService
      .createFlashMessage(content)
      .then(() => dispatch(createdFlashNotification(content)))
      .catch((error: any) => {
        console.log('Error while creating flash notification ', error);
      });
  };
}

export function createdFlashNotification(content: FlashNotificationContent) {
  return {
    type: NEW_FLASH_MESSAGE,
    payload: {
      text: content.text,
      type: content.type,
    },
  };
}

export function clearFlashMessage() {
  return {
    type: CLEAR_FLASH_MESSAGE,
  };
}
