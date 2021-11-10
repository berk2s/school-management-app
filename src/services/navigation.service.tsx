import {Navigation, Options} from 'react-native-navigation';
import {Screens} from '../navigation/Screens';

export const navigationService = {
  navigate,
  goBack,
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
      name: route,
      options: options,
    },
  });
}

function goBack(componentId: string) {
  Navigation.pop(componentId);
}
