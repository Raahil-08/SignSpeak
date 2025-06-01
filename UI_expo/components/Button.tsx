import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
  Platform,
} from 'react-native';
import { useTheme } from '@/hooks/useThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import ThemedText from './ThemedText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const { colors, theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.97);
    onPressIn && onPressIn(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1);
    onPressOut && onPressOut(e);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const getButtonStyles = () => {
    let backgroundColor, textColor, borderColor, borderWidth;

    switch (variant) {
      case 'primary':
        backgroundColor = colors.tint;
        textColor = 'white';
        borderColor = 'transparent';
        borderWidth = 0;
        break;
      case 'secondary':
        backgroundColor = theme === 'light' ? Colors.neutral[100] : Colors.neutral[700];
        textColor = colors.text;
        borderColor = 'transparent';
        borderWidth = 0;
        break;
      case 'outline':
        backgroundColor = 'transparent';
        textColor = colors.tint;
        borderColor = colors.tint;
        borderWidth = 1;
        break;
      case 'danger':
        backgroundColor = Colors.error[500];
        textColor = 'white';
        borderColor = 'transparent';
        borderWidth = 0;
        break;
      default:
        backgroundColor = colors.tint;
        textColor = 'white';
        borderColor = 'transparent';
        borderWidth = 0;
    }

    const sizeStyles = {
      height: size === 'small' ? 36 : size === 'medium' ? 44 : 52,
      paddingHorizontal: size === 'small' ? 12 : size === 'medium' ? 16 : 24,
      borderRadius: size === 'small' ? Layout.borderRadius.sm : Layout.borderRadius.md,
    };

    return {
      backgroundColor,
      textColor,
      borderColor,
      borderWidth,
      ...sizeStyles,
    };
  };

  const buttonStyles = getButtonStyles();
  
  const textSize = size === 'small' ? 'small' : size === 'medium' ? 'body' : 'h4';
  const textWeight = 'medium' as const;

  return (
    <AnimatedTouchable
      style={[
        styles.button,
        {
          backgroundColor: buttonStyles.backgroundColor,
          borderColor: buttonStyles.borderColor,
          borderWidth: buttonStyles.borderWidth,
          height: buttonStyles.height,
          paddingHorizontal: buttonStyles.paddingHorizontal,
          borderRadius: buttonStyles.borderRadius,
        },
        animatedStyle,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={buttonStyles.textColor} size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <ThemedText
            variant={textSize}
            weight={textWeight}
            style={{ color: buttonStyles.textColor }}
          >
            {title}
          </ThemedText>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
        outlineStyle: 'none',
      },
    }),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});