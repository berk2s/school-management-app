import {FETCH_FEEDS} from '../../redux/types';
import {ActionScopes} from './scope.types';
import {LOGIN_URL, TOKEN_URL, ANNOUNCEMENT_URL, VIEW_ANNOUNCEMENTS} from '@env';

export const scopesData: ActionScopes[] = [
  {
    parentUrl: LOGIN_URL,
    childs: [],
    isExcluded: true,
  },
  {
    parentUrl: TOKEN_URL,
    childs: [],
    isExcluded: true,
  },
  {
    parentUrl: ANNOUNCEMENT_URL,
    childs: [
      {
        method: 'GET',
        url: '/organization/{:field}',
        scopes: [VIEW_ANNOUNCEMENTS],
      },
    ],
    isExcluded: false,
  },
];
