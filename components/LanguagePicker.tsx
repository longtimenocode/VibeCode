import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Language } from '../types';
import { LANGUAGES } from '../constants/languages';

interface LanguagePickerProps {
  selectedLanguage: Language;
  onLanguageSelect: (language: Language) => void;
  showLanguagePicker: boolean;
  onTogglePicker: () => void;
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  selectedLanguage,
  onLanguageSelect,
  showLanguagePicker,
  onTogglePicker,
}) => {
  return (
    <View style={styles.languageSection}>
      <Text style={styles.sectionTitle}>Target Language</Text>
      <TouchableOpacity
        style={styles.languagePicker}
        onPress={onTogglePicker}
      >
        <Text style={styles.languagePickerText}>
          {selectedLanguage.name}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      {showLanguagePicker && (
        <View style={styles.languageDropdown}>
          <ScrollView style={styles.languageList}>
            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={styles.languageOption}
                onPress={() => {
                  onLanguageSelect(language);
                  onTogglePicker();
                }}
              >
                <Text style={[
                  styles.languageOptionText,
                  selectedLanguage.code === language.code && styles.selectedLanguageText
                ]}>
                  {language.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = {
  languageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: 10,
  },
  languagePicker: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  languagePickerText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  languageDropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 200,
  },
  languageList: {
    maxHeight: 200,
  },
  languageOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLanguageText: {
    color: '#007AFF',
    fontWeight: '600' as const,
  },
}; 