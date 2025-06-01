import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import ThemedText from './ThemedText';
import { useTheme } from '@/hooks/useThemeContext';
import Layout from '@/constants/Layout';

interface AnimatedTranslationProps {
  text: string;
  onComplete?: () => void;
}

const { width } = Dimensions.get('window');

export default function AnimatedTranslation({ text, onComplete }: AnimatedTranslationProps) {
  const { colors } = useTheme();
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateY = useSharedValue(20);
  
  useEffect(() => {
    // Reset animation values when text changes
    opacity.value = 0;
    scale.value = 0.9;
    translateY.value = 20;
    
    // Start the animation sequence
    opacity.value = withSequence(
      withTiming(0, { duration: 150 }),
      withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) })
    );
    
    scale.value = withSequence(
      withTiming(0.9, { duration: 150 }),
      withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) })
    );
    
    translateY.value = withSequence(
      withTiming(20, { duration: 150 }),
      withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) })
    );
    
    // Notify when animation completes
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 450);
    
    return () => clearTimeout(timeout);
  }, [text]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ]
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <ThemedText 
          variant="h2" 
          weight="semibold" 
          style={styles.text}
        >
          {text}
        </ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    maxWidth: width - 48,
    padding: Layout.spacing.md,
  },
  text: {
    textAlign: 'center',
  }
});