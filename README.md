# Translation App

A modern, mobile-first translation application built with React Native and Expo. Translate text between multiple languages with a clean, intuitive interface.

## 🚀 Features

- **Multi-language Support**: Translate between 20+ languages
- **Real-time Translation**: Instant translation using Google Translate API
- **Fallback Services**: Multiple translation services for reliability
- **Recent Translations**: Save and view your translation history
- **Clean UI**: Modern, responsive design with smooth animations
- **Offline Storage**: Recent translations persist between sessions
- **Copy to Clipboard**: Easy sharing of translated text

## 📱 Supported Languages

- English, Spanish, French, German, Italian, Portuguese
- Russian, Japanese, Korean, Chinese, Arabic, Hindi
- Turkish, Dutch, Polish, Swedish, Danish, Norwegian
- Finnish, Czech

## 🏗️ Architecture

The app follows a modular, scalable architecture with clear separation of concerns:

```
TranslationApp/
├── components/          # Reusable UI components
│   ├── LanguagePicker.tsx
│   ├── TranslationInput.tsx
│   ├── TranslationResult.tsx
│   └── RecentTranslations.tsx
├── services/           # Business logic and API services
│   ├── GoogleTranslateService.ts
│   ├── MyMemoryService.ts
│   ├── TranslationManager.ts
│   └── StorageService.ts
├── hooks/             # Custom React hooks
│   └── useTranslation.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── constants/         # App constants and configurations
│   └── languages.ts
└── App.tsx           # Main application component
```

## 🛠️ Technology Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Local data persistence
- **Google Translate API** - Primary translation service
- **MyMemory API** - Fallback translation service

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/longtimenocode/VibeCode.git
   cd TranslationApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device/emulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

## 🔧 Development

### Project Structure

#### Components
- **LanguagePicker**: Dropdown for selecting target language
- **TranslationInput**: Text input area for source text
- **TranslationResult**: Displays translated text with copy functionality
- **RecentTranslations**: Shows translation history

#### Services
- **GoogleTranslateService**: Primary translation service using Google Translate API
- **MyMemoryService**: Fallback translation service
- **TranslationManager**: Orchestrates multiple translation services with fallback logic
- **StorageService**: Handles AsyncStorage operations for recent translations

#### Hooks
- **useTranslation**: Custom hook managing translation state and logic

### Adding New Translation Services

1. Create a new service class implementing the `TranslationService` interface:

```typescript
export class NewTranslationService implements TranslationService {
  async translate(text: string, targetLanguage: string): Promise<string> {
    // Implementation here
  }
}
```

2. Add the service to `TranslationManager`:

```typescript
constructor() {
  this.services = [
    new GoogleTranslateService(),
    new MyMemoryService(),
    new NewTranslationService(), // Add here
  ];
}
```

### Adding New Languages

1. Update `constants/languages.ts`:

```typescript
export const LANGUAGES: Language[] = [
  // ... existing languages
  { code: 'xx', name: 'New Language' },
];
```

## 🚀 Deployment

### Building for Production

1. **Configure app.json** with your app details
2. **Build the app**:
   ```bash
   # For iOS
   expo build:ios
   
   # For Android
   expo build:android
   ```

### Publishing to App Stores

1. **Create app store accounts** (Apple App Store, Google Play Store)
2. **Configure certificates and provisioning profiles**
3. **Submit builds** through respective app store consoles

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Manual Testing Checklist
- [ ] Text input accepts multi-line text
- [ ] Language picker shows all supported languages
- [ ] Translation works for all language pairs
- [ ] Recent translations are saved and displayed
- [ ] Copy functionality works
- [ ] Clear button resets input and output
- [ ] App handles network errors gracefully

## 🔒 API Keys and Configuration

The app currently uses free translation APIs:
- **Google Translate**: No API key required (unofficial endpoint)
- **MyMemory**: No API key required

For production use, consider:
- Google Cloud Translate API (paid, more reliable)
- Microsoft Translator API
- DeepL API

## 📈 Performance

- **Translation Speed**: ~1-3 seconds per request
- **Fallback System**: Automatic service switching on failure
- **Caching**: Recent translations stored locally
- **Memory Usage**: Optimized for mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow React Native best practices
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Google Translate API may have rate limits
- Some languages may have limited translation quality
- Network connectivity required for translation

## 🔮 Roadmap

- [ ] Offline translation support
- [ ] Voice input and output
- [ ] Camera text recognition
- [ ] Translation history export
- [ ] Custom language models
- [ ] Dark mode support
- [ ] Accessibility improvements

## 📞 Support

For support, email support@translationapp.com or create an issue in this repository.

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Author**: Lakshmanan Ramaiah 