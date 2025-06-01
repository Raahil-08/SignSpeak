import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useThemeContext';
import ThemedText from '@/components/ThemedText';
import Layout from '@/constants/Layout';
import { Play, Book, Award, ChevronRight, Search } from 'lucide-react-native';
import ThemedView from '@/components/ThemedView';
import Button from '@/components/Button';
import Animated, { FadeInRight, FadeOutLeft, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

interface LessonCardProps {
  title: string;
  description: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  onPress: () => void;
}

function LessonCard({ title, description, image, difficulty, onPress }: LessonCardProps) {
  const { colors, theme } = useTheme();
  const scale = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 10, stiffness: 200 });
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Beginner': return Colors.success[500];
      case 'Intermediate': return Colors.warning[500];
      case 'Advanced': return Colors.error[500];
      default: return Colors.success[500];
    }
  };
  
  return (
    <Animated.View 
      style={[
        styles.card, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        animatedStyle
      ]}
    >
      <Pressable
        style={styles.cardContent}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image 
          source={{ uri: image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        
        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <ThemedText variant="h3" weight="semibold" style={styles.cardTitle}>
              {title}
            </ThemedText>
            
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
              <ThemedText variant="caption" weight="medium" color="white">
                {difficulty}
              </ThemedText>
            </View>
          </View>
          
          <ThemedText variant="body" color="secondary" style={styles.cardDescription}>
            {description}
          </ThemedText>
          
          <Button
            title="Start Learning"
            variant="primary"
            size="small"
            icon={<Play size={16} color="#fff" />}
            style={styles.cardButton}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const LEARNING_CATEGORIES = [
  {
    icon: <Book size={24} color="#fff" />,
    title: 'Alphabet',
    count: 26,
    backgroundColor: Colors.primary[500],
  },
  {
    icon: <Award size={24} color="#fff" />,
    title: 'Numbers',
    count: 10,
    backgroundColor: Colors.secondary[500],
  },
  {
    icon: <Search size={24} color="#fff" />,
    title: 'Common Phrases',
    count: 50,
    backgroundColor: Colors.success[500],
  }
];

export default function LearnScreen() {
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Sample lessons data
  const lessons = [
    {
      id: '1',
      title: 'ASL Basics',
      description: 'Learn the fundamentals of American Sign Language with this beginner-friendly lesson.',
      image: 'https://images.pexels.com/photos/6964361/pexels-photo-6964361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      difficulty: 'Beginner',
    },
    {
      id: '2',
      title: 'Common Greetings',
      description: 'Master everyday greetings and introductions in sign language.',
      image: 'https://images.pexels.com/photos/7516556/pexels-photo-7516556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      difficulty: 'Beginner',
    },
    {
      id: '3',
      title: 'Conversational Signs',
      description: 'Take your signing to the next level with these conversational patterns.',
      image: 'https://images.pexels.com/photos/7516565/pexels-photo-7516565.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      difficulty: 'Intermediate',
    },
    {
      id: '4',
      title: 'Advanced Expressions',
      description: 'Express complex ideas and emotions with these advanced signing techniques.',
      image: 'https://images.pexels.com/photos/6964697/pexels-photo-6964697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      difficulty: 'Advanced',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText variant="h2" weight="bold" style={styles.title}>
            Learn Sign Language
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.subtitle}>
            Explore lessons, tutorials, and practice exercises
          </ThemedText>
        </View>
        
        <View style={styles.categoriesContainer}>
          {LEARNING_CATEGORIES.map((category, index) => (
            <Pressable 
              key={index} 
              style={[
                styles.categoryCard,
                { backgroundColor: category.backgroundColor }
              ]}
              onPress={() => {}}
            >
              <View style={styles.categoryIcon}>
                {category.icon}
              </View>
              <ThemedText variant="body" weight="semibold" color="white">
                {category.title}
              </ThemedText>
              <ThemedText variant="caption" color="white">
                {category.count} lessons
              </ThemedText>
            </Pressable>
          ))}
        </View>
        
        <View style={styles.lessonSection}>
          <View style={styles.sectionHeader}>
            <ThemedText variant="h3" weight="semibold">
              Popular Lessons
            </ThemedText>
            <Pressable style={styles.viewAllButton}>
              <ThemedText color="tint" weight="medium">View All</ThemedText>
              <ChevronRight size={16} color={colors.tint} />
            </Pressable>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.lessonCardsContainer}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + 16}
            snapToAlignment="start"
          >
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                image={lesson.image}
                difficulty={lesson.difficulty as any}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>
        
        <ThemedView variant="card" style={[styles.practiceSection, { borderColor: colors.border }]}>
          <ThemedText variant="h3" weight="semibold" style={styles.practiceTitle}>
            Daily Practice
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.practiceDescription}>
            Practice sign language for just 5 minutes daily to improve your skills quickly.
          </ThemedText>
          <Button
            title="Start Today's Practice"
            variant="primary"
            size="medium"
            icon={<Play size={18} color="#fff" />}
            style={styles.practiceButton}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
  },
  title: {
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    marginBottom: Layout.spacing.lg,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  categoryCard: {
    width: (width - Layout.spacing.lg * 2 - Layout.spacing.md * 2) / 3,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    marginBottom: Layout.spacing.sm,
  },
  lessonSection: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonCardsContainer: {
    paddingLeft: Layout.spacing.lg,
    paddingRight: Layout.spacing.sm,
    paddingBottom: Layout.spacing.md,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
  },
  cardContent: {
    flex: 1,
  },
  cardImage: {
    height: 140,
    width: '100%',
  },
  cardBody: {
    padding: Layout.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  cardTitle: {
    flex: 1,
    marginRight: Layout.spacing.xs,
  },
  difficultyBadge: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.full,
  },
  cardDescription: {
    marginBottom: Layout.spacing.md,
  },
  cardButton: {
    alignSelf: 'flex-start',
  },
  practiceSection: {
    margin: Layout.spacing.lg,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    borderWidth: 1,
    marginTop: 0,
  },
  practiceTitle: {
    marginBottom: Layout.spacing.sm,
  },
  practiceDescription: {
    marginBottom: Layout.spacing.lg,
  },
  practiceButton: {
    alignSelf: 'flex-start',
  },
});