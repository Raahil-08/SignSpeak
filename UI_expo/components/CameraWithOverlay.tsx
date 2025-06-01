import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from './ThemedText';
import Button from './Button';
import { Camera as CameraIcon, SwitchCamera, Mic, MicOff } from 'lucide-react-native';
import Layout from '@/constants/Layout';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence, 
  Easing,
  cancelAnimation 
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';

interface CameraWithOverlayProps {
  onTextRecognized: (text: string) => void;
  isProcessing: boolean;
}

export default function CameraWithOverlay({ 
  onTextRecognized, 
  isProcessing 
}: CameraWithOverlayProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const cameraRef = useRef<Camera>(null);
  const { colors, theme } = useTheme();
  
  // Animation values for the guide overlay
  const borderOpacity = useSharedValue(0.5);
  const borderScale = useSharedValue(1);
  
  useEffect(() => {
    // Animate the overlay when processing state changes
    if (isProcessing) {
      // Cancel any existing animations
      cancelAnimation(borderOpacity);
      cancelAnimation(borderScale);
      
      // Set up the "processing" animation
      borderOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 700, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 700, easing: Easing.inOut(Easing.ease) })
        ),
        -1, // Infinite repeat
        true // Reverse
      );
      
      borderScale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.98, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1, // Infinite repeat
        true // Reverse
      );
    } else {
      // Reset to default animation
      borderOpacity.value = withTiming(0.5, { duration: 300 });
      borderScale.value = withTiming(1, { duration: 300 });
    }
    
    // Clean up animations on unmount
    return () => {
      cancelAnimation(borderOpacity);
      cancelAnimation(borderScale);
    };
  }, [isProcessing]);
  
  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      opacity: borderOpacity.value,
      transform: [{ scale: borderScale.value }],
    };
  });

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.tint} size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedText variant="h3" style={{ marginBottom: 20, textAlign: 'center' }}>
          We need your permission to use the camera
        </ThemedText>
        <Button 
          title="Grant Permission" 
          onPress={requestPermission} 
          variant="primary"
          size="large" 
        />
      </View>
    );
  }

  // Function to toggle between front and back cameras
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'front' ? 'back' : 'front'));
  };
  
  // Function to toggle audio
  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  // Function to handle sign detection (placeholder for actual implementation)
  const handleCapture = () => {
    // This would be replaced with actual sign language detection logic
    // For now, we'll simulate recognition with a timeout
    onTextRecognized('Hello, how are you today?');
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={[styles.cameraContainer, { backgroundColor: colors.background }]}>
          <CameraView 
            style={styles.camera} 
            facing={facing}
          >
            {/* Guide overlay */}
            <Animated.View style={[
              styles.guideOverlay, 
              { borderColor: Colors.primary[500] },
              animatedBorderStyle
            ]}>
              {isProcessing && (
                <View style={styles.processingIndicator}>
                  <ActivityIndicator size="small" color="#fff" />
                  <ThemedText color="white" style={{ marginLeft: 8 }}>
                    Processing...
                  </ThemedText>
                </View>
              )}
            </Animated.View>

            {/* Camera controls */}
            <View style={styles.controls}>
              <Button
                title=""
                variant="secondary"
                style={styles.iconButton}
                onPress={toggleAudio}
                icon={audioEnabled ? 
                  <Mic size={24} color={colors.text} /> : 
                  <MicOff size={24} color={colors.text} />
                }
              />
              
              <Button
                title=""
                variant="primary"
                style={styles.captureButton}
                onPress={handleCapture}
                icon={<CameraIcon size={30} color="#fff" />}
              />
              
              <Button
                title=""
                variant="secondary"
                style={styles.iconButton}
                onPress={toggleCameraFacing}
                icon={<SwitchCamera size={24} color={colors.text} />}
              />
            </View>
          </CameraView>

          <View style={styles.instructions}>
            <ThemedText 
              variant="body" 
              style={{ textAlign: 'center', marginHorizontal: Layout.spacing.lg }}
            >
              Position your hands within the frame and sign clearly.
              The AI will translate your signs into text.
            </ThemedText>
          </View>
        </View>
      ) : (
        <View style={styles.unsupportedContainer}>
          <ThemedText variant="h3" style={{ marginBottom: Layout.spacing.md, textAlign: 'center' }}>
            Camera not supported
          </ThemedText>
          <ThemedText style={{ textAlign: 'center' }}>
            The camera is not supported in this environment. Try running the app on a device with camera access.
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Layout.spacing.md,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginHorizontal: Layout.spacing.lg,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  guideOverlay: {
    position: 'absolute',
    top: '20%',
    width: '80%',
    height: '45%',
    borderWidth: 2,
    borderRadius: Layout.borderRadius.lg,
    borderStyle: 'dashed',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  processingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: -12,
  },
  instructions: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
  },
  unsupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
});