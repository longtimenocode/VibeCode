export interface Language {
  code: string;
  name: string;
}

export interface TranslationResult {
  original: string;
  translated: string;
  language: string;
  timestamp: number;
}

export interface TranslationService {
  translate(text: string, targetLanguage: string): Promise<string>;
}

export interface TranslationError {
  message: string;
  code?: string;
  status?: number;
} 