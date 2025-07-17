import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Language, TranslationResult } from '../types';
import { TranslationManager } from '../services/TranslationManager';
import { StorageService } from '../services/StorageService';

export const useTranslation = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'en', name: 'English' });
  const [isLoading, setIsLoading] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState<TranslationResult[]>([]);

  const translationManager = new TranslationManager();
  const storageService = new StorageService();

  useEffect(() => {
    loadRecentTranslations();
  }, []);

  const loadRecentTranslations = async () => {
    const translations = await storageService.loadRecentTranslations();
    setRecentTranslations(translations);
  };

  const translateText = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    try {
      const translated = await translationManager.translate(inputText, selectedLanguage.code);
      
      if (translated) {
        setTranslatedText(translated);
        
        const translationResult: TranslationResult = {
          original: inputText,
          translated,
          language: selectedLanguage.name,
          timestamp: Date.now(),
        };
        
        await storageService.saveRecentTranslation(translationResult);
        await loadRecentTranslations(); // Refresh the recent translations
      } else {
        throw new Error('No translation returned from any service');
      }
    } catch (error: any) {
      console.error('Translation error:', error);
      
      let errorMessage = 'Failed to translate text. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      } else if (error.code === 'ECONNABORTED' || error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      }
      
      Alert.alert('Translation Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearText = () => {
    setInputText('');
    setTranslatedText('');
  };

  const copyToClipboard = (text: string) => {
    // In a real app, you'd use a clipboard library
    Alert.alert('Copied!', 'Text copied to clipboard');
  };

  return {
    inputText,
    setInputText,
    translatedText,
    selectedLanguage,
    setSelectedLanguage,
    isLoading,
    recentTranslations,
    translateText,
    clearText,
    copyToClipboard,
  };
}; 