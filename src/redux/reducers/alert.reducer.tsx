import {
  NEW_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  NotificationState,
} from '../types';

const initialState: NotificationState = {
  flashMessage: {
    text: '',
    type: 'none',
  },
};

export function alertReducer(
  state: NotificationState = initialState,
  action: any,
) {
  switch (action.type) {
    case NEW_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: {
          text: action.payload.text,
          type: action.payload.type,
        },
      };
    case CLEAR_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: {
          text: '',
          type: null,
        },
      };
    default:
      return state;
  }
}
