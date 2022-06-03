export const NEW_FLASH_MESSAGE = 'NEW_FLASH_MESSAGE';
export const CLEAR_FLASH_MESSAGE = 'CLEAR_FLASH_MESSAGE';

export type FlashNotificationType =
  | 'none'
  | 'default'
  | 'info'
  | 'success'
  | 'danger'
  | 'warning';

export interface FlashNotificationContent {
  text: string;
  type: FlashNotificationType;
}

export interface NotificationState {
  flashMessage: FlashNotificationContent;
}
