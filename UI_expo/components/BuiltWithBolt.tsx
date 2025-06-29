import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { ExternalLink } from 'lucide-react-native';

interface BoltAttributionProps {
  /** Extra styles you want to merge in */
  style?: any;
  /** Text & icon colour */
  textColor?: string;
  /** “small” ≈ chip-size, “large” works nicely on tablets */
  size?: 'small' | 'medium' | 'large';
  /** Background pill colour (defaults to semi-transparent black) */
  bgColor?: string;
}

export default function BoltAttribution({
  style,
  textColor = '#f4f3ee',
  size = 'small',
  bgColor = 'rgba(0,0,0,0.35)',
}: BoltAttributionProps) {
  const handlePress = () => {
    Linking.openURL('https://bolt.new');
  };

  const fontSize = size === 'small' ? 12 : size === 'medium' ? 14 : 16;
  const iconSize = fontSize + 2;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.container,
        { backgroundColor: bgColor, paddingVertical: fontSize / 3 },
        // *web* pointer cursor for nicer UX
        Platform.OS === 'web' ? { cursor: 'pointer' } : {},
        style,
      ]}
    >
      <ExternalLink size={iconSize} color={textColor} />
      <Text style={[styles.text, { color: textColor, fontSize }]}>
        Made&nbsp;with&nbsp;Bolt
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    borderRadius: 999, // pill shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 3,
  },
  text: {
    fontWeight: Platform.OS === 'web' ? '500' : '600',
    letterSpacing: 0.2,
  },
});
