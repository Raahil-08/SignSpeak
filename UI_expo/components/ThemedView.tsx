import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useThemeContext';

interface ThemedViewProps extends ViewProps {
  variant?: 'primary' | 'card' | 'secondary' | 'transparent';
  padding?: keyof typeof paddings;
}

const paddings = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export default function ThemedView({
  variant = 'primary',
  padding = 'none',
  style,
  ...props
}: ThemedViewProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.background;
      case 'card':
        return colors.card;
      case 'secondary':
        return colors.border;
      case 'transparent':
        return 'transparent';
      default:
        return colors.background;
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: getBackgroundColor(),
          padding: paddings[padding],
        },
        style,
      ]}
      {...props}
    />
  );
}