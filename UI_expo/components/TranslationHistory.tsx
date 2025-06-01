import React from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from './ThemedText';
import Layout from '@/constants/Layout';
import { Clock, MessageSquare, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

export interface Translation {
  id: string;
  text: string;
  timestamp: Date;
}

interface TranslationHistoryProps {
  translations: Translation[];
  onSelectTranslation?: (translation: Translation) => void;
}

export default function TranslationHistory({ 
  translations,
  onSelectTranslation,
}: TranslationHistoryProps) {
  const { colors } = useTheme();

  const speakText = (text: string) => {
    Speech.speak(text);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderItem = ({ item }: { item: Translation }) => (
    <Animated.View 
      entering={FadeInRight.duration(300).springify()} 
      exiting={FadeOutLeft.duration(200)}
      style={[
        styles.translationItem, 
        { backgroundColor: colors.card, borderColor: colors.border }
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.translationContent,
          pressed && { opacity: 0.8 }
        ]}
        onPress={() => onSelectTranslation?.(item)}
      >
        <View style={styles.messageIcon}>
          <MessageSquare size={20} color={colors.tint} />
        </View>
        <View style={styles.translationTextContainer}>
          <ThemedText 
            variant="body" 
            weight="medium" 
            numberOfLines={2}
          >
            {item.text}
          </ThemedText>
          <View style={styles.timeRow}>
            <Clock size={12} color={colors.textSecondary} />
            <ThemedText 
              variant="small" 
              color="secondary" 
              style={styles.timestamp}
            >
              {formatTime(item.timestamp)}
            </ThemedText>
          </View>
        </View>
      </Pressable>
      
      <Pressable
        style={({ pressed }) => [
          styles.speakButton,
          pressed && { opacity: 0.7 }
        ]}
        onPress={() => speakText(item.text)}
      >
        <Volume2 size={20} color={colors.tint} />
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ThemedText variant="h3" weight="semibold" style={styles.title}>
        Recent Translations
      </ThemedText>
      
      {translations.length > 0 ? (
        <FlatList
          data={translations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MessageSquare size={48} color={colors.textSecondary} />
          <ThemedText 
            variant="body" 
            color="secondary" 
            style={styles.emptyText}
          >
            Your translations will appear here
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Layout.spacing.md,
  },
  title: {
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.lg,
  },
  list: {
    paddingBottom: 20,
  },
  translationItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  translationContent: {
    flex: 1,
    flexDirection: 'row',
    padding: Layout.spacing.md,
  },
  messageIcon: {
    marginRight: Layout.spacing.sm,
  },
  translationTextContainer: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },
  timestamp: {
    marginLeft: 4,
  },
  speakButton: {
    padding: Layout.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    marginTop: Layout.spacing.md,
    textAlign: 'center',
  },
});