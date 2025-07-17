import React from 'react';
import { View, Text } from 'react-native';
import { TranslationResult as TranslationResultType } from '../types';

interface RecentTranslationsProps {
  recentTranslations: TranslationResultType[];
}

export const RecentTranslations: React.FC<RecentTranslationsProps> = ({
  recentTranslations,
}) => {
  if (recentTranslations.length === 0) return null;

  return (
    <View style={styles.recentSection}>
      <Text style={styles.sectionTitle}>Recent Translations</Text>
      {recentTranslations.slice(0, 5).map((item, index) => (
        <View key={index} style={styles.recentItem}>
          <Text style={styles.recentOriginal}>{item.original}</Text>
          <Text style={styles.recentTranslated}>{item.translated}</Text>
          <Text style={styles.recentLanguage}>{item.language}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = {
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: 10,
  },
  recentItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  recentOriginal: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500' as const,
    marginBottom: 5,
  },
  recentTranslated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  recentLanguage: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic' as const,
  },
}; 