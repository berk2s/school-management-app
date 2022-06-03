import {showMessage} from 'react-native-flash-message';
import {navigationService} from '..';
import {ALERT_COMPONENT} from '../../navigation/Screens';
import {FlashNotificationContent} from '../../redux/types';

export const alertService = {
  createFlashMessage,
};

async function createFlashMessage(
  content: FlashNotificationContent,
): Promise<void> {
  navigationService.showOverlay(ALERT_COMPONENT).then(() => {
    showMessage({
      message: content.text,
      type: content.type,
    });
  });
}
