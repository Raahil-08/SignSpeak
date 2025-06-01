import React from 'react';
import { View, StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from '@/components/ThemedText';
import TranslationHistory from '@/components/TranslationHistory';
import { useTranslation } from '@/context/TranslationContext';
import Button from '@/components/Button';
import Layout from '@/constants/Layout';
import { Trash2 } from 'lucide-react-native';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const { translations, clearHistory } = useTranslation();

  const handleClearHistory = () => {
    if (Platform.OS === 'web') {
      if (confirm('Are you sure you want to clear all translation history?')) {
        clearHistory();
      }
    } else {
      Alert.alert(
        'Clear History',
        'Are you sure you want to clear all translation history?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear', style: 'destructive', onPress: clearHistory }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        {translations.length > 0 && (
          <Button
            title="Clear History"
            variant="danger"
            size="small"
            icon={<Trash2 size={16} color="#fff" />}
            onPress={handleClearHistory}
            style={styles.clearButton}
          />
        )}
      </View>
      
      <TranslationHistory translations={translations} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.md,
  },
  clearButton: {
    marginLeft: 'auto',
  },
});