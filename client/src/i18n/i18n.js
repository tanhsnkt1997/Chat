import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "vi", //language to use if translations in user language are not available
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    lng: "en" | "vi",
    resources: {
      en: {
        translation: {
          profile: "Profile",
          changeLanguage: "Change Language",
          name: "Name",
          address: "Address",
          chats: "Chats",
        },
      },
      vi: {
        translation: {
          profile: "Hồ sơ",
          changeLanguage: "Đổi ngôn ngữ",
          name: "Tên",
          address: "Đại chỉ",
          chats: "Trò chuyện",
        },
      },
    },
  });

export default i18n;
