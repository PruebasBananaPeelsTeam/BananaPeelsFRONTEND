import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './es.json'
import en from './en.json';

i18n
    .use(LanguageDetector) // detecta automaticamente el idioma del navegador
    .use(initReactI18next) // integracion con react 
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
        fallbackLng: 'en', // idioma por defecto, si no encuentra el idioma sera el ingles
        interpolation: {
            escapeValue: false, // Protege de inyecccion de codigo malicioso, pero como react ya lo haces lo iniciamos en false
        },

        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],// orden de deteccion del idioma
            caches: ['localStorage', 'cookie'], // donde guardar el idioma
        },
    })

    export default i18n