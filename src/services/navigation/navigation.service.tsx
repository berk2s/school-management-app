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
  showModal,
  dismissModal,
  dismissAllModals,
};

const initialOptions = {
  topBar: {
    visible: false,
  },
};

function navigate(
  componentId: string,
  route: Screens,
  passProps: any = {},
  options: Options = initialOptions,
): void {
  Navigation.push(componentId, {
    component: {
      id: route,
      name: route,
      passProps: passProps,
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
      title: {},
      backButton: {
        visible: true,
      },
    },
    statusBar: {
      style: 'dark',
    },
    bottomTabs: {
      //  visible: false,
    },
  });
}

function dismissOverlay(componentId: string) {
  Navigation.dismissOverlay(componentId);
}

function showModal(modalName: string, options: Options = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: modalName,
            name: modalName,
            options: options,
          },
        },
      ],
    },
  });
}

function dismissModal(componentId: string) {
  Navigation.dismissModal(componentId);
}

function dismissAllModals() {
  Navigation.dismissAllModals();
}
