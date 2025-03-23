// src/i18n-test.ts - A minimal test file
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18n = i18next.createInstance();
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          home: 'Home',
          about: 'About',
          platform: 'Platform',
          contact: 'Contact'
        },
        hero: {
          slogan: 'Leadership for Tomorrow',
          subtitle: 'Building a better future together',
          cta: 'Join the Campaign'
        },
        footer: {
          rights: 'All Rights Reserved.'
        }
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;