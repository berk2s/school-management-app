import {FEED_SCREEN, FEED_STACK, LOGIN_SCREEN, WELCOME_SCREEN} from './Screens';
import registerScreens from './registerScreens';
import {store} from '../redux';
import {navigationService} from '../services';
import {refreshTokens} from '../redux/actions';

registerScreens();

const unAuthenticatedRoot = {
  root: {
    stack: {
      children: [
        {
          component: {
            id: LOGIN_SCREEN,
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
        {
          component: {
            id: WELCOME_SCREEN,
            name: WELCOME_SCREEN,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  },
};

const authenticatedRoot = {
  root: {
    bottomTabs: {
      id: 'BOTTOM_TABS_LAYOUT',
      children: [
        {
          stack: {
            id: FEED_STACK,
            children: [
              {
                component: {
                  id: FEED_SCREEN,
                  name: FEED_SCREEN,
                  options: {
                    topBar: {
                      visible: false,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
};

export function initNavigation() {
  navigationService.prepareOptions();

  store.dispatch(refreshTokens());

  let oldValue = store.getState().auth.isLoggedIn;
  let counter = 1;

  store.subscribe(() => {
    const {
      auth: {isLoggedIn: isLoggedIn},
    } = store.getState();

    if (oldValue !== isLoggedIn) {
      navigationService.setRoot(isLoggedIn);
      oldValue = isLoggedIn;
    } else if (counter === 1) {
      navigationService.setRoot(isLoggedIn);
    }

    counter++;
  });
}
