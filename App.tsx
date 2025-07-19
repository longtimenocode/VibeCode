import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from './hooks/useTranslation';
import { LanguagePicker } from './components/LanguagePicker';
import { TranslationInput } from './components/TranslationInput';
import { TranslationResult } from './components/TranslationResult';
import { RecentTranslations } from './components/RecentTranslations';

export default function App() {
  const {
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
  } = useTranslation();

  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

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

          {/* Input Section - Moved above Language Picker */}
          <TranslationInput
            inputText={inputText}
            onInputChange={setInputText}
          />

          {/* Language Picker */}
          <LanguagePicker
            selectedLanguage={selectedLanguage}
            onLanguageSelect={setSelectedLanguage}
            showLanguagePicker={showLanguagePicker}
            onTogglePicker={() => setShowLanguagePicker(!showLanguagePicker)}
          />

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
          <TranslationResult
            translatedText={translatedText}
            onCopy={copyToClipboard}
            languageCode={selectedLanguage.code}
          />

          {/* Recent Translations */}
          <RecentTranslations
            recentTranslations={recentTranslations}
          />
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
});
