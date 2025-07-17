import AsyncStorage from '@react-native-async-storage/async-storage';
import { TranslationResult } from '../types';

export class StorageService {
  private readonly RECENT_TRANSLATIONS_KEY = 'recentTranslations';
  private readonly MAX_RECENT_ITEMS = 10;

  async loadRecentTranslations(): Promise<TranslationResult[]> {
    try {
      const saved = await AsyncStorage.getItem(this.RECENT_TRANSLATIONS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      return [];
    } catch (error) {
      console.error('Error loading recent translations:', error);
      return [];
    }
  }

  async saveRecentTranslation(translation: TranslationResult): Promise<void> {
    try {
      const recentTranslations = await this.loadRecentTranslations();
      const updated = [translation, ...recentTranslations.slice(0, this.MAX_RECENT_ITEMS - 1)];
      await AsyncStorage.setItem(this.RECENT_TRANSLATIONS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recent translation:', error);
    }
  }

  async clearRecentTranslations(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.RECENT_TRANSLATIONS_KEY);
    } catch (error) {
      console.error('Error clearing recent translations:', error);
    }
  }
} 