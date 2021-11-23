import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {
  LOGIN_SCREEN,
  WELCOME_SCREEN,
  ALERT_COMPONENT,
  FEED_SCREEN,
  FEED_DETAILS_SCREEN,
  CLASSROOM_SCREEN,
  PROFILE_MODAL,
  MODAL_DISMISS_COMPONENT,
  ACCOUNT_INFORMATION_MODAL,
  CHANGE_PASSWORD_MODAL,
} from './Screens';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import {NativeBaseProvider} from 'native-base';
import {extendedTheme} from '../theme/theme.config';
import {
  AccountInformationModal,
  ChangePasswordModal,
  ClassroomScreen,
  FeedDetailsScreen,
  FeedScreen,
  LoginScreen,
  ProfileModal,
} from '../screens';
import {FlashAlert, ModalDismiss} from '../components';
import {store} from '../redux';

function WrapperComponent(Component: any): any {
  return function inject(props: any) {
    const EnhancedComponent = () => {
      return (
        <Provider store={store}>
          <NativeBaseProvider theme={extendedTheme}>
            <Component {...props} />
          </NativeBaseProvider>
        </Provider>
      );
    };

    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(WELCOME_SCREEN, () =>
    WrapperComponent(WelcomeScreen),
  );

  Navigation.registerComponent(LOGIN_SCREEN, () =>
    WrapperComponent(LoginScreen),
  );

  Navigation.registerComponent(FEED_SCREEN, () => WrapperComponent(FeedScreen));
  Navigation.registerComponent(FEED_DETAILS_SCREEN, () =>
    WrapperComponent(FeedDetailsScreen),
  );

  Navigation.registerComponent(CLASSROOM_SCREEN, () =>
    WrapperComponent(ClassroomScreen),
  );

  Navigation.registerComponent(PROFILE_MODAL, () =>
    WrapperComponent(ProfileModal),
  );

  Navigation.registerComponent(ACCOUNT_INFORMATION_MODAL, () =>
    WrapperComponent(AccountInformationModal),
  );

  Navigation.registerComponent(CHANGE_PASSWORD_MODAL, () =>
    WrapperComponent(ChangePasswordModal),
  );

  Navigation.registerComponent(ALERT_COMPONENT, () =>
    WrapperComponent(FlashAlert),
  );

  Navigation.registerComponent(MODAL_DISMISS_COMPONENT, () =>
    WrapperComponent(ModalDismiss),
  );
}
