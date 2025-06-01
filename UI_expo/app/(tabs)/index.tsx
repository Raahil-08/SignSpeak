import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from '@/components/ThemedText';
import CameraWithOverlay from '@/components/CameraWithOverlay';
import AnimatedTranslation from '@/components/AnimatedTranslation';
import QuickPhrases from '@/components/QuickPhrases';
import { useTranslation } from '@/context/TranslationContext';
import * as Speech from 'expo-speech';
import Layout from '@/constants/Layout';
import ThemedView from '@/components/ThemedView';

export default function TranslateScreen() {
  const { colors } = useTheme();
  const { addTranslation, currentTranslation, setCurrentTranslation } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle text recognition from the camera
  const handleTextRecognized = (text: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setCurrentTranslation(text);
      addTranslation(text);
      setIsProcessing(false);
      
      // Speak the text automatically
      Speech.speak(text, {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
      });
    }, 1500);
  };
  
  // Handle quick phrase selection
  const handleQuickPhraseSelected = (phrase: string) => {
    setCurrentTranslation(phrase);
    addTranslation(phrase);
    
    // Speak the phrase
    Speech.speak(phrase, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
    });
  };
  
  // Clear the current translation after a delay
  useEffect(() => {
    if (currentTranslation) {
      const timeout = setTimeout(() => {
        setCurrentTranslation(null);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentTranslation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <ThemedText variant="h2" weight="bold" style={styles.title}>
          Sign Translator
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.subtitle}>
          Translate sign language in real-time
        </ThemedText>
      </View>
      
      <ThemedView 
        variant="card" 
        style={[styles.cameraContainer, { borderColor: colors.border }]}
      >
        <CameraWithOverlay 
          onTextRecognized={handleTextRecognized}
          isProcessing={isProcessing}
        />
      </ThemedView>
      
      {currentTranslation && (
        <View style={styles.translationContainer}>
          <AnimatedTranslation 
            text={currentTranslation}
            onComplete={() => {}}
          />
        </View>
      )}
      
      <QuickPhrases onSelectPhrase={handleQuickPhraseSelected} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
  title: {
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    marginBottom: Layout.spacing.lg,
  },
  cameraContainer: {
    flex: 1,
    margin: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
  },
  translationContainer: {
    paddingHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.md,
  },
});