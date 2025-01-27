import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'es', // Idioma inicial
        fallbackLng: 'es', // Idioma de respaldo
        backend: {
            loadPath: '/locale/{{lng}}/{{ns}}.json', // Ruta para cargar archivos de traducción
        },
        ns: ['common', 'footer'], // Lista de namespaces
        defaultNS: 'common', // Namespace por defecto
    });

export default i18n;
