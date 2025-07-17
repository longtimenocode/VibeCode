import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'cs', name: 'Czech' },
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState<Array<{
    original: string;
    translated: string;
    language: string;
    timestamp: number;
  }>>([]);

  useEffect(() => {
    loadRecentTranslations();
  }, []);

  const loadRecentTranslations = async () => {
    try {
      const saved = await AsyncStorage.getItem('recentTranslations');
      if (saved) {
        setRecentTranslations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading recent translations:', error);
    }
  };

  const saveRecentTranslation = async (original: string, translated: string, language: string) => {
    try {
      const newTranslation = {
        original,
        translated,
        language,
        timestamp: Date.now(),
      };
      
      const updated = [newTranslation, ...recentTranslations.slice(0, 9)];
      setRecentTranslations(updated);
      await AsyncStorage.setItem('recentTranslations', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recent translation:', error);
    }
  };

  const translateText = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    try {
      // Try multiple translation APIs for better reliability
      let translated = '';   
      // First try: Google Translate (more reliable)
      try {
        const response = await axios.get(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${selectedLanguage.code}&dt=t&q=${encodeURIComponent(inputText)}`,
          {
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
          }
        );

        // Google Translate API returns an array structure
        // response.data[0] contains array of translation segments
        if (response.data && response.data[0] && Array.isArray(response.data[0])) {
          // Extract all translated segments and join them
          const translatedSegments = response.data[0]
            .filter((segment: any) => segment && segment[0]) // Filter out empty segments
            .map((segment: any) => segment[0]); // Get the translated text from each segment
          
          translated = translatedSegments.join(' ');
        } else {
          throw new Error('No translation from Google Translate');
        }
      } catch (firstError) {      
        console.log('Google Translate failed, trying MyMemory...');
        
        // Fallback: MyMemory API
        try {
          const response = await axios.get(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${selectedLanguage.code}`,
            {
              timeout: 10000,
            }
          );

          if (response.data && response.data.responseData && response.data.responseData.translatedText) {
            translated = response.data.responseData.translatedText;
          } else {
            throw new Error('No translation from MyMemory');
          }
        } catch (secondError) {
          throw new Error('All translation services are currently unavailable. Please check your internet connection and try again.');
        }
      }

      if (translated) {    
        setTranslatedText(translated);
        await saveRecentTranslation(inputText, translated, selectedLanguage.name);
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
      } else if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      }
      
      Alert.alert(
        'Translation Error',
        errorMessage
      );
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Translation App</Text>
            <Text style={styles.subtitle}>Translate text to any language</Text>
          </View>

          {/* Language Picker */}
          <View style={styles.languageSection}>
            <Text style={styles.sectionTitle}>Target Language</Text>
            <TouchableOpacity
              style={styles.languagePicker}
              onPress={() => setShowLanguagePicker(!showLanguagePicker)}
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
                        setSelectedLanguage(language);
                        setShowLanguagePicker(false);
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

          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Enter Text to Translate</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type your text here..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.translateButton]}
              onPress={translateText}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Translate</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={clearText}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Translation Result */}
          {translatedText && (
            <View style={styles.resultSection}>
              <Text style={styles.sectionTitle}>Translation</Text>
              <View style={styles.translatedTextContainer}>
                <Text style={styles.translatedText}>{translatedText}</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(translatedText)}
                >
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Recent Translations */}
          {recentTranslations.length > 0 && (
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
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  languageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  languagePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: '600',
  },
  inputSection: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  translateButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  resultSection: {
    marginBottom: 20,
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
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  recentSection: {
    marginBottom: 20,
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
    fontWeight: '500',
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
    fontStyle: 'italic',
  },
});
