import React, { createContext, useContext, useState, useEffect } from 'react';
import { Translation } from '@/components/TranslationHistory';

interface TranslationContextType {
  translations: Translation[];
  addTranslation: (text: string) => void;
  clearHistory: () => void;
  currentTranslation: string | null;
  setCurrentTranslation: (text: string | null) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [currentTranslation, setCurrentTranslation] = useState<string | null>(null);

  // Load translations from storage (would use AsyncStorage in a real app)
  useEffect(() => {
    // Simulate loading saved translations
    const loadedTranslations: Translation[] = [];
    setTranslations(loadedTranslations);
  }, []);

  const addTranslation = (text: string) => {
    const newTranslation: Translation = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
    };
    
    setTranslations(prev => [newTranslation, ...prev]);
    
    // In a real app, would save to AsyncStorage here
  };

  const clearHistory = () => {
    setTranslations([]);
    // In a real app, would clear AsyncStorage here
  };

  const value = {
    translations,
    addTranslation,
    clearHistory,
    currentTranslation,
    setCurrentTranslation,
  };

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};