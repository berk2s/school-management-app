import {ActionScopes} from './scope.types';
import {
  LOGIN_URL,
  TOKEN_URL,
  ANNOUNCEMENT_URL,
  VIEW_ANNOUNCEMENTS,
  USERINFO_URL,
  PROFILE_MANAGE,
  USER_URL,
  METADATA_URL,
  USERNAME_VALIDATION_URL,
  PHONE_NUMBER_VALIDATION_URL,
  EMAIL_VALIDATION_URL,
  CHANGE_PASSWORD_URL,
} from '@env';

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
    parentUrl: METADATA_URL,
    childs: [],
    isExcluded: true,
  },
  {
    parentUrl: USERINFO_URL,
    childs: [
      {
        method: 'GET',
        url: '',
        scopes: [PROFILE_MANAGE],
      },
    ],
    isExcluded: false,
  },
  {
    parentUrl: USER_URL,
    childs: [
      {
        method: 'PUT',
        url: '',
        scopes: [PROFILE_MANAGE],
      },
    ],
    isExcluded: false,
  },
  {
    parentUrl: USERNAME_VALIDATION_URL,
    childs: [
      {
        method: 'GET',
        url: '/{:field}',
        scopes: [PROFILE_MANAGE],
      },
    ],
    isExcluded: false,
  },
  {
    parentUrl: PHONE_NUMBER_VALIDATION_URL,
    childs: [
      {
        method: 'GET',
        url: '/{:field}',
        scopes: [PROFILE_MANAGE],
      },
    ],
    isExcluded: false,
  },
  {
    parentUrl: EMAIL_VALIDATION_URL,
    childs: [
      {
        method: 'GET',
        url: '/{:field}',
        scopes: [PROFILE_MANAGE],
      },
    ],
    isExcluded: false,
  },
  {
    parentUrl: CHANGE_PASSWORD_URL,
    childs: [
      {
        method: 'GET',
        url: '',
        scopes: [PROFILE_MANAGE],
      },
    ],
    isExcluded: false,
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
