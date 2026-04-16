import { useState, useEffect, useCallback } from "react";
import translations from "./translations";

const LANG_KEY = "asila-lang";

export default function useLanguage() {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem(LANG_KEY) || "en";
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "he" : "en");
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  const isRTL = lang === "he";

  return { lang, setLang, toggleLang, t, isRTL };
}