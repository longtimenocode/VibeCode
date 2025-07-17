import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TranslationResultProps {
  translatedText: string;
  onCopy: (text: string) => void;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({
  translatedText,
  onCopy,
}) => {
  if (!translatedText) return null;

  return (
    <View style={styles.resultSection}>
      <Text style={styles.sectionTitle}>Translation</Text>
      <View style={styles.translatedTextContainer}>
        <Text style={styles.translatedText}>{translatedText}</Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => onCopy(translatedText)}
        >
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  resultSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: 10,
  },
  translatedTextContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  translatedText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  copyButton: {
    alignSelf: 'flex-end' as const,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
}; 