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
    craftedForEscape: {
      en: "Stay elevated.",
      ro: "Creat pentru evadarea ta",
      hu: "A menekülésedért készült",
    } as T,
    rooted: {
      en: "Rooted",
      ro: "Înrădăcinat",
      hu: "A természetben",
    } as T,
    inNature: {
      en: "In nature.",
      ro: "În natură.",
      hu: "",
    } as T,
  },

  // ─── Landing (tagline section) ─────────────────────
  landing: {
    taglines: {
      en: ["BECAUSE", "YOU", "DESERVE", "IT"],
      ro: ["PENTRU", "CĂ", "MERIȚI", "ASTA"],
      hu: ["MERT", "NEKED", "IS", "JÁR"],
    } as TLines,
  },

  // ─── About / Welcome ─────────────────────────────
  about: {
    welcomeTitle: {
      en: "Welcome to Timian Chalet",
      ro: "Bine ați venit la Timian Chalet",
      hu: "Üdvözöljük a Timian Chalet-ban",
    } as T,
    welcomePara1: {
      en: "Perched at the edge of the Carpathian wilderness, Timian Chalet is more than a destination — it's a feeling. Built with hand-selected timber and stone from the surrounding mountains, every detail speaks to the land it was born from.",
      ro: "Situat la marginea sălbăticiei carpatine, Timian Chalet este mai mult decât o destinație — este o stare de spirit. Construit din lemn și piatră alese cu grijă din munții din jur, fiecare detaliu vorbește despre pământul din care s-a născut.",
      hu: "A Kárpátok vadonjának szélén megbújva a Timian Chalet több mint egy úti cél — ez egy érzés. A környező hegyekből válogatott fából és kőből épült, minden részlet a tájról mesél, amelyből született.",
    } as T,
    welcomePara2: {
      en: "Our twelve uniquely designed rooms offer a sanctuary where rustic charm meets thoughtful luxury. Wake to birdsong, unwind by the fire, and let the rhythm of the mountains set your pace.",
      ro: "Cele douăsprezece camere, fiecare cu un design unic, oferă un sanctuar unde farmecul rustic întâlnește luxul atent. Treziți-vă în cântecul păsărilor, relaxați-vă lângă foc și lăsați ritmul munților să vă ghideze.",
      hu: "Tizenkét egyedi szobánk menedéket kínál, ahol a rusztikus báj az átgondolt luxussal találkozik. Ébredjen madárdalra, pihenjen a kandalló mellett, és hagyja, hogy a hegyek ritmusa vezesse.",
    } as T,
    welcomePara3: {
      en: "From farm-to-table dining to guided alpine adventures, every moment at Timian is crafted to reconnect you with nature, with tradition, and with yourself.",
      ro: "De la preparate de la fermă la aventuri alpine ghidate, fiecare moment la Timian este creat pentru a vă reconecta cu natura, cu tradiția și cu voi înșivă.",
      hu: "A farmról az asztalra kerülő ételektől a vezetett alpesi kalandokig, a Timian minden pillanata arra lett tervezve, hogy újra összekapcsolja a természettel, a hagyományokkal és önmagával.",
    } as T,

    statEstablished: { en: "ESTABLISHED", ro: "FONDAT", hu: "ALAPÍTVA" } as T,
    statRooms: { en: "LUXURY ROOMS", ro: "CAMERE DE LUX", hu: "LUXUS SZOBÁK" } as T,
    statSatisfaction: { en: "GUEST SATISFACTION", ro: "SATISFACȚIA OASPEȚILOR", hu: "VENDÉG ELÉGEDETTSÉG" } as T,
    statConcierge: { en: "CONCIERGE SERVICE", ro: "SERVICIU CONCIERGE", hu: "CONCIERGE SZOLGÁLTATÁS" } as T,
  },

  // ─── Landing Sections ───────────────────────────────
  sections: {
    hotelLabel: { en: "The Hotel", ro: "Hotelul", hu: "A Hotel" } as T,
    hotelTitle: { en: "A Story Written\nin Wood & Stone", ro: "O Poveste Scrisă\nîn Lemn și Piatră", hu: "Egy Történet\nFából és Kőből" } as T,
    hotelDesc: {
      en: "Discover the story of Timian Chalet — a Transylvanian retreat where traditional architecture, natural materials, and heartfelt hospitality create an atmosphere unlike any other.",
      ro: "Descoperiți povestea Timian Chalet — un refugiu transilvănean unde arhitectura tradițională, materialele naturale și ospitalitatea autentică creează o atmosferă unică.",
      hu: "Fedezze fel a Timian Chalet történetét — egy erdélyi menedék, ahol a hagyományos építészet, a természetes anyagok és a szívből jövő vendégszeretet páratlan atmoszférát teremt.",
    } as T,
    hotelLink: { en: "Discover more", ro: "Descoperă mai mult", hu: "Tudjon meg többet" } as T,

    roomsLabel: { en: "The Rooms", ro: "Camerele", hu: "A Szobák" } as T,
    roomsTitle: { en: "Twelve Rooms,\nTwelve Worlds", ro: "Douăsprezece Camere,\nDouăsprezece Lumi", hu: "Tizenkét Szoba,\nTizenkét Világ" } as T,
    roomsDesc: {
      en: "Each room is named after the natural world that surrounds us. Hand-carved details, premium linens, and mountain views in every direction.",
      ro: "Fiecare cameră poartă numele lumii naturale care ne înconjoară. Detalii sculptate manual, lenjerie premium și priveliști montane în fiecare direcție.",
      hu: "Minden szoba a minket körülvevő természeti világról kapta nevét. Kézzel faragott részletek, prémium ágyneműk és hegyi panoráma minden irányban.",
    } as T,
    roomsLink: { en: "Explore our rooms", ro: "Explorează camerele", hu: "Fedezze fel szobáinkat" } as T,

    culinaryLabel: { en: "Culinary", ro: "Culinar", hu: "Gasztronómia" } as T,
    culinaryTitle: { en: "Flavors of\nTransylvania", ro: "Aromele\nTransilvaniei", hu: "Erdély\nÍzei" } as T,
    culinaryDesc: {
      en: "Our kitchen celebrates the heart of Transylvania. Locally sourced ingredients, artisanal cheeses, and seasonal menus that honor the region's rich culinary heritage.",
      ro: "Bucătăria noastră celebrează inima Transilvaniei. Ingrediente locale, brânzeturi artizanale și meniuri sezoniere care onorează bogata moștenire culinară a regiunii.",
      hu: "Konyhánk Erdély szívét ünnepli. Helyi alapanyagok, kézműves sajtok és szezonális menük, amelyek a régió gazdag kulináris örökségét tisztelik.",
    } as T,
    culinaryLink: { en: "See the menu", ro: "Vezi meniul", hu: "Nézze meg az étlapot" } as T,

    experiencesLabel: { en: "Experiences", ro: "Experiențe", hu: "Élmények" } as T,
    experiencesTitle: { en: "Adventures\nAwait", ro: "Aventuri\nVă Așteaptă", hu: "Kalandok\nVárnak" } as T,
    experiencesDesc: {
      en: "From wellness retreats and mountain sports to buggy tours through ancient forests — every day brings a new way to experience the Carpathians.",
      ro: "De la retreat-uri de wellness și sporturi montane la tururi cu buggy prin păduri străvechi — fiecare zi aduce un nou mod de a experimenta Carpații.",
      hu: "A wellness pihenéstől és a hegyi sportoktól a buggy túrákig az ősi erdőkben — minden nap új módot kínál a Kárpátok felfedezésére.",
    } as T,
    experiencesLink: { en: "Plan your adventure", ro: "Planifică aventura", hu: "Tervezze meg kalandját" } as T,
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
