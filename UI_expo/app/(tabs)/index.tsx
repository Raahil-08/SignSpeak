// import React, { useState, useRef } from 'react';
// import { View, StyleSheet, SafeAreaView, Platform, Dimensions } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useTheme } from '@/hooks/useThemeContext';
// import ThemedText from '@/components/ThemedText';
// import CameraWithOverlay from '@/components/CameraWithOverlay';
// import AnimatedTranslation from '@/components/AnimatedTranslation';
// import { useTranslation } from '@/context/TranslationContext';
// import Layout from '@/constants/Layout';
// import BoltAttribution from '@/components/BuiltWithBolt';

// const { height } = Dimensions.get('window');

// export default function TranslateScreen() {
//   const { colors } = useTheme();
//   const { addTranslation, currentTranslation, setCurrentTranslation } = useTranslation();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);

//   /* --- debouncer config --- */
// const STABILITY_FRAMES = 5;   // frames to lock a letter
// const GAP_FRAMES       = 12;  // silent frames → space
// const stableRef = useRef({ last: '', count: 0, gap: 0 });
// const [word, setWord] = useState('');

// const handleTextRecognized = (letter: string | null) => {
//   const s = stableRef.current;

//   // update counters
//   if (letter) {
//     if (letter === s.last) {
//       s.count += 1;
//     } else {
//       s.last  = letter;
//       s.count = 1;
//     }
//   } else {
//     s.count = 0;
//   }

//   // stable → accept
//   if (letter && s.count === STABILITY_FRAMES) {
//     setWord(w => w + letter);
//     setCurrentTranslation(t => t + letter);
//     addTranslation(letter);    // optional history
//     s.gap = 0;
//     return;
//   }

//   // silence → maybe space
//   s.gap += 1;
//   if (s.gap === GAP_FRAMES && word) {
//     setWord('');
//     setCurrentTranslation(t => t + ' ');
//   }
// };


//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: '#463f3a' }]}>
//       <StatusBar style="light" />
      
//       <View style={styles.content}>
//         <View style={styles.cameraSection}>
//           <CameraWithOverlay 
//             onTextRecognized={handleTextRecognized}
//             isProcessing={isProcessing}
//             isRecording={isRecording}
//             onRecordingChange={setIsRecording}
//           />
//         </View>
        
//         <View style={[styles.translationSection, { backgroundColor: '#f4f3ee' }]}>
//           <ThemedText 
//             variant="h3" 
//             weight="semibold" 
//             style={[styles.sectionTitle, { color: '#463f3a' }]}
//           >
//             Translation Output
//           </ThemedText>
          
//           {currentTranslation ? (
//             <AnimatedTranslation 
//               text={currentTranslation}
//               onComplete={() => {}}
//             />
//           ) : (
//             <View style={styles.placeholderContainer}>
//               <ThemedText 
//                 color="secondary" 
//                 style={[styles.placeholder, { color: '#8a817c' }]}
//               >
//                 {isRecording 
//                   ? "Recording... Sign language will be translated here"
//                   : "Start recording to see sign language translation"}
//               </ThemedText>
//             </View>
//           )}
//         </View>
        
//       </View>
      
//     </SafeAreaView>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   content: {
//     flex: 1,
//     flexDirection: Platform.OS === 'web' ? 'row' : 'column',
//     padding: Layout.spacing.md,
//     gap: Layout.spacing.md,
//   },
//   cameraSection: {
//     flex: Platform.OS === 'web' ? 0.6 : 0.7,
//     borderRadius: Layout.borderRadius.lg,
//     overflow: 'hidden',
//     backgroundColor: '#000',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   translationSection: {
//     flex: Platform.OS === 'web' ? 0.4 : 0.3,
//     borderRadius: Layout.borderRadius.lg,
//     padding: Layout.spacing.lg,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   sectionTitle: {
//     marginBottom: Layout.spacing.lg,
//     textAlign: 'center',
//   },
//   placeholderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: Layout.spacing.xl,
//   },
//   placeholder: {
//     textAlign: 'center',
//     lineHeight: 24,
//   },
// });




import React, { useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from '@/components/ThemedText';
import CameraWithOverlay from '@/components/CameraWithOverlay';
import AnimatedTranslation from '@/components/AnimatedTranslation';
import { useTranslation } from '@/context/TranslationContext';
import Layout from '@/constants/Layout';
import BoltAttribution from '@/components/BuiltWithBolt';

const { height } = Dimensions.get('window');

export default function TranslateScreen() {
  const { colors } = useTheme();
  const { addTranslation, currentTranslation, setCurrentTranslation } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  /* --- debouncer config --- */
  const STABILITY_FRAMES = 5;   // frames to lock a letter
  const GAP_FRAMES       = 12;  // silent frames → space
  const stableRef = useRef({ last: '', count: 0, gap: 0 });
  const [word, setWord] = useState('');

  const handleTextRecognized = (letter: string | null) => {
    const s = stableRef.current;

    // update counters
    if (letter) {
      if (letter === s.last) {
        s.count += 1;
      } else {
        s.last  = letter;
        s.count = 1;
      }
    } else {
      s.count = 0;
    }

    // stable → accept
    if (letter && s.count === STABILITY_FRAMES) {
      setWord(w => w + letter);
      setCurrentTranslation(t => t + letter);
      addTranslation(letter);    // optional history
      s.gap = 0;
      return;
    }

    // silence → maybe space
    s.gap += 1;
    if (s.gap === GAP_FRAMES && word) {
      setWord('');
      setCurrentTranslation(t => t + ' ');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#463f3a' }]}>
      <StatusBar style="light" />

      {/* ───────────── MAIN UI ───────────── */}
      <View style={styles.content}>
        {/* camera */}
        <View style={styles.cameraSection}>
          <CameraWithOverlay 
            onTextRecognized={handleTextRecognized}
            isProcessing={isProcessing}
            isRecording={isRecording}
            onRecordingChange={setIsRecording}
          />
        </View>

        {/* translation output */}
        <View style={[styles.translationSection, { backgroundColor: '#f4f3ee' }]}>
          <ThemedText
            variant="h3"
            weight="semibold"
            style={[styles.sectionTitle, { color: '#463f3a' }]}
          >
            Translation Output
          </ThemedText>

          {currentTranslation ? (
            <AnimatedTranslation 
              text={currentTranslation}
              onComplete={() => {}}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <ThemedText
                color="secondary"
                style={[styles.placeholder, { color: '#8a817c' }]}
              >
                {isRecording
                  ? 'Recording... Sign language will be translated here'
                  : 'Start recording to see sign language translation'}
              </ThemedText>
            </View>
          )}
        </View>
      </View>

      {/* ───────────── BOLT BADGE ───────────── */}
      <BoltAttribution
        style={styles.attribution}
        textColor={colors.textSecondary}
        size="small"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // parent wrapper
  container: {
    flex: 1,
    position: 'relative',                                        // ⭐ makes absolute children anchor here
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  /* ------------ flex layout ------------ */
  content: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  cameraSection: {
    flex: Platform.OS === 'web' ? 0.6 : 0.7,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  translationSection: {
    flex: Platform.OS === 'web' ? 0.4 : 0.3,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  /* ------------ misc styles ------------ */
  sectionTitle: {
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  placeholder: {
    textAlign: 'center',
    lineHeight: 24,
  },

  /* ------------ bolt badge ------------ */
  attribution: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 8 : 16,   // tweak as you like
    left: 0,
    right: 0,
    alignItems: 'center',
    opacity: 0.8,
  },
});
