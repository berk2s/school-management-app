import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {
  LOGIN_SCREEN,
  WELCOME_SCREEN,
  ALERT_COMPONENT,
  FEED_SCREEN,
} from './Screens';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import {NativeBaseProvider} from 'native-base';
import {extendedTheme} from '../theme/theme.config';
import {FeedScreen, LoginScreen} from '../screens';
import {FlashAlert} from '../components';
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

  Navigation.registerComponent(ALERT_COMPONENT, () =>
    WrapperComponent(FlashAlert),
  );
}
