import { Navigation } from 'react-native-navigation';
import { initNavigation } from './src/navigation/Navigation';

Navigation.events().registerAppLaunchedListener(() => {
    initNavigation();
});