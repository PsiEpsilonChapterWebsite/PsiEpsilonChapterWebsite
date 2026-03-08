import HttpApi from "i18next-http-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};
i18n
  .use(HttpApi) // to load translations using http requests
  .use(initReactI18next) // binds react-i18next to the core
  .init({
    resources,
    lng: "en",
    fallbackLng: ["en", "es"],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
