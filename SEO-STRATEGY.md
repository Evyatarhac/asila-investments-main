# אסטרטגיית SEO — ASILA Investments

> חברת יזמות נדל״ן יוקרתי באי קופנגן, תאילנד. React + Vite (base44).
> דומיין קנוני שנבחר: **https://asila.co.il** (תואם ל-NAP: `office@asila.co.il` + טלפון ישראלי).
> **שפת SEO: אנגלית בלבד** (החלטה). מתג ה-HE/EN נשאר לנוחות משתמשים, אך גוגל מאנדקס את הגרסה האנגלית בלבד — canonical, hreflang ו-Schema באנגלית בלבד.
> מסמך זה הוא מפת הדרכים. עודכן: 2026-07-01.

---

## 1. עוגני ה-SEO (Keyword Strategy)

### קהל יעד עיקרי: משקיעי נדל״ן ישראלים + בינלאומיים המחפשים נכסים בתאילנד.

| אשכול (Cluster) | מילות מפתח ראשיות (HE) | מילות מפתח ראשיות (EN) | כוונת חיפוש |
|---|---|---|---|
| **ליבה — מותג** | אסילה השקעות, asila invest | ASILA Investments | Navigational |
| **השקעה גיאוגרפית** | השקעת נדל״ן בתאילנד, נדל״ן קופנגן, השקעה בקופנגן | Koh Phangan real estate, Thailand property investment | Commercial |
| **מוצר** | וילות למכירה בתאילנד, דירות נופש קופנגן | luxury villas Koh Phangan, beachfront property Thailand | Transactional |
| **מידע (TOFU)** | האם כדאי להשקיע בנדל״ן בתאילנד, מיסוי נדל״ן תאילנד, בעלות זרים על נכס בתאילנד | how to buy property in Thailand, foreign ownership Thailand | Informational |
| **פרויקטים** | Paradise / Sunset / Coco / Arias Koh Phangan | (שמות פרויקטים) | Navigational/Brand |

**עיקרון:** דפי הליבה (בית/פרויקטים) מכוונים למילים מסחריות; את המילים האינפורמטיביות (TOFU) כובשים בעזרת **בלוג/מדריכים** (ראו סעיף 4) — שם נמצא נפח החיפוש הגדול ביותר ושם נבנית סמכות נושאית (Topical Authority).

---

## 2. מצב טכני — מה כבר בוצע ✅

| # | פעולה | קובץ | ערך |
|---|------|------|-----|
| 1 | `robots.txt` עם הפניה ל-sitemap | `public/robots.txt` | זחילה מודרכת |
| 2 | `sitemap.xml` עם כל הדפים + image sitemap | `public/sitemap.xml` | אינדוקס מלא |
| 3 | תיקון אי-התאמת דומיין (canonical+Schema=`asila.co.il`) | `index.html` | מניעת פיצול authority |
| 4 | Schema מועשר: RealEstateAgent + WebSite + Founder + geo + sameAs | `index.html` | Rich results, Knowledge Graph |
| 5 | geo-targeting (geo.region / position / ICBM) | `index.html` | רלוונטיות מקומית |
| 6 | `<noscript>` עם תוכן זחיל | `index.html` | גיבוי לזחלן לפני רינדור JS |
| 7 | Web App Manifest | `public/site.webmanifest` | PWA / Core Web Vitals |
| 8 | **Meta דינמי per-page** (title/description/canonical/OG) | `src/lib/useSEO.js` + כל הדפים | בידול בתוצאות החיפוש |
| 9 | Structured Data per-project (Residence + BreadcrumbList) | `ProjectDetail.jsx` | Rich snippets לפרויקטים |
| 10 | CollectionPage Schema לדף הפרויקטים | `Projects.jsx` | הבנת מבנה האתר |
| 11 | תיקון קישורי Instagram שבורים (`/asila.invest`) | Footer/About/Contact | sameAs תקין + UX |
| 12 | החלפת og:image מצילום WhatsApp לתמונת פרויקט | `index.html` + hook | תצוגה חברתית |

---

## 3. מצב טכני — מה נותר (לפי עדיפות)

### ✅ א. Prerendering — **בוצע ואומת**

