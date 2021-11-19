export const WELCOME_SCREEN = 'app.WelcomeScreen';
export const LOGIN_SCREEN = 'app.LoginScreen';

// Feed Stack
export const FEED_STACK = 'app.FeedStack.FeedScreen';
export const FEED_SCREEN = 'app.FeedStack.FeedScreen';

export const ALERT_COMPONENT = 'app.components.Alert';

export type Screens =
  | typeof WELCOME_SCREEN
  | typeof LOGIN_SCREEN
  | typeof ALERT_COMPONENT
  | typeof FEED_SCREEN;
