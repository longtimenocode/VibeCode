import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface TranslationInputProps {
  inputText: string;
  onInputChange: (text: string) => void;
}

export const TranslationInput: React.FC<TranslationInputProps> = ({
  inputText,
  onInputChange,
}) => {
  return (
    <View style={styles.inputSection}>
      <Text style={styles.sectionTitle}>Enter Text to Translate</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type your text here..."
        placeholderTextColor="#999"
        value={inputText}
        onChangeText={onInputChange}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = {
  inputSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top' as const,
  },
}; 