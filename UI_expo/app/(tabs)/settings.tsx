import React from 'react';
import { View, StyleSheet, SafeAreaView, Switch, ScrollView, Pressable, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from '@/components/ThemedText';
import Layout from '@/constants/Layout';
import { Moon, Sun, Volume2, AlertCircle, Lock, HelpCircle, ChevronRight } from 'lucide-react-native';
import ThemedView from '@/components/ThemedView';
import Colors from '@/constants/Colors';

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const [speechEnabled, setSpeechEnabled] = React.useState(true);
  const [autoTranslate, setAutoTranslate] = React.useState(true);
  const [hapticFeedback, setHapticFeedback] = React.useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ThemedView variant="card" style={[styles.section, { borderColor: colors.border }]}>
          <ThemedText variant="h4" weight="semibold" style={styles.sectionTitle}>
            Appearance
          </ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              {theme === 'dark' ? 
                <Moon size={20} color={colors.text} /> : 
                <Sun size={20} color={colors.text} />
              }
              <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ 
                false: Platform.OS === 'ios' ? Colors.neutral[300] : Colors.neutral[400], 
                true: Colors.primary[500] 
              }}
              thumbColor={Platform.OS === 'ios' ? 'white' : theme === 'dark' ? Colors.primary[300] : Colors.neutral[100]}
              ios_backgroundColor={Colors.neutral[300]}
            />
          </View>
        </ThemedView>

        <ThemedView variant="card" style={[styles.section, { borderColor: colors.border }]}>
          <ThemedText variant="h4" weight="semibold" style={styles.sectionTitle}>
            Translation
          </ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Volume2 size={20} color={colors.text} />
              <View>
                <ThemedText style={styles.settingLabel}>Speech Output</ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Speak translations automatically
                </ThemedText>
              </View>
            </View>
            <Switch
              value={speechEnabled}
              onValueChange={setSpeechEnabled}
              trackColor={{ 
                false: Platform.OS === 'ios' ? Colors.neutral[300] : Colors.neutral[400], 
                true: Colors.primary[500] 
              }}
              thumbColor={Platform.OS === 'ios' ? 'white' : speechEnabled ? Colors.primary[300] : Colors.neutral[100]}
              ios_backgroundColor={Colors.neutral[300]}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <AlertCircle size={20} color={colors.text} />
              <View>
                <ThemedText style={styles.settingLabel}>Auto-Translate</ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Continuously detect and translate signs
                </ThemedText>
              </View>
            </View>
            <Switch
              value={autoTranslate}
              onValueChange={setAutoTranslate}
              trackColor={{ 
                false: Platform.OS === 'ios' ? Colors.neutral[300] : Colors.neutral[400], 
                true: Colors.primary[500] 
              }}
              thumbColor={Platform.OS === 'ios' ? 'white' : autoTranslate ? Colors.primary[300] : Colors.neutral[100]}
              ios_backgroundColor={Colors.neutral[300]}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <HelpCircle size={20} color={colors.text} />
              <ThemedText style={styles.settingLabel}>Haptic Feedback</ThemedText>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={setHapticFeedback}
              trackColor={{ 
                false: Platform.OS === 'ios' ? Colors.neutral[300] : Colors.neutral[400], 
                true: Colors.primary[500] 
              }}
              thumbColor={Platform.OS === 'ios' ? 'white' : hapticFeedback ? Colors.primary[300] : Colors.neutral[100]}
              ios_backgroundColor={Colors.neutral[300]}
            />
          </View>
        </ThemedView>
        
        <ThemedView variant="card" style={[styles.section, { borderColor: colors.border }]}>
          <ThemedText variant="h4" weight="semibold" style={styles.sectionTitle}>
            About
          </ThemedText>
          
          <Pressable style={styles.navigationItem}>
            <View style={styles.settingLabelContainer}>
              <Lock size={20} color={colors.text} />
              <ThemedText style={styles.settingLabel}>Privacy Policy</ThemedText>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          
          <Pressable style={styles.navigationItem}>
            <View style={styles.settingLabelContainer}>
              <HelpCircle size={20} color={colors.text} />
              <ThemedText style={styles.settingLabel}>Help & Support</ThemedText>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          
          <View style={styles.versionContainer}>
            <ThemedText variant="caption" color="secondary" style={styles.versionText}>
              Sign Translator v1.0.0
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Layout.spacing.lg,
  },
  section: {
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.md,
    borderWidth: 1,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  navigationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    marginLeft: Layout.spacing.sm,
  },
  versionContainer: {
    marginTop: Layout.spacing.lg,
    alignItems: 'center',
  },
  versionText: {
    textAlign: 'center',
  },
});