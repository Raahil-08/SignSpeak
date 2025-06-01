import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from './ThemedText';
import Layout from '@/constants/Layout';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

interface QuickPhrasesProps {
  onSelectPhrase: (phrase: string) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const QUICK_PHRASES = [
  'Hello',
  'Thank you',
  'Yes',
  'No',
  'Please',
  'Help',
  'I need assistance',
  'How are you?',
  'Good morning',
  'Good night',
  'I am deaf',
  'Please speak slowly',
  'Can you repeat?'
];

export default function QuickPhrases({ onSelectPhrase }: QuickPhrasesProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText variant="h4" weight="semibold" style={styles.title}>
        Quick Phrases
      </ThemedText>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {QUICK_PHRASES.map((phrase, index) => (
          <PhraseButton 
            key={index}
            phrase={phrase}
            onPress={() => onSelectPhrase(phrase)}
            colors={colors}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function PhraseButton({ 
  phrase, 
  onPress, 
  colors 
}: { 
  phrase: string; 
  onPress: () => void;
  colors: any;
}) {
  const scale = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.phraseButton,
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        animatedStyle
      ]}
    >
      <ThemedText variant="body" weight="medium">
        {phrase}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
  },
  title: {
    marginBottom: Layout.spacing.md,
  },
  scrollContent: {
    paddingRight: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
  phraseButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.sm,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
});