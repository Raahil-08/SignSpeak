import React, { createContext, useContext, useState, useEffect } from 'react';
import { Translation } from '@/components/TranslationHistory';

/* ──────────────────── TYPES ──────────────────── */

interface TranslationContextType {
  translations: Translation[];
  addTranslation: (text: string) => void;
  clearHistory: () => void;
  currentTranslation: string;            // 🔄 now always a string
  setCurrentTranslation: (text: string) => void;
}

/* ──────────────────── CONTEXT ──────────────────── */

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

/* ──────────────────── PROVIDER ──────────────────── */

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [currentTranslation, setCurrentTranslation] = useState<string>('');   // 🔄 empty string, not null

  /* ─ Load any saved history (e.g. AsyncStorage) ─ */
  useEffect(() => {
    // TODO: replace with AsyncStorage retrieval if/when you persist
    setTranslations([]);    // placeholder – no saved data yet
  }, []);

  /* ──────────────── ACTIONS ──────────────── */

  const addTranslation = (text: string) => {
    const newTranslation: Translation = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
    };
    setTranslations(prev => [newTranslation, ...prev]);
    // TODO: persist to AsyncStorage if needed
  };

  const clearHistory = () => {
    setTranslations([]);
    // TODO: also clear AsyncStorage if used
  };

  /* ──────────────── VALUE ──────────────── */

  const value: TranslationContextType = {
    translations,
    addTranslation,
    clearHistory,
    currentTranslation,
    setCurrentTranslation,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

/* ──────────────────── HOOK ──────────────────── */

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
