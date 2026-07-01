// Blog / Guides content — bilingual SEO assets.
// Bodies are Markdown strings rendered with react-markdown.
// Each post targets an informational keyword cluster that feeds the
// commercial project pages (see SEO-STRATEGY.md, section 4).

const posts = [
  {
    slug: "koh-phangan-real-estate-investment-guide",
    category: { en: "Investment Guide", he: "מדריך השקעה" },
    date: "2026-06-15",
    readingTime: 8,
    coverImage: "/images/paradise/drone-lg.jpg",
    title: {
      en: "The Complete Guide to Real Estate Investment in Koh Phangan (2026)",
      he: "המדריך המלא להשקעת נדל״ן בקופנגן (2026)",
    },
    excerpt: {
      en: "Why Koh Phangan is emerging as Thailand's next premium property market — demand drivers, project types, and what investors should know before buying.",
      he: "מדוע קופנגן הופכת לשוק הנדל״ן הפרימיום הבא של תאילנד — מנועי הביקוש, סוגי הפרויקטים, ומה שכל משקיע צריך לדעת לפני רכישה.",
    },
    body: {
      en: `Koh Phangan has long been known for its natural beauty and laid-back island lifestyle. In recent years it has quietly evolved into one of Thailand's most interesting real estate markets for international investors looking beyond the saturated hubs of Phuket and Samui.

## Why Koh Phangan, and why now

Several forces are converging at once:

- **Infrastructure maturity.** Improved ferry links, road upgrades and the nearby Samui International Airport have made the island far more accessible than a decade ago.
- **Rising tourism quality.** The island is attracting longer-staying, higher-spending visitors — wellness travellers, digital nomads and remote professionals — which supports premium rental demand.
- **Limited premium supply.** Unlike Phuket, the island still has relatively little institutional-grade, well-designed inventory. Quality projects stand out.

## What you can actually buy

Most foreign investment on the island falls into a few categories:

1. **Boutique villas** — private residences, often with pool and sea or jungle views. The strongest appeal for lifestyle buyers and premium rentals.
2. **Branded or managed residences** — units within a developed community with shared amenities and rental management.
3. **Land for development** — higher risk and complexity, suited to experienced developers.

## What to check before you commit

- **Ownership structure** — foreigners cannot own land freehold; understand the leasehold and company options (we cover this in a dedicated guide).
- **Developer track record** — completed projects, build quality and delivery history matter more than renderings.
- **Location specifics** — access, zoning, utilities and proximity to beaches and services.
- **Exit and rental strategy** — who manages the property, and what the realistic occupancy looks like.

> This article is general information, not legal or financial advice. Always work with qualified local professionals before any purchase.

At ASILA we develop premium residential projects on Koh Phangan with full involvement at every stage — from land selection to delivery. If you're exploring the island as an investment, [see our projects](/projects) or [get in touch](/contact).`,
      he: `קופנגן ידועה כבר שנים ביופי הטבעי ובאווירת האי הרגועה שלה. בשנים האחרונות היא הפכה בשקט לאחד משווקי הנדל״ן המעניינים בתאילנד עבור משקיעים בינלאומיים שמחפשים אלטרנטיבה למרכזים הרוויים של פוקט וסמוי.

## למה קופנגן, ולמה עכשיו

כמה כוחות מתכנסים יחד:

- **תשתיות שמתבגרות.** קווי מעבורת משופרים, שדרוג כבישים ושדה התעופה הבינלאומי בסמוי הסמוכה הפכו את האי לנגיש בהרבה מלפני עשור.
- **תיירות איכותית עולה.** האי מושך מבקרים ששוהים זמן רב יותר ומוציאים יותר — תיירי וולנס, נוודים דיגיטליים ואנשי מקצוע מרחוק — מה שתומך בביקוש להשכרה פרימיום.
- **היצע פרימיום מוגבל.** בניגוד לפוקט, באי עדיין יש מעט מאוד מלאי מתוכנן ואיכותי. פרויקטים טובים בולטים.

## מה אפשר באמת לרכוש

רוב ההשקעה הזרה באי מתחלקת לכמה קטגוריות:

1. **וילות בוטיק** — בתים פרטיים, לרוב עם בריכה ונוף לים או לג׳ונגל. האטרקטיביות הגבוהה ביותר לרוכשי אורח-חיים ולהשכרה פרימיום.
2. **יחידות בקהילה מנוהלת** — דירות במתחם מפותח עם שירותים משותפים וניהול השכרה.
3. **קרקע לפיתוח** — סיכון ומורכבות גבוהים יותר, מתאים ליזמים מנוסים.

## מה לבדוק לפני שמתחייבים

- **מבנה הבעלות** — זרים אינם יכולים להחזיק קרקע ב-Freehold; חשוב להבין את אפשרויות ה-Leasehold והחברה (נרחיב על כך במדריך נפרד).
- **רקורד היזם** — פרויקטים שהושלמו, איכות בנייה והיסטוריית מסירה חשובים יותר מהדמיות.
- **מאפייני המיקום** — נגישות, ייעוד קרקע, תשתיות וקרבה לחופים ולשירותים.
- **אסטרטגיית יציאה והשכרה** — מי מנהל את הנכס, ומה שיעור התפוסה הריאלי.

> מאמר זה הוא מידע כללי בלבד, ואינו ייעוץ משפטי או פיננסי. תמיד עבדו עם אנשי מקצוע מקומיים מוסמכים לפני כל רכישה.

ב-ASILA אנו מפתחים פרויקטי מגורים פרימיום בקופנגן עם מעורבות מלאה בכל שלב — מבחירת הקרקע ועד המסירה. אם אתם בוחנים את האי כהשקעה, [צפו בפרויקטים שלנו](/projects) או [צרו קשר](/contact).`,
    },
  },
  {
    slug: "foreign-property-ownership-thailand-freehold-leasehold",
    category: { en: "Legal & Ownership", he: "משפט ובעלות" },
    date: "2026-06-22",
    readingTime: 7,
    coverImage: "/images/sunset/07-lg.jpg",
    title: {
      en: "Foreign Property Ownership in Thailand: Freehold vs Leasehold Explained",
      he: "בעלות זרים על נדל״ן בתאילנד: Freehold מול Leasehold",
    },
    excerpt: {
      en: "Foreigners can't own land freehold in Thailand — but there are well-established legal structures. Here's how leasehold, condo quotas and company ownership actually work.",
      he: "זרים אינם יכולים להחזיק קרקע ב-Freehold בתאילנד — אך קיימים מבנים משפטיים מבוססים. כך עובדים בפועל Leasehold, מכסות קונדו ובעלות באמצעות חברה.",
    },
    body: {
      en: `One of the first questions every foreign buyer asks about Thailand is: *can I actually own it?* The honest answer is nuanced. Thai law restricts foreign land ownership, but it offers several legitimate, widely-used structures.

## The core rule

Foreign individuals generally **cannot own land outright (freehold)** in Thailand. They can, however, own the building or structure on the land, and there are established ways to secure long-term rights to the land itself.

## The three common routes

### 1. Leasehold
A registered lease — typically up to **30 years**, often with contractual renewal options. The lease is registered at the Land Office and gives you secure, transferable rights to use the property. This is the most common route for villas and houses.

### 2. Condominium freehold quota
Foreigners **can** own condominium units freehold, as long as foreign ownership in the building does not exceed **49%** of total floor area. This is the simplest form of true foreign ownership.

### 3. Thai company structure
A property can be held through a Thai company. This route requires genuine substance and correct structuring — it must not be a "nominee" arrangement, which is illegal. Proper legal counsel is essential here.

## Practical guidance

- Always conduct **due diligence** on the title deed (Chanote is the strongest form).
- Use an **independent Thai lawyer** — not one recommended only by the seller.
- Understand renewal terms and what happens at the end of a lease.
- Factor in transfer fees and taxes.

> This is general information, not legal advice. Thai property law is specific and changes over time — engage a qualified Thai property lawyer before signing anything.

At ASILA, ownership structure and legal clarity are part of how we guide every investor. [Talk to us](/contact) about the right structure for your goals.`,
      he: `אחת השאלות הראשונות שכל רוכש זר שואל על תאילנד היא: *האם אני באמת יכול להיות הבעלים?* התשובה הכנה מורכבת. החוק התאילנדי מגביל בעלות זרה על קרקע, אך מציע כמה מבנים לגיטימיים ונפוצים.

## הכלל המרכזי

יחידים זרים בדרך כלל **אינם יכולים להחזיק קרקע ישירות (Freehold)** בתאילנד. עם זאת, הם יכולים להחזיק את המבנה שעל הקרקע, וקיימות דרכים מבוססות להבטיח זכויות ארוכות-טווח על הקרקע עצמה.

## שלושת המסלולים הנפוצים

### 1. Leasehold (חכירה)
חכירה רשומה — בדרך כלל עד **30 שנה**, לעיתים עם אופציות חידוש חוזיות. החכירה נרשמת בלשכת רישום המקרקעין ומעניקה זכויות שימוש מאובטחות וניתנות להעברה. זהו המסלול הנפוץ ביותר לווילות ובתים.

### 2. מכסת ה-Freehold לקונדומיניום
זרים **יכולים** להחזיק יחידות קונדומיניום ב-Freehold, כל עוד הבעלות הזרה בבניין אינה עולה על **49%** משטח הרצפה הכולל. זוהי הצורה הפשוטה ביותר של בעלות זרה אמיתית.

### 3. מבנה של חברה תאילנדית
ניתן להחזיק נכס באמצעות חברה תאילנדית. מסלול זה מחייב מהות אמיתית ומבנה נכון — אסור שזה יהיה הסדר "נומינלי", שהוא בלתי חוקי. ייעוץ משפטי מתאים הוא הכרחי כאן.

## הנחיות מעשיות

- בצעו תמיד **בדיקת נאותות** על שטר הבעלות (Chanote הוא הצורה החזקה ביותר).
- היעזרו ב**עורך דין תאילנדי עצמאי** — לא כזה שהומלץ רק על ידי המוכר.
- הבינו את תנאי החידוש ומה קורה בתום תקופת החכירה.
- קחו בחשבון אגרות העברה ומיסים.

> זהו מידע כללי, לא ייעוץ משפטי. דיני המקרקעין בתאילנד ספציפיים ומשתנים עם הזמן — היוועצו בעורך דין נדל״ן תאילנדי מוסמך לפני חתימה על כל מסמך.

ב-ASILA, מבנה הבעלות והבהירות המשפטית הם חלק מהאופן שבו אנו מלווים כל משקיע. [דברו איתנו](/contact) על המבנה הנכון למטרות שלכם.`,
    },
  },
  {
    slug: "koh-phangan-vs-phuket-vs-koh-samui-where-to-invest",
    category: { en: "Market Comparison", he: "השוואת שווקים" },
    date: "2026-06-28",
    readingTime: 6,
    coverImage: "/images/coco/03-lg.jpg",
    title: {
      en: "Koh Phangan vs Phuket vs Koh Samui — Where Should You Invest?",
      he: "קופנגן מול פוקט מול קוסמוי — איפה כדאי להשקיע?",
    },
    excerpt: {
      en: "Thailand's three top island markets each serve a different investor. A practical comparison of maturity, pricing, demand and upside potential.",
      he: "שלושת שווקי האיים המובילים של תאילנד משרתים כל אחד משקיע אחר. השוואה מעשית של בשלות, תמחור, ביקוש ופוטנציאל עלייה.",
    },
    body: {
      en: `If you've decided Thailand is on your radar, the next question is *which island*. Phuket, Koh Samui and Koh Phangan each offer a distinct profile. Here's how to think about the trade-offs.

## Phuket — the mature market
Phuket is Thailand's most developed island property market: international schools, hospitals, a major airport and deep rental infrastructure. The upside is liquidity and proven demand. The trade-off is **higher entry prices** and a more saturated, competitive supply.

## Koh Samui — the established alternative
Samui sits a step behind Phuket in maturity, with its own international airport and a strong tourism base. Pricing is generally more accessible than Phuket, with solid rental demand — a balanced middle option.

## Koh Phangan — the emerging upside
Koh Phangan is earlier in its curve. It offers **lower entry points**, a distinctive natural and wellness-oriented appeal, and — crucially — limited premium supply. For investors comfortable with an emerging market, the upside potential is the highest of the three.

## Quick comparison

| Factor | Phuket | Koh Samui | Koh Phangan |
|---|---|---|---|
| Market maturity | High | Medium-High | Emerging |
| Entry price | Highest | Medium | Lowest |
| Premium supply | Saturated | Moderate | Limited |
| Upside potential | Lower | Medium | Highest |

## So where should you invest?

There is no single right answer — it depends on your risk appetite, horizon and goals. If you want liquidity and proven demand, Phuket. If you want balance, Samui. If you want **upside and a differentiated product in an emerging market**, Koh Phangan is increasingly compelling.

> General information only, not investment advice.

ASILA focuses exclusively on Koh Phangan, where we believe the combination of natural appeal and limited premium supply creates real long-term value. [Explore our projects](/projects).`,
      he: `אם החלטתם שתאילנד נמצאת על הרדאר שלכם, השאלה הבאה היא *איזה אי*. פוקט, קוסמוי וקופנגן מציעים כל אחד פרופיל שונה. כך כדאי לחשוב על ההתלבטות.

## פוקט — השוק הבשל
פוקט היא שוק הנדל״ן המפותח ביותר באיי תאילנד: בתי ספר בינלאומיים, בתי חולים, שדה תעופה מרכזי ותשתית השכרה עמוקה. היתרון הוא נזילות וביקוש מוכח. החיסרון הוא **מחירי כניסה גבוהים** והיצע רווי ותחרותי יותר.

## קוסמוי — האלטרנטיבה המבוססת
קוסמוי נמצאת צעד מאחורי פוקט בבשלות, עם שדה תעופה בינלאומי משלה ובסיס תיירותי חזק. התמחור בדרך כלל נגיש יותר מפוקט, עם ביקוש השכרה יציב — אופציה מאוזנת באמצע.

## קופנגן — פוטנציאל העלייה המתפתח
קופנגן נמצאת מוקדם יותר בעקומה. היא מציעה **נקודות כניסה נמוכות יותר**, אטרקטיביות טבעית ומוכוונת-וולנס ייחודית, ובעיקר — היצע פרימיום מוגבל. למשקיעים שנוחים עם שוק מתפתח, פוטנציאל העלייה הוא הגבוה מבין השלושה.

## השוואה מהירה

| גורם | פוקט | קוסמוי | קופנגן |
|---|---|---|---|
| בשלות השוק | גבוהה | בינונית-גבוהה | מתפתחת |
| מחיר כניסה | הגבוה ביותר | בינוני | הנמוך ביותר |
| היצע פרימיום | רווי | בינוני | מוגבל |
| פוטנציאל עלייה | נמוך יותר | בינוני | הגבוה ביותר |

## אז איפה כדאי להשקיע?

אין תשובה נכונה אחת — זה תלוי בתיאבון הסיכון, באופק ובמטרות שלכם. אם אתם רוצים נזילות וביקוש מוכח, פוקט. אם אתם רוצים איזון, קוסמוי. אם אתם רוצים **פוטנציאל עלייה ומוצר מובדל בשוק מתפתח**, קופנגן הופכת למשכנעת יותר ויותר.

> מידע כללי בלבד, לא ייעוץ השקעות.

ASILA מתמקדת באופן בלעדי בקופנגן, שם אנו מאמינים ששילוב של אטרקטיביות טבעית והיצע פרימיום מוגבל יוצר ערך אמיתי לטווח ארוך. [צפו בפרויקטים שלנו](/projects).`,
    },
  },
  {
    slug: "koh-phangan-property-roi-rental-yields",
    category: { en: "Investment Guide", he: "מדריך השקעה" },
    date: "2026-06-30",
    readingTime: 6,
    coverImage: "/images/coco/01-lg.jpg",
    title: {
      en: "ROI & Rental Yields: What to Expect from Koh Phangan Property",
      he: "תשואה ו-ROI: מה לצפות מנכס בקופנגן",
    },
    excerpt: {
      en: "How returns on a Koh Phangan property actually work — the two components of ROI, what drives rental demand, and the costs that eat into yield.",
      he: "איך באמת עובדת תשואה על נכס בקופנגן — שני מרכיבי ה-ROI, מה מניע את הביקוש להשכרה, ואילו עלויות מכרסמות בתשואה.",
    },
    body: {
      en: `Return on a holiday-market property comes from two places, and it's worth separating them before you run any numbers.

## The two components of return

1. **Rental yield** — the income the property generates, usually expressed as annual net rent divided by purchase price.
2. **Capital appreciation** — the change in the asset's value over time, realised when you sell.

In an *emerging* market like Koh Phangan, appreciation potential is often the larger part of the thesis, while a mature market like Phuket leans more on established rental yield. Neither is guaranteed.

## What drives rental demand here

- **Seasonality** — high season (roughly December–March) commands premium nightly rates; occupancy is uneven across the year.
- **Property type** — a well-designed private-pool villa in a good location rents very differently from a generic unit.
- **Management quality** — professional listing, pricing and guest management materially change realised occupancy.

## Costs that eat into yield

Gross rent is not net return. Budget for:

- Management and cleaning fees
- Maintenance and pool upkeep in a tropical climate
- Furnishing, utilities and insurance
- Applicable taxes and, at sale, transfer costs

> Any specific ROI figure depends on the individual property, management and market conditions — treat headline "guaranteed yield" claims with caution and model your own conservative case. This is general information, not investment advice.

The honest way to evaluate a project is to look at real delivery track record and the quality of the product, not a spreadsheet promise. [See ASILA's completed and in-progress projects](/projects).`,
      he: `תשואה על נכס בשוק נופש מגיעה משני מקורות, וכדאי להפריד ביניהם לפני שמריצים מספרים.

## שני מרכיבי התשואה

1. **תשואת השכרה** — ההכנסה שהנכס מייצר, בדרך כלל שכר דירה נטו שנתי חלקי מחיר הרכישה.
2. **עליית ערך** — השינוי בשווי הנכס לאורך זמן, שממומש במכירה.

בשוק *מתפתח* כמו קופנגן, פוטנציאל עליית הערך הוא לרוב החלק הגדול בתזה, בעוד ששוק בשל כמו פוקט נשען יותר על תשואת השכרה מבוססת. אף אחד מהם אינו מובטח.

## מה מניע את הביקוש להשכרה כאן

- **עונתיות** — העונה הגבוהה (בערך דצמבר–מרץ) מזכה במחירי לילה גבוהים; התפוסה אינה אחידה לאורך השנה.
- **סוג הנכס** — וילה מעוצבת עם בריכה פרטית במיקום טוב מושכרת אחרת לגמרי מיחידה גנרית.
- **איכות הניהול** — פרסום, תמחור וניהול אורחים מקצועיים משנים מהותית את התפוסה בפועל.

## עלויות שמכרסמות בתשואה

שכר דירה ברוטו אינו תשואה נטו. תכננו עבור:

- דמי ניהול וניקיון
- תחזוקה ותחזוקת בריכה באקלים טרופי
- ריהוט, שירותים וביטוח
- מיסים רלוונטיים, ובמכירה — עלויות העברה

> כל מספר ROI ספציפי תלוי בנכס, בניהול ובתנאי השוק — התייחסו בזהירות להבטחות "תשואה מובטחת" ובנו תרחיש שמרני משלכם. זהו מידע כללי, לא ייעוץ השקעות.

הדרך הכנה להעריך פרויקט היא להסתכל על רקורד מסירה אמיתי ואיכות המוצר, לא על הבטחה באקסל. [צפו בפרויקטים של ASILA](/projects).`,
    },
  },
  {
    slug: "how-to-buy-property-koh-phangan-step-by-step",
    category: { en: "Buyer's Guide", he: "מדריך רוכש" },
    date: "2026-07-01",
    readingTime: 7,
    coverImage: "/images/sunset/03-lg.jpg",
    title: {
      en: "How to Buy Property in Koh Phangan: A Step-by-Step Guide",
      he: "איך לרכוש נכס בקופנגן: מדריך שלב-אחר-שלב",
    },
    excerpt: {
      en: "From first enquiry to handover — the practical steps of buying a property on Koh Phangan, and the due diligence that protects you along the way.",
      he: "מהפנייה הראשונה ועד המסירה — השלבים המעשיים ברכישת נכס בקופנגן, ובדיקת הנאותות שמגנה עליכם בדרך.",
    },
    body: {
      en: `Buying abroad feels daunting, but the process breaks down into clear, manageable steps. Here's the typical path on Koh Phangan.

## 1. Define your goal
Lifestyle use, pure investment, or both? This shapes location, property type and ownership structure from the start.

## 2. Choose location and property
Access, proximity to beaches and services, and the developer's reputation matter more than a single rendering. Visit in person if you can.

## 3. Confirm the ownership structure
Decide between leasehold, condominium freehold quota, or a properly-structured company — see our [dedicated ownership guide](/blog/foreign-property-ownership-thailand-freehold-leasehold). Get independent legal advice.

## 4. Reservation and due diligence
A reservation agreement typically holds the unit while your lawyer verifies the **title deed**, permits, and the developer's standing. Never skip this.

## 5. Contract and payments
Review the sale/lease contract carefully — payment schedule, delivery date, specifications and penalties. For off-plan, understand exactly what's guaranteed and when.

## 6. Transfer and handover
Final payment, registration at the Land Office, and handover with a snagging inspection. Keep every document.

## The one rule that protects you
Use an **independent Thai lawyer** you engaged yourself — not one provided solely by the seller. Good due diligence is cheap relative to the purchase.

> This is a general overview, not legal advice. Thai property procedures are specific — always work with qualified local professionals.

ASILA guides investors through each of these steps with full involvement. [Get in touch](/contact) to start the conversation.`,
      he: `רכישה בחו״ל נשמעת מאיימת, אבל התהליך מתפרק לשלבים ברורים ונשלטים. הנה המסלול הטיפוסי בקופנגן.

## 1. הגדירו את המטרה
שימוש אישי, השקעה טהורה, או שניהם? זה מעצב מההתחלה את המיקום, סוג הנכס ומבנה הבעלות.

## 2. בחרו מיקום ונכס
נגישות, קרבה לחופים ולשירותים, והמוניטין של היזם חשובים יותר מהדמיה אחת. בקרו פיזית אם אפשר.

## 3. אשרו את מבנה הבעלות
בחרו בין Leasehold, מכסת Freehold לקונדו, או חברה בנויה כהלכה — ראו את [מדריך הבעלות הייעודי שלנו](/blog/foreign-property-ownership-thailand-freehold-leasehold). קבלו ייעוץ משפטי עצמאי.

## 4. הזמנה ובדיקת נאותות
הסכם הזמנה בדרך כלל שומר את היחידה בזמן שעורך הדין שלכם מאמת את **שטר הבעלות**, ההיתרים ומעמד היזם. אל תדלגו על זה.

## 5. חוזה ותשלומים
בדקו את חוזה המכר/החכירה בקפידה — לוח תשלומים, מועד מסירה, מפרט וקנסות. בפרויקט על הנייר — הבינו בדיוק מה מובטח ומתי.

## 6. העברה ומסירה
תשלום סופי, רישום בלשכת המקרקעין, ומסירה עם בדיקת ליקויים. שמרו כל מסמך.

## הכלל האחד שמגן עליכם
היעזרו ב**עורך דין תאילנדי עצמאי** שאתם שכרתם — לא כזה שסופק רק על ידי המוכר. בדיקת נאותות טובה זולה יחסית לרכישה.

> זו סקירה כללית, לא ייעוץ משפטי. הליכי הנדל״ן בתאילנד ספציפיים — תמיד עבדו עם אנשי מקצוע מקומיים מוסמכים.

ASILA מלווה משקיעים בכל אחד מהשלבים האלה עם מעורבות מלאה. [צרו קשר](/contact) כדי להתחיל.`,
    },
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export default posts;
