const projects = [
  {
    slug: "paradise",
    name: "PARADISE",
    status: "completed",
    location: "Thailand",
    year: "2023",
    heroImage: null,
    gallery: [],
    shortDescription: {
      en: "A landmark residential development redefining tropical living.",
      he: "פרויקט מגורים מכונן המגדיר מחדש את החיים הטרופיים.",
    },
    fullDescription: {
      en: "PARADISE represents ASILA's founding vision — a residential development that seamlessly integrates luxury living with the natural beauty of Thailand. Every detail, from the architectural lines to the lush landscaping, was designed to create an experience that feels both exclusive and effortless.\n\nCompleted in 2023, the project stands as proof that premium development in Southeast Asia doesn't have to compromise on quality or design integrity.",
      he: "PARADISE מייצג את החזון המייסד של ASILA — פרויקט מגורים המשלב בצורה חלקה מגורי יוקרה עם היופי הטבעי של תאילנד. כל פרט, מקווי האדריכלות ועד הגינון השופע, תוכנן ליצור חוויה שמרגישה גם בלעדית וגם טבעית.\n\nהפרויקט הושלם ב-2023 ומהווה הוכחה שפיתוח פרימיום בדרום-מזרח אסיה לא חייב להתפשר על איכות או שלמות עיצובית.",
    },
  },
  {
    slug: "sunset",
    name: "SUNSET",
    status: "completed",
    location: "Thailand",
    year: "2024",
    heroImage: null,
    gallery: [],
    shortDescription: {
      en: "Premium villas crafted to frame the perfect golden hour.",
      he: "וילות פרימיום שתוכננו למסגר את שעת הזהב המושלמת.",
    },
    fullDescription: {
      en: "SUNSET is a collection of premium villas, each oriented and designed to capture Thailand's legendary sunsets. The project pushes the boundaries of residential architecture, with floor-to-ceiling glass, infinity-edge pools, and open-plan living spaces that blur the line between indoors and out.\n\nDelivered in 2024, SUNSET established ASILA's reputation for creating properties that are as much about experience as they are about investment.",
      he: "SUNSET הוא אוסף של וילות פרימיום, כל אחת מכוונת ומעוצבת ללכוד את השקיעות האגדיות של תאילנד. הפרויקט דוחף את גבולות האדריכלות הביתית, עם זכוכית מרצפה לתקרה, בריכות אינסוף ומרחבי מגורים פתוחים שמטשטשים את הגבול בין פנים לחוץ.\n\nנמסר ב-2024, SUNSET ביסס את המוניטין של ASILA ביצירת נכסים שהם חוויה לא פחות מהשקעה.",
    },
  },
  {
    slug: "coco",
    name: "COCO",
    status: "in-progress",
    location: "Thailand",
    year: "2025",
    heroImage: null,
    gallery: [],
    shortDescription: {
      en: "A boutique beachfront project blending nature and modern design.",
      he: "פרויקט בוטיק על חוף הים המשלב טבע ועיצוב מודרני.",
    },
    fullDescription: {
      en: "COCO is ASILA's most intimate project to date — a boutique beachfront development where every unit has direct access to white sand and crystal waters. The design philosophy centers on living with nature, not despite it, using sustainable materials and biophilic architecture.\n\nCurrently under construction, COCO represents the next evolution in ASILA's design language — quieter, more refined, and deeply connected to its environment.",
      he: "COCO הוא הפרויקט האינטימי ביותר של ASILA עד כה — פיתוח בוטיק על חוף הים שבו לכל יחידה גישה ישירה לחול לבן ומים צלולים. פילוסופיית העיצוב מתמקדת בחיים עם הטבע, לא למרותו, תוך שימוש בחומרים בני-קיימא ואדריכלות ביופילית.\n\nכיום בבנייה, COCO מייצג את האבולוציה הבאה בשפת העיצוב של ASILA — שקטה יותר, מעודנת יותר ומחוברת עמוקות לסביבתה.",
    },
  },
  {
    slug: "arias",
    name: "ARIAS",
    status: "upcoming",
    location: "Thailand",
    year: "2026",
    heroImage: null,
    gallery: [],
    shortDescription: {
      en: "Our most ambitious development — a new standard for luxury living.",
      he: "הפרויקט השאפתני ביותר שלנו — סטנדרט חדש למגורי יוקרה.",
    },
    fullDescription: {
      en: "ARIAS is ASILA's most ambitious undertaking — a mixed-use development that will set a new benchmark for luxury living in Southeast Asia. Combining residential, hospitality, and lifestyle amenities in a single masterplanned community, ARIAS represents everything we've learned and everything we aspire to build.\n\nLaunching in 2026, this project will redefine what's possible when vision, capital, and craftsmanship converge.",
      he: "ARIAS הוא המיזם השאפתני ביותר של ASILA — פיתוח משולב שייקבע אמת מידה חדשה למגורי יוקרה בדרום-מזרח אסיה. ARIAS משלב מגורים, אירוח ומתקני פנאי בקהילה אחת מתוכננת היטב, ומייצג את כל מה שלמדנו ואת כל מה ששואפים לבנות.\n\nצפוי להשקה ב-2026, פרויקט זה יגדיר מחדש את האפשרי כשחזון, הון ואומנות מתמזגים.",
    },
  },
];

export function getStatusLabel(status, lang) {
  const labels = {
    en: { completed: "Completed", "in-progress": "In Progress", upcoming: "Upcoming" },
    he: { completed: "הושלם", "in-progress": "בביצוע", upcoming: "בקרוב" },
  };
  return labels[lang]?.[status] || status;
}

export default projects;