import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LOCAL_LNG } from '../core/constants';
import translationEN from '../locales/en_US/index.json';
import translationKR from '../locales/ko_KR/index.json';

const resources = {
  en: { translation: translationEN },
  kr: { translation: translationKR },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem(LOCAL_LNG) || 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