האתר הוא SPA — ה-HTML הראשוני היה ריק וכל התוכן רונדר ב-JavaScript. **זו הייתה המגבלה מספר 1.**
הפתרון שמומש: שלב `postbuild` שמרנדר כל route ב-Chromium headless מודרני (puppeteer) ושומר `index.html` סטטי מלא לכל נתיב.

- **קבצים:** [`scripts/prerender.mjs`](scripts/prerender.mjs) + `postbuild` ב-`package.json` + `build.target: es2019` ב-`vite.config.js`.
- **תוצאה מאומתת:** 12 routes מקבלים HTML סטטי עם תוכן מלא, title/description/canonical ייחודיים ו-JSON-LD — עוד לפני שה-JS רץ.
- **בטיחות:** אם ל-build של base44 אין דפדפן headless — השלב מדלג בחן (exit 0) והאתר עדיין נפרס כ-SPA רגיל (אפס רגרסיה).

> **⚠️ דרישת deploy קריטית (פעולה של base44/הלקוח):** כדי שהזחלנים יקבלו את ה-HTML הסטטי, האירוח חייב:
> 1. להריץ את `npm run build` **המלא** (כולל `postbuild`) בסביבה עם Chromium — לא רק `vite build`.
> 2. להגיש את ה-`index.html` המקונן לכל נתיב (למשל `/blog/x` → `/blog/x/index.html`) לפני fallback ל-SPA.
>
> יש לוודא ש-base44 עומד בשני התנאים; אם ה-build שלהם מריץ רק `vite build`, יש להצביע אותו על `npm run build`.

### ✅ ב. URLs דו-לשוניים — **בוטל בהחלטה (אנגלית בלבד)**

הוחלט על **SEO באנגלית בלבד**, ולכן אין צורך ב-refactor של URLs לפי שפה. נוקו כל הסיגנלים הדו-לשוניים מ-`index.html` (hreflang, `og:locale:alternate`, `knowsLanguage`/`inLanguage`) כדי לא לשלוח לגוגל מסר מעורב. ה-prerender מרנדר את הגרסה האנגלית (ברירת המחדל). מתג ה-HE/EN נשאר פעיל לנוחות משתמשים בלבד.

*אם בעתיד ירצו לכבוש גם חיפושים בעברית — יש להחזיר את הנושא (path-prefix `/he/` + hreflang) כפרויקט נפרד.*
היום השפה מתחלפת ב-`localStorage` על אותו URL — לכן גוגל יכול לאנדקס **רק גרסה אחת** (האנגלית, ברירת המחדל). כדי לכבוש מילות מפתח בעברית צריך URL ייחודי לעברית:
- `asila.co.il/he/...` (תיקיית שפה) — מומלץ, או
- `asila.co.il/?lang=he`.
לאחר מכן: hreflang אמיתי בין הגרסאות + עדכון ה-sitemap עם `<xhtml:link rel="alternate" hreflang="...">`.
*כרגע ה-hreflang ב-`index.html` מצביע על אותו URL — placeholder עד למימוש זה.*

### ✅ אופטימיזציית מדיה — **בוצע ואומת**

- **וידאו ההירו:** `hero.mov` (41MB) → `hero.mp4` (7.7MB, ‎-81%) + `hero-poster.jpg` + `preload="metadata"`. עודכן ב-Home ו-HomeExperience.
- **תמונות:** כל 33 התמונות → WebP ≤1920px (‏PNG של ~40MB → ~0.5MB, ‎-99%). `projects.js`, `posts.js` וכל ה-`<img>` הופנו ל-WebP + `loading="lazy"` + מידות.
- **alt-text:** שופר לתיאורי ועשיר-מילות-מפתח.
- **סקריפט:** [`scripts/optimize-media.sh`](scripts/optimize-media.sh) (ffmpeg).

> **⚠️ פעולה מומלצת (דורשת אישור — הרסני):** קבצי המקור המקוריים (`hero.mov` + ה-PNG של 40MB) עדיין ב-`public/` ומנופחים את ה-deploy ל-~547MB למרות שאף אחד לא מפנה אליהם. יש להעביר אותם מחוץ ל-`public/` (או למחוק) כדי לצמצם דרסטית את גודל ה-deploy.

### 🟠 גבוה — נותר

- **OG image ייעודי 1200×630** — תמונת שיתוף ממותגת (כרגע cover.webp של פרויקט).
- **Google Search Console + Bing Webmaster** — אימות הדומיין והגשת ה-sitemap (פעולה ידנית של הלקוח).
- **Google Business Profile** — קריטי ל-SEO מקומי של עסק נדל״ן.
- **`srcset` רספונסיבי** — הגשת גדלים שונים לפי מכשיר (שיפור נוסף מעבר ל-WebP).

### 🟡 בינוני

- **דף 404 מותאם** עם קישורים פנימיים במקום "Project not found." פשוט.
- **Core Web Vitals audit** (Lighthouse) — אחרי המרת הווידאו והתמונות.
- **Internal linking** — קישורים צולבים בין פרויקטים ("פרויקטים נוספים") להגדלת עומק הזחילה.
- **Analytics** — חיבור GA4 / Search Console למדידת תנועה אורגנית.

---

## 4. אסטרטגיית תוכן (Content / Topical Authority)

נפח החיפוש המסחרי על שמות הפרויקטים זעום. הצמיחה האורגנית האמיתית תגיע מכיבוש שאלות שמשקיעים שואלים **לפני** שהם מכירים את המותג. מומלץ להקים מדור **בלוג/מדריכים** (`/blog` או `/guides`) ולכתוב:

1. **"המדריך המלא להשקעת נדל״ן בקופנגן 2026"** — מאמר עוגן (pillar), 1500+ מילים.
2. **"בעלות זרים על נדל״ן בתאילנד — מה צריך לדעת"** (Leasehold vs Freehold, חברה תאילנדית).
3. **"מיסוי והחזר השקעה (ROI) על נכסי נופש בתאילנד"**.
4. **"קופנגן מול פוקט מול קוסמוי — איפה כדאי להשקיע"**.
5. **Case study לכל פרויקט שהושלם** (Paradise) — תהליך, תוצאה, תשואה.

כל מאמר → קישור פנימי לדפי הפרויקטים (העברת authority לדפים המסחריים). זו הדרך לבנות Topical Authority בנישת "השקעות נדל״ן בתאילנד".

---

## 5. Off-Page / סמכות

- **Google Business Profile** + ביקורות.
- **רישום בדירקטוריות נדל״ן** (ישראליות ובינלאומיות) עם NAP אחיד.
- **תוכן ב-Instagram/יוטיוב** (drone footage קיים) → backlinks ו-brand searches.
- **PR / שיתופי פעולה** עם בלוגים על רילוקיישן/השקעות בתאילנד.

---

## 6. מדידה (KPIs)

| מדד | כלי | יעד ראשוני (3–6 ח׳) |
|---|---|---|
| Impressions אורגניים | Search Console | מגמת עלייה |
| דפים מאונדקסים | Search Console | 8/8 הדפים |
| Core Web Vitals | Lighthouse / CrUX | כל המדדים ירוקים |
| לידים אורגניים | GA4 + LeadForm | מעקב המרות |
| דירוג למילות מפתח ליבה | Search Console | טופ 10 למותג, טופ 30 למסחרי |

---

## סדר פעולות מומלץ (Roadmap)

1. ✅ **תשתית טכנית** (בוצע — סעיף 2).
2. ✅ **Prerendering** (בוצע ואומת — סעיף 3א) — הפותח את כל שאר ה-SEO.
3. ✅ **הקמת בלוג + 5 מאמרי עוגן** (בוצע — סעיף 4).
4. ✅ **החלטת שפה: אנגלית בלבד** (סעיף 3ב — סיגנלים דו-לשוניים נוקו).
5. ✅ **אופטימיזציית מדיה** (וידאו + WebP + alt — סעיף 3).
6. ⬜ **הפעלת ה-prerender ב-deploy של base44** + ניקוי קבצי מקור כבדים — **הבא בתור**.
7. ⬜ אימות Search Console + הגשת sitemap + GA4.
8. ⬜ Google Business Profile + off-page (סעיף 5).
