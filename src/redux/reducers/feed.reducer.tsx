import {FeedState, SAVE_FEEDS, SAVE_PAGINATION} from '../types';

const initialState: FeedState = {
  announcements: [],
  pagination: {
    length: 0,
    size: 0,
    page: 0,
    sortedBy: '',
    order: 'desc',
  },
};

export function feedReducer(state: FeedState = initialState, action: any) {
  switch (action.type) {
    case SAVE_FEEDS:
      return {
        ...state,
        announcements: action.payload,
      };
    case SAVE_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    default:
      return state;
  }
}
