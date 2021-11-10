import {extendTheme, themeTools} from 'native-base';

export const extendedTheme = extendTheme({
  colors: {
    primary: {
      50: '#e3f3ff',
      100: '#bdd9f4',
      200: '#98bde8',
      300: '#6fa3db',
      400: '#4889d0',
      500: '#2f6fb7',
      600: '#23578f',
      700: '#153e67',
      800: '#082541',
      900: '#000d1c',
    },
    accent: {
      50: '#f2f2f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
  },
  components: {
    VStack: {
      baseStyle: (props: any) => {
        return {
          bg: themeTools.mode('white', 'coolGray.800')(props),
        };
      },
    },
    Container: {
      baseStyle: {
        px: '15px',
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
    },
  },
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter-Light',
        italic: 'Inter-Light',
      },
      200: {
        normal: 'Inter-Light',
        italic: 'Inter-Light',
      },
      300: {
        normal: 'Roboto-Light',
        italic: 'Inter-Light',
      },
      400: {
        normal: 'Inter-Regular',
        italic: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-Medium',
        italic: 'Inter-Medium',
      },
      700: {
        normal: 'Inter-Bold',
      },
      800: {
        normal: 'Inter-ExtraBold',
        italic: 'Inter-ExtraBold',
      },
      900: {
        normal: 'Inter-Black',
        italic: 'Inter-Black',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: 'light',
  },
});

type CustomThemeType = typeof extendedTheme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
