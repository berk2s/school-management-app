import {
  LOGIN_SCREEN,
  WELCOME_SCREEN,
  FEED_STACK,
  FEED_SCREEN,
  FEED_DETAILS_SCREEN,
  CLASSROOM_STACK,
  CLASSROOM_SCREEN,
} from '../../navigation/Screens';

export const unAuthenticatedRoot = {
  root: {
    stack: {
      children: [
        {
          component: {
            id: LOGIN_SCREEN,
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
        {
          component: {
            id: WELCOME_SCREEN,
            name: WELCOME_SCREEN,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  },
};

export const authenticatedRoot = {
  root: {
    bottomTabs: {
      id: 'BOTTOM_TABS_LAYOUT',
      children: [
        {
          stack: {
            id: FEED_STACK,
            children: [
              {
                component: {
                  id: FEED_DETAILS_SCREEN,
                  name: FEED_DETAILS_SCREEN,
                  options: {
                    topBar: {
                      title: {
                        text: 'Detaylar',
                      },
                      largeTitle: {
                        visible: true,
                      },
                    },
                  },
                },
              },
              {
                component: {
                  id: FEED_SCREEN,
                  name: FEED_SCREEN,
                  options: {
                    topBar: {
                      title: {
                        text: 'Akış',
                      },
                      largeTitle: {
                        visible: true,
                      },
                      backButton: {
                        visible: false,
                      },
                    },
                  },
                },
              },
            ],

            options: {
              bottomTab: {
                text: 'Akış',
              },
            },
          },
        },
        {
          stack: {
            id: CLASSROOM_STACK,
            children: [
              {
                component: {
                  id: CLASSROOM_SCREEN,
                  name: CLASSROOM_SCREEN,
                  options: {
                    topBar: {
                      title: {
                        text: 'Sınıfım',
                      },
                      largeTitle: {
                        visible: true,
                      },
                      backButton: {
                        visible: false,
                      },
                    },
                  },
                },
              },
            ],
            options: {
              bottomTab: {
                text: 'Sınıfım',
              },
            },
          },
        },
      ],
    },
  },
};
