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
i18n.changeLanguage("pl");

function setDefaultLanguage() {
    var selectedLang: any = localStorage.getItem("selectedLang");
    if (selectedLang) {
        switch (selectedLang) {
            case 'pl': setLangPL(); break;
            case 'en': setLangEN(); break;
        }
    }
}
setDefaultLanguage();

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

export default i18n;


