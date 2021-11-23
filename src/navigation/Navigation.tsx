import registerScreens from './registerScreens';
import {store} from '../redux';
import {navigationService} from '../services';
import {refreshTokens} from '../redux/actions';
import {fetchMetadatas} from '../redux/actions/metadata.action';

registerScreens();

export function initNavigation() {
  navigationService.prepareOptions();

  store.dispatch(fetchMetadatas());
  store.dispatch(refreshTokens());

  let oldValue = store.getState().auth.isLoggedIn;
  let counter = 1;

  store.subscribe(() => {
    const {
      auth: {isLoggedIn: isLoggedIn},
    } = store.getState();

    if (oldValue !== isLoggedIn) {
      navigationService.setRoot(isLoggedIn);
      oldValue = isLoggedIn;
    } else if (counter === 1) {
      navigationService.setRoot(isLoggedIn);
    }

    counter++;
  });
}
