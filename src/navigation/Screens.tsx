export const WELCOME_SCREEN = 'app.WelcomeScreen';
export const LOGIN_SCREEN = 'app.LoginScreen';

// Feed Stack
export const FEED_STACK = 'app.FeedStack';
export const FEED_SCREEN = 'app.FeedStack.FeedScreen';
export const FEED_DETAILS_SCREEN = 'app.FeedStack.FeedDetailsScreen';

export const CLASSROOM_STACK = 'app.ClassroomStack';
export const CLASSROOM_SCREEN = 'app.ClassroomStack.ClassroomScreen';

// Profile Modal
export const PROFILE_MODAL = 'app.ProfileModal';
export const ACCOUNT_INFORMATION_MODAL =
  'app.ProfileModal.AccountInformationModal';
export const CHANGE_PASSWORD_MODAL = 'app.ProfileModal.ChangePasswordModal';

export const MODAL_DISMISS_COMPONENT = 'app.components.ModalDismiss';

export const ALERT_COMPONENT = 'app.components.Alert';

export type Screens =
  | typeof WELCOME_SCREEN
  | typeof LOGIN_SCREEN
  | typeof ALERT_COMPONENT
  | typeof FEED_SCREEN
  | typeof FEED_DETAILS_SCREEN
  | typeof CLASSROOM_SCREEN;
