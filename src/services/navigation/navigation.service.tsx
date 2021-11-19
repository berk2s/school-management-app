import {Navigation, Options} from 'react-native-navigation';
import {Screens} from '../../navigation/Screens';
import {authenticatedRoot, unAuthenticatedRoot} from './navigation.data';

export const navigationService = {
  navigate,
  goBack,
  showOverlay,
  dismissOverlay,
  setRoot,
  prepareOptions,
};

const initialOptions = {
  topBar: {
    visible: false,
  },
};

function navigate(
  componentId: string,
  route: Screens,
  options: Options = initialOptions,
): void {
  Navigation.push(componentId, {
    component: {
      id: route,
      name: route,
      options: options,
    },
  });
}

function goBack(componentId: string) {
  Navigation.pop(componentId);
}

function showOverlay(name: string) {
  return Navigation.showOverlay({
    component: {
      id: name,
      name: name,
      options: {
        overlay: {
          interceptTouchOutside: false,
        },
        layout: {
          componentBackgroundColor: 'transparent',
          orientation: ['portrait'],
        },
      },
    },
  });
}

function setRoot(isLoggedIn: boolean) {
  Navigation.setRoot(isLoggedIn ? authenticatedRoot : unAuthenticatedRoot);
}

function prepareOptions(): void {
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
}

function dismissOverlay(componentId: string) {
  Navigation.dismissOverlay(componentId);
}
