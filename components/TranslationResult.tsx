import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';

interface TranslationResultProps {
  translatedText: string;
  onCopy: (text: string) => void;
  languageCode: string;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({
  translatedText,
  onCopy,
  languageCode,
}) => {
  if (!translatedText) return null;

  const speakText = () => {
    Speech.speak(translatedText, {
      language: languageCode,
      pitch: 1.0,
      rate: 0.9,
    });
  };

  return (
    <View style={styles.resultSection}>
      <Text style={styles.sectionTitle}>Translation</Text>
      <View style={styles.translatedTextContainer}>
        <Text style={styles.translatedText}>{translatedText}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.speakButton}
            onPress={speakText}
          >
            <Text style={styles.speakButtonText}>🔊 Speak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => onCopy(translatedText)}
          >
            <Text style={styles.copyButtonText}>📋 Copy</Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: 10,
  },
  speakButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center' as const,
  },
  speakButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  copyButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center' as const,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
}; 