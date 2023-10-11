import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translateEN from "../data/translateEN.json"
import translatePL from "../data/translatePL.json"

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

function setDefaultLanguage() {
    var selectedLang: any = localStorage.getItem("selectedLang");
    if (selectedLang) {
        switch (selectedLang) {
            case 'pl': setLangPL(); break;
            case 'en': setLangEN(); break;
        }
    }
}

function setLang(lang: string) {
    i18n.changeLanguage(lang);
    localStorage.setItem("selectedLang", lang)
}

export function setLangPL() {
    setLang("pl");
}

export function setLangEN() {
    setLang("en");
}

i18n.changeLanguage("pl");
setDefaultLanguage();

export default i18n;


