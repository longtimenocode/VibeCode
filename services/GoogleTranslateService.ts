import axios from 'axios';
import { TranslationService, TranslationError } from '../types';

export class GoogleTranslateService implements TranslationService {
  private readonly baseUrl = 'https://translate.googleapis.com/translate_a/single';
  private readonly timeout = 10000;

  async translate(text: string, targetLanguage: string): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`,
        {
          timeout: this.timeout,
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
        
        return translatedSegments.join(' ');
      } else {
        throw new Error('No translation from Google Translate');
      }
    } catch (error: any) {
      const translationError: TranslationError = {
        message: error.message || 'Google Translate service failed',
        code: error.code,
        status: error.response?.status,
      };
      throw translationError;
    }
  }
} 