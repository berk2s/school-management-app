import { Navigation } from 'react-native-navigation';
import { initNavigation } from './src/navigation/Navigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['NativeBase: The contrast ratio']); //Hide warnings

Navigation.events().registerAppLaunchedListener(() => {
    initNavigation();
});