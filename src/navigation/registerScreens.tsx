import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {WELCOME_SCREEN} from './Screens';
import {store} from '../redux';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import {NativeBaseProvider} from 'native-base';
import {extendedTheme} from '../theme/theme.config';

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
}
