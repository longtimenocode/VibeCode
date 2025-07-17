import { TranslationService, TranslationError } from '../types';
import { GoogleTranslateService } from './GoogleTranslateService';
import { MyMemoryService } from './MyMemoryService';

export class TranslationManager {
  private services: TranslationService[];

  constructor() {
    this.services = [
      new GoogleTranslateService(),
      new MyMemoryService(),
    ];
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    let lastError: TranslationError | null = null;

    for (const service of this.services) {
      try {
        const result = await service.translate(text, targetLanguage);
        if (result && result.trim()) {
          return result;
        }
      } catch (error: any) {
        lastError = {
          message: error.message || 'Translation service failed',
          code: error.code,
          status: error.status,
        };
        console.log(`Service failed, trying next... Error: ${lastError.message}`);
      }
    }

    throw lastError || {
      message: 'All translation services are currently unavailable. Please check your internet connection and try again.',
    };
  }

  addService(service: TranslationService): void {
    this.services.push(service);
  }

  removeService(serviceIndex: number): void {
    if (serviceIndex >= 0 && serviceIndex < this.services.length) {
      this.services.splice(serviceIndex, 1);
    }
  }
} 