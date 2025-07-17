import axios from 'axios';
import { TranslationService, TranslationError } from '../types';

export class MyMemoryService implements TranslationService {
  private readonly baseUrl = 'https://api.mymemory.translated.net/get';
  private readonly timeout = 10000;

  async translate(text: string, targetLanguage: string): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`,
        {
          timeout: this.timeout,
        }
      );

      if (response.data && response.data.responseData && response.data.responseData.translatedText) {
        return response.data.responseData.translatedText;
      } else {
        throw new Error('No translation from MyMemory');
      }
    } catch (error: any) {
      const translationError: TranslationError = {
        message: error.message || 'MyMemory service failed',
        code: error.code,
        status: error.response?.status,
      };
      throw translationError;
    }
  }
} 