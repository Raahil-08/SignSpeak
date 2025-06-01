export const Colors = {
  primary: {
    50: '#E6F0FF',
    100: '#CCE0FF',
    200: '#99C1FF',
    300: '#66A3FF',
    400: '#3385FF',
    500: '#0A84FF', // Main primary color
    600: '#0064D9',
    700: '#0052B3',
    800: '#00408C',
    900: '#002E66',
  },
  secondary: {
    50: '#EDEDFC',
    100: '#DBDBFA',
    200: '#B7B7F5',
    300: '#9393F0',
    400: '#6F6FEB',
    500: '#5E5CE6', // Main secondary color
    600: '#4B4ABD',
    700: '#3D3C9E',
    800: '#2E2E7F',
    900: '#1F1F60',
  },
  success: {
    50: '#E6F9ED',
    100: '#CDF3DC',
    200: '#9BE7B9',
    300: '#68DB95',
    400: '#36CF72',
    500: '#30D158', // Main success color
    600: '#25A844',
    700: '#1D8636',
    800: '#166428',
    900: '#0F421B',
  },
  warning: {
    50: '#FFF8E6',
    100: '#FFF0CC',
    200: '#FFE299',
    300: '#FFD366',
    400: '#FFC533',
    500: '#FFB800', // Main warning color
    600: '#D99C00',
    700: '#B38000',
    800: '#8C6400',
    900: '#664800',
  },
  error: {
    50: '#FCE6E6',
    100: '#F9CCCC',
    200: '#F39999',
    300: '#EC6666',
    400: '#E63333',
    500: '#FF3B30', // Main error color
    600: '#D92626',
    700: '#B31F1F',
    800: '#8C1919',
    900: '#661212',
  },
  neutral: {
    50: '#F9F9F9',
    100: '#F2F2F2',
    200: '#E6E6E6',
    300: '#D9D9D9',
    400: '#CCCCCC',
    500: '#AEAEB2', // Main neutral color
    600: '#8E8E93',
    700: '#636366',
    800: '#3A3A3C',
    900: '#1C1C1E',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const ThemeColors = {
  light: {
    text: Colors.neutral[900],
    textSecondary: Colors.neutral[600],
    background: Colors.white,
    card: Colors.white,
    border: Colors.neutral[200],
    tint: Colors.primary[500],
    tabIconDefault: Colors.neutral[500],
    tabIconSelected: Colors.primary[500],
  },
  dark: {
    text: Colors.white,
    textSecondary: Colors.neutral[400],
    background: Colors.neutral[900],
    card: Colors.neutral[800],
    border: Colors.neutral[700],
    tint: Colors.primary[400],
    tabIconDefault: Colors.neutral[500],
    tabIconSelected: Colors.primary[400],
  },
};

export type ThemeType = keyof typeof ThemeColors;
export default Colors;