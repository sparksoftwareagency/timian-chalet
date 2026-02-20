export type Language = "en" | "ro" | "hu";

type T = Record<Language, string>;
type TLines = Record<Language, string[]>;

export const tr = {
  // ─── Navigation & Global ───────────────────────────
  nav: {
    bookNow: { en: "book now", ro: "rezervă", hu: "foglalás" } as T,
  },

  loading: {
    text: {
      en: "Loading your mountain retreat...",
      ro: "Se încarcă refugiul tău montan...",
      hu: "Hegyi menedéked betöltése...",
    } as T,
  },

  // ─── Hero ──────────────────────────────────────────
  hero: {
    discover: { en: "DISCOVER", ro: "DESCOPERĂ", hu: "FEDEZD FEL" } as T,
  },

  // ─── Landing (tagline section) ─────────────────────
  landing: {
    taglines: {
      en: ["BECAUSE", "YOU", "DESERVE", "IT"],
      ro: ["PENTRU", "CĂ", "MERIȚI", "ASTA"],
      hu: ["MERT", "NEKED", "IS", "JÁR"],
    } as TLines,
  },

  // ─── About / Features ─────────────────────────────
  about: {
    welcomeTitle: {
      en: "Welcome to Timian Chalet",
      ro: "Bine ați venit la Timian Chalet",
      hu: "Üdvözöljük a Timian Chalet-ban",
    } as T,
    welcomeDesc: {
      en: "Nestled in the heart of the Carpathian Mountains, Timian Chalet offers an authentic Transylvanian escape where traditional Romanian craftsmanship meets rustic luxury.",
      ro: "Situat în inima Munților Carpați, Timian Chalet oferă o evadare autentică transilvăneană unde meșteșugul tradițional românesc întâlnește luxul rustic.",
      hu: "A Kárpátok szívében megbújva a Timian Chalet autentikus erdélyi menedéket kínál, ahol a hagyományos kézművesség találkozik a rusztikus luxussal.",
    } as T,

    locationLabel: { en: "The Location", ro: "Locația", hu: "Helyszín" } as T,
    locationTitle: { en: "Carpathian\nRetreat", ro: "Refugiu în\nCarpați", hu: "Kárpáti\nMenedék" } as T,
    locationDesc: {
      en: "Surrounded by majestic peaks where ancient forests meet pristine wilderness.",
      ro: "Înconjurat de vârfuri maiestuoase unde pădurile străvechi întâlnesc natura sălbatică.",
      hu: "Fenséges csúcsok ölelésében, ahol az ősi erdők találkoznak az érintetlen vadonnal.",
    } as T,

    experienceLabel: { en: "The Experience", ro: "Experiența", hu: "Az Élmény" } as T,
    experienceTitle: { en: "Authentic\nHospitality", ro: "Ospitalitate\nAutentică", hu: "Autentikus\nVendégszeretet" } as T,
    experienceDesc: {
      en: "Genuine Romanian warmth where every guest becomes family.",
      ro: "Căldura autentică românească unde fiecare oaspete devine familie.",
      hu: "Valódi vendégszeretet, ahol minden vendég a család részévé válik.",
    } as T,

    craftsmanshipLabel: { en: "The Craftsmanship", ro: "Meșteșugul", hu: "A Mesterség" } as T,
    craftsmanshipTitle: { en: "Rustic\nLuxury", ro: "Lux\nRustic", hu: "Rusztikus\nLuxus" } as T,
    craftsmanshipDesc: {
      en: "Hand-carved interiors blending artisanal heritage with modern comfort.",
      ro: "Interioare sculptate manual care îmbină moștenirea artizanală cu confortul modern.",
      hu: "Kézzel faragott belsőterek, ahol a kézműves hagyomány találkozik a modern kényelemmel.",
    } as T,

    statEstablished: { en: "ESTABLISHED", ro: "FONDAT", hu: "ALAPÍTVA" } as T,
    statRooms: { en: "LUXURY ROOMS", ro: "CAMERE DE LUX", hu: "LUXUS SZOBÁK" } as T,
    statSatisfaction: { en: "GUEST SATISFACTION", ro: "SATISFACȚIA OASPEȚILOR", hu: "VENDÉG ELÉGEDETTSÉG" } as T,
    statConcierge: { en: "CONCIERGE SERVICE", ro: "SERVICIU CONCIERGE", hu: "CONCIERGE SZOLGÁLTATÁS" } as T,
  },

  // ─── Nature reveal section ─────────────────────────
  nature: {
    label: { en: "The Location", ro: "Locația", hu: "Helyszín" } as T,
    title: { en: "Surrounding\nNature", ro: "Natură\nÎnconjurătoare", hu: "Környező\nTermészet" } as T,
    overlayTitle: { en: "Surrounding Nature", ro: "Natură Înconjurătoare", hu: "Környező Természet" } as T,
    desc: {
      en: "Immerse yourself in the breathtaking alpine landscape where pristine peaks meet endless skies. Our chalet is nestled in the heart of untouched wilderness, offering you a sanctuary of natural beauty.",
      ro: "Cufundă-te în peisajul alpin uimitor unde vârfurile neprihănite întâlnesc cerul nesfârșit. Cabana noastră este situată în inima naturii sălbatice, oferindu-vă un sanctuar de frumusețe naturală.",
      hu: "Merülj el a lélegzetelállító alpesi tájban, ahol az érintetlen csúcsok találkoznak a végtelen égbolttal. Chaletünk az érintetlen vadon szívében helyezkedik el, a természetes szépség szentélyét kínálva.",
    } as T,
  },

  // ─── Chalet building reveal section ────────────────
  chalet: {
    label: { en: "The Architecture", ro: "Arhitectura", hu: "Építészet" } as T,
    title: { en: "Chalet\nBuilding", ro: "Clădirea\nCabanei", hu: "A Chalet\nÉpülete" } as T,
    overlayTitle: { en: "Chalet Building", ro: "Clădirea Cabanei", hu: "A Chalet Épülete" } as T,
    desc: {
      en: "Traditional alpine architecture meets contemporary luxury. Our meticulously restored chalet combines authentic wooden craftsmanship with modern amenities, creating an atmosphere of timeless elegance.",
      ro: "Arhitectura alpină tradițională întâlnește luxul contemporan. Cabana noastră restaurată cu meticulozitate combină meșteșugul autentic al lemnului cu facilitățile moderne, creând o atmosferă de eleganță atemporală.",
      hu: "A hagyományos alpesi építészet találkozik a kortárs luxussal. Gondosan felújított chaletünk autentikus famunkát ötvöz modern kényelemmel, időtlen eleganciát teremtve.",
    } as T,
  },

  // ─── Fullscreen Menu ────────────────────────────────
  menu: {
    press: { en: "Press", ro: "Presă", hu: "Sajtó" } as T,
    contact: { en: "Contact", ro: "Contact", hu: "Kapcsolat" } as T,
    privacyPolicy: { en: "Privacy Policy", ro: "Politica de Confidențialitate", hu: "Adatvédelmi Irányelvek" } as T,

    aboutHotel: { en: "About the hotel", ro: "Despre hotel", hu: "A hotelről" } as T,
    story: { en: "Story", ro: "Povestea", hu: "Történet" } as T,
    location: { en: "Location", ro: "Locație", hu: "Helyszín" } as T,
    shop: { en: "Shop", ro: "Magazin", hu: "Bolt" } as T,

    rooms: { en: "Rooms", ro: "Camere", hu: "Szobák" } as T,
    grove: { en: "Grove", ro: "Grove", hu: "Grove" } as T,
    leafage: { en: "Leafage", ro: "Leafage", hu: "Leafage" } as T,
    thyme: { en: "Thyme", ro: "Thyme", hu: "Thyme" } as T,
    cone: { en: "Cone", ro: "Cone", hu: "Cone" } as T,
    lichen: { en: "Lichen", ro: "Lichen", hu: "Lichen" } as T,
    mineral: { en: "Mineral", ro: "Mineral", hu: "Mineral" } as T,
    dawn: { en: "Dawn", ro: "Dawn", hu: "Dawn" } as T,
    treasure: { en: "Treasure", ro: "Treasure", hu: "Treasure" } as T,
    miniChalet: { en: "Mini Chalet", ro: "Mini Chalet", hu: "Mini Chalet" } as T,

    culinary: { en: "Culinary", ro: "Culinar", hu: "Gasztronómia" } as T,
    restaurant: { en: "Restaurant", ro: "Restaurant", hu: "Étterem" } as T,
    localCheese: { en: "Local Cheese", ro: "Brânză Locală", hu: "Helyi Sajt" } as T,

    experiences: { en: "Experiences", ro: "Experiențe", hu: "Élmények" } as T,
    wellness: { en: "Wellness", ro: "Wellness", hu: "Wellness" } as T,
    sports: { en: "Sports", ro: "Sporturi", hu: "Sportok" } as T,
    buggyTour: { en: "Buggy Tour", ro: "Tur cu Buggy", hu: "Buggy Túra" } as T,
    attractions: { en: "Attractions", ro: "Atracții", hu: "Látnivalók" } as T,
  },

  // ─── Footer ────────────────────────────────────────
  footer: {
    description: {
      en: "Where luxury meets nature in perfect harmony. Experience the Carpathian Mountains like never before.",
      ro: "Unde luxul întâlnește natura în armonie perfectă. Experimentați Munții Carpați ca niciodată.",
      hu: "Ahol a luxus tökéletes harmóniában találkozik a természettel. Tapasztalja meg a Kárpátokat, mint még soha.",
    } as T,
    quickLinks: { en: "QUICK LINKS", ro: "LINKURI RAPIDE", hu: "GYORS LINKEK" } as T,
    roomsSuites: { en: "Rooms & Suites", ro: "Camere și Suite", hu: "Szobák és Lakosztályok" } as T,
    culinary: { en: "Culinary", ro: "Culinar", hu: "Gasztronómia" } as T,
    experiences: { en: "Experiences", ro: "Experiențe", hu: "Élmények" } as T,
    contactUs: { en: "Contact Us", ro: "Contactați-ne", hu: "Kapcsolat" } as T,
    services: { en: "SERVICES", ro: "SERVICII", hu: "SZOLGÁLTATÁSOK" } as T,
    luxuryAccom: { en: "Luxury Accommodations", ro: "Cazare de Lux", hu: "Luxus Szállás" } as T,
    fineDining: { en: "Fine Dining Restaurant", ro: "Restaurant Fine Dining", hu: "Ínyenc Étterem" } as T,
    spaWellness: { en: "Spa & Wellness", ro: "Spa și Wellness", hu: "Spa és Wellness" } as T,
    mountainAct: { en: "Mountain Activities", ro: "Activități Montane", hu: "Hegyi Tevékenységek" } as T,
    eventHosting: { en: "Event Hosting", ro: "Organizare Evenimente", hu: "Rendezvényszervezés" } as T,
    concierge: { en: "Concierge Service", ro: "Serviciu Concierge", hu: "Concierge Szolgáltatás" } as T,
    contact: { en: "CONTACT", ro: "CONTACT", hu: "KAPCSOLAT" } as T,
    copyright: {
      en: "© 2025 Timian Chalet. All rights reserved.",
      ro: "© 2025 Timian Chalet. Toate drepturile rezervate.",
      hu: "© 2025 Timian Chalet. Minden jog fenntartva.",
    } as T,
    privacy: { en: "Privacy Policy", ro: "Politica de Confidențialitate", hu: "Adatvédelmi Irányelvek" } as T,
    terms: { en: "Terms of Service", ro: "Termeni și Condiții", hu: "Felhasználási Feltételek" } as T,
  },
};
