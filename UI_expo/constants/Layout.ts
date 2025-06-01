import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = width / 375; // Base design on 375px width (iPhone standard)

export default {
  window: {
    width,
    height,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 768,
  isLargeDevice: width >= 768,
};

// Function to scale sizes based on device width
export const moderateScale = (size: number, factor = 0.3) => {
  return size + (scale - 1) * size * factor;
};

// Typography scale
export const typography = {
  size: {
    xs: moderateScale(12),
    sm: moderateScale(14),
    md: moderateScale(16),
    lg: moderateScale(18),
    xl: moderateScale(20),
    xxl: moderateScale(24),
    xxxl: moderateScale(32),
  },
  lineHeight: {
    xs: moderateScale(16),
    sm: moderateScale(20),
    md: moderateScale(24),
    lg: moderateScale(28),
    xl: moderateScale(30),
    xxl: moderateScale(36),
    xxxl: moderateScale(40),
  },
};