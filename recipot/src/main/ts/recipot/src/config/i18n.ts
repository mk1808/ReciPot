import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import translateEN from "../data/translateEN.json"
import translatePL from "../data/translatePL.json"

const languages = ["en", "pl"];

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translateEN },
            pl: { translation: translatePL }
        },
        lng: "pl",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });
i18n.changeLanguage("pl");

export function useLangPL() {
    i18n.changeLanguage("pl");
}

export function useLangEN() {
    i18n.changeLanguage("en");
}

export default i18n;


