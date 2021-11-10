import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {LOGIN_SCREEN, WELCOME_SCREEN} from './Screens';
import {store} from '../redux';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import {NativeBaseProvider} from 'native-base';
import {extendedTheme} from '../theme/theme.config';
import {LoginScreen} from '../screens';

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
}
