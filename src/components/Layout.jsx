import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useLanguage from "../lib/useLanguage";

export default function Layout() {
  const { lang, t, toggleLang, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-asila-dark">
      <Navbar t={t} lang={lang} toggleLang={toggleLang} />
      <main className="flex-1">
        <Outlet context={{ t, lang, isRTL, toggleLang }} />
      </main>
      <Footer t={t} />
    </div>
  );
}