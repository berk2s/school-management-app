import {Navigation} from 'react-native-navigation';
import {LOGIN_SCREEN, WELCOME_SCREEN} from './Screens';
import registerScreens from './registerScreens';

registerScreens();

export function initNavigation() {
  Navigation.setDefaultOptions({
    topBar: {
      title: {
        color: 'white',
      },
      backButton: {
        title: '', // Remove previous screen name from back button
        color: 'white',
        visible: true,
      },
    },
    statusBar: {
      style: 'dark',
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
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
  });
}
