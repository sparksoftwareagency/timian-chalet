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
    title: { en: "TIMIAN", ro: "TIMIAN", hu: "TIMIAN" } as T,
    subtitle: {
      en: "Transylvanian Mountain Retreat",
      ro: "Refugiu Montan Transilvănean",
      hu: "Erdélyi Hegyi Menedék",
    } as T,
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

  // ─── Room Pages ────────────────────────────────────
  rooms: {
    label: { en: "The Room", ro: "Camera", hu: "A Szoba" } as T,
    backToRooms: { en: "Back to all rooms", ro: "Înapoi la camere", hu: "Vissza a szobákhoz" } as T,
    bookThisRoom: { en: "Book this room", ro: "Rezervă camera", hu: "Foglalja le a szobát" } as T,
    galleryTitle: { en: "Gallery", ro: "Galerie", hu: "Galéria" } as T,
    discoverSpace: { en: "Discover the space", ro: "Descoperă spațiul", hu: "Fedezze fel a teret" } as T,
    overviewTitle: { en: "Rooms & Suites", ro: "Camere și Suite", hu: "Szobák és Lakosztályok" } as T,
    overviewSubtitle: {
      en: "Each room is a unique world inspired by the nature that surrounds us",
      ro: "Fiecare cameră este o lume unică inspirată de natura care ne înconjoară",
      hu: "Minden szoba egyedi világ, amelyet a minket körülvevő természet ihletett",
    } as T,

    crang: {
      tagline: { en: "A forest sanctuary", ro: "Un sanctuar al pădurii", hu: "Erdei szentély" } as T,
      desc: {
        en: "Inspired by the ancient groves that surround Timian Chalet, this room brings the forest indoors with warm timber tones and earthy textures. Floor-to-ceiling windows frame the woodland views, while hand-carved details recall the timeless beauty of Transylvanian craftsmanship.",
        ro: "Inspirată de crângurile străvechi care înconjoară Timian Chalet, această cameră aduce pădurea în interior cu tonuri calde de lemn și texturi pământii. Ferestrele generoase încadrează priveliștile către pădure, iar detaliile sculptate manual amintesc de frumusețea atemporală a meșteșugului transilvănean.",
        hu: "Az ősi ligetektől ihletve, amelyek körülveszik a Timian Chalet-t, ez a szoba meleg fa tónusokkal és földes textúrákkal hozza be az erdőt. A padlótól a mennyezetig érő ablakok keretezik az erdei kilátást, míg a kézzel faragott részletek az erdélyi mesterség időtlen szépségét idézik.",
      } as T,
    },
    frunzis: {
      tagline: { en: "Wrapped in green", ro: "Învăluită în verde", hu: "Zöldbe burkolva" } as T,
      desc: {
        en: "Leafage celebrates the verdant canopy that defines our mountain landscape. Rich botanical accents and natural fabrics create a room that breathes with the rhythm of the forest. Every detail is a tribute to the lush foliage that blankets the Carpathian hillsides.",
        ro: "Frunzișul celebrează coroana verde care definește peisajul nostru montan. Accente botanice bogate și țesături naturale creează o cameră care respiră în ritmul pădurii. Fiecare detaliu este un omagiu adus frunzișului luxuriant care acoperă coastele Carpaților.",
        hu: "A Lombozat a hegyvidéki tájat meghatározó zöld lombkoronát ünnepli. Gazdag botanikai díszítések és természetes szövetek teremtenek olyan szobát, amely az erdő ritmusában lélegzik.",
      } as T,
    },
    timian: {
      tagline: { en: "The essence of the mountains", ro: "Esența munților", hu: "A hegyek lényege" } as T,
      desc: {
        en: "Named after the wild thyme that grows on our mountain slopes, this signature room embodies the aromatic spirit of the Carpathians. Elegant furnishings blend with alpine charm, offering a retreat where every breath carries the scent of the highlands.",
        ro: "Numită după cimbrul sălbatic care crește pe pantele munților noștri, această cameră emblematică întrupează spiritul aromatic al Carpaților. Mobilierul elegant se îmbină cu farmecul alpin, oferind un refugiu unde fiecare respirație poartă parfumul munților.",
        hu: "A hegyoldalakon vadon termő kakukkfűről elnevezve, ez a szoba a Kárpátok aromás szellemét testesíti meg. Az elegáns berendezés alpesi bájjal ötvöződik, olyan menedéket kínálva, ahol minden lélegzetvétel a felvidék illatát hordozza.",
      } as T,
    },
    con: {
      tagline: { en: "Nature's geometry", ro: "Geometria naturii", hu: "A természet geometriája" } as T,
      desc: {
        en: "The Cone room draws its character from the sculptural beauty of pine cones — nature's perfect geometry. Angular wooden details and soft textiles create a space where architectural precision meets mountain warmth.",
        ro: "Camera Con își trage caracterul din frumusețea sculpturală a conurilor de pin — geometria perfectă a naturii. Detalii unghiulare din lemn și textile moi creează un spațiu unde precizia arhitecturală întâlnește căldura muntelui.",
        hu: "A Toboz szoba a tobozok szobrászati szépségéből — a természet tökéletes geometriájából — meríti jellegét. Szögletes fa részletek és puha textíliák teremtenek olyan teret, ahol az építészeti precizitás találkozik a hegyi melegséggel.",
      } as T,
    },
    lichen: {
      tagline: { en: "Quiet resilience", ro: "Reziliență liniștită", hu: "Csendes ellenállás" } as T,
      desc: {
        en: "Like the lichen that adorns our ancient trees, this room embodies quiet resilience and natural grace. Muted earth tones and organic textures create an atmosphere of understated elegance, perfect for those who find beauty in subtlety.",
        ro: "Ca și lichenul care împodobește copacii noștri străvechi, această cameră întrupează reziliența liniștită și grația naturală. Tonuri pământii atenuate și texturi organice creează o atmosferă de eleganță discretă.",
        hu: "Mint a zuzmó, amely ősi fáinkat díszíti, ez a szoba a csendes ellenállást és a természetes kecsességet testesíti meg. Tompított földszínek és organikus textúrák teremtenek visszafogott elegancia légkörét.",
      } as T,
    },
    mineral: {
      tagline: { en: "Carved from the earth", ro: "Sculptat din pământ", hu: "A földből faragva" } as T,
      desc: {
        en: "The Mineral room pays homage to the geological wonders of the Carpathians. Stone accents and crystalline touches merge with premium comfort, evoking the raw beauty of mountain rock formations while maintaining the warmth and luxury that define Timian Chalet.",
        ro: "Camera Mineral aduce un omagiu minunilor geologice ale Carpaților. Accente de piatră și atingeri cristaline se îmbină cu confortul premium, evocând frumusețea brută a formațiunilor stâncoase montane.",
        hu: "A Mineral szoba a Kárpátok geológiai csodái előtt tiszteleg. Kő díszítések és kristályos érintések olvadnak össze prémium kényelemmel, felidézve a hegyi sziklaformációk nyers szépségét.",
      } as T,
    },
    zoriDeZi: {
      tagline: { en: "First light over the peaks", ro: "Prima lumină peste vârfuri", hu: "Az első fény a csúcsok felett" } as T,
      desc: {
        en: "Dawn captures the magical moment when first light spills over the Carpathian peaks. Soft golden hues and gentle textures create a room that glows with the warmth of sunrise. East-facing windows ensure you wake to the most spectacular mountain views.",
        ro: "Zori de zi surprinde momentul magic când prima lumină se revarsă peste vârfurile Carpaților. Nuanțe aurii delicate și texturi blânde creează o cameră care strălucește cu căldura răsăritului.",
        hu: "A Hajnal megragadja azt a varázslatos pillanatot, amikor az első fény kiárad a Kárpátok csúcsai felett. Lágy aranyszínű árnyalatok és finom textúrák teremtenek olyan szobát, amely a napfelkelte melegével ragyog.",
      } as T,
    },
    comoara: {
      tagline: { en: "Hidden luxury", ro: "Lux ascuns", hu: "Rejtett luxus" } as T,
      desc: {
        en: "Treasure is our most opulent room, inspired by the hidden riches of the Transylvanian mountains. Rich fabrics, gilded accents, and artisanal details create an atmosphere of refined luxury where mountain tradition meets its most elegant expression.",
        ro: "Comoara este cea mai opulentă cameră a noastră, inspirată de bogățiile ascunse ale munților Transilvaniei. Țesături bogate, accente aurite și detalii artizanale creează o atmosferă de lux rafinat.",
        hu: "A Kincs a legpompázatosabb szobánk, amelyet az erdélyi hegyek rejtett kincsei inspiráltak. Gazdag szövetek, aranyozott díszítések és kézműves részletek teremtenek kifinomult luxus légkörét.",
      } as T,
    },
    miniChalet: {
      tagline: { en: "A world of its own", ro: "O lume a sa", hu: "Egy saját világ" } as T,
      desc: {
        en: "The Mini Chalet is a self-contained alpine retreat within the retreat. With its own entrance, living area, and panoramic mountain views, it offers the ultimate in privacy and independence — perfect for extended stays or those who desire their own Carpathian hideaway.",
        ro: "Mini Chaletul este un refugiu alpin de sine stătător în cadrul refugiului. Cu propria intrare, zonă de living și priveliști panoramice montane, oferă maximul de intimitate și independență.",
        hu: "A Mini Chalet egy önálló alpesi menedék a menedéken belül. Saját bejárattal, nappali résszel és panorámás hegyi kilátással a magánélet és függetlenség csúcsát kínálja.",
      } as T,
    },
  },

  // ─── Culinary Page ─────────────────────────────────
  culinaryPage: {
    heroTitle: { en: "Culinary", ro: "Culinar", hu: "Gasztronómia" } as T,
    heroSubtitle: {
      en: "Authentic Transylvanian flavours crafted with passion",
      ro: "Arome transilvănene autentice, preparate cu pasiune",
      hu: "Autentikus erdélyi ízek, szenvedéllyel készítve",
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
    leafage: { en: "Leafage", ro: "Frunziș", hu: "Leafage" } as T,
    thyme: { en: "Thyme", ro: "Timian", hu: "Thyme" } as T,
    cone: { en: "Cone", ro: "Con", hu: "Cone" } as T,
    lichen: { en: "Lichen", ro: "Lichen", hu: "Lichen" } as T,
    mineral: { en: "Mineral", ro: "Mineral", hu: "Mineral" } as T,
    dawn: { en: "Dawn", ro: "Zori de zi", hu: "Dawn" } as T,
    treasure: { en: "Treasure", ro: "Comoară", hu: "Treasure" } as T,
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

  // ─── About / Story Page ─────────────────────────────
  aboutPage: {
    heroTitle: {
      en: "Our Story",
      ro: "Povestea Noastră",
      hu: "Történetünk",
    } as T,
    heroSubtitle: {
      en: "How a goat farm became a premium mountain retreat",
      ro: "Cum a devenit o fermă de capre un refugiu montan premium",
      hu: "Hogyan lett egy kecskefarmból prémium hegyi menedék",
    } as T,

    originLabel: {
      en: "The Beginning",
      ro: "Începutul",
      hu: "A Kezdetek",
    } as T,
    originTitle: {
      en: "Where It\nAll Started",
      ro: "De Unde\nA Început Totul",
      hu: "Ahol Minden\nElkezdődött",
    } as T,
    originPara1: {
      en: "It all began with a simple love of nature. The Becze–Máthé family, on their estate at the foot of the Harghita Mountains, started a goat farm — not as a business, but as a way of life. For over a decade, the farm provided the family with the finest handcrafted goat cheeses and dairy products.",
      ro: "Totul a început cu o simplă dragoste pentru natură. Familia Becze–Máthé, pe domeniul lor de la poalele Munților Harghita, a înființat o fermă de capre — nu ca afacere, ci ca un mod de viață. Peste un deceniu, ferma a furnizat familiei cele mai fine brânzeturi artizanale de capră și produse lactate.",
      hu: "Minden egy kedves hobbival kezdődött. A Becze–Máthé család birtokán, a Hargita lábánál egy kecskefarm született — nem üzleti céllal, hanem a család örömére. A farm több mint tíz éven át biztosította a legnemesebb, kézzel készült kecskesajtokat és tejtermékeket.",
    } as T,
    originPara2: {
      en: "The purity of flavors and authenticity of ingredients quickly grew beyond the family circle. More and more people sought their organic, additive-free dairy products, and the farm gradually evolved into a small commercial venture.",
      ro: "Puritatea aromelor și autenticitatea ingredientelor au depășit rapid cercul familial. Tot mai mulți oameni căutau produsele lor lactate bio, fără aditivi, iar ferma a evoluat treptat într-o mică întreprindere comercială.",
      hu: "Az ízek tisztasága és az alapanyagok valódisága hamar túlnőtt a családi körön. Egyre többen keresték a bio, adalékmentes tejtermékeket, így a farm lassan kisebb kereskedelmi vállalkozássá vált.",
    } as T,

    transformLabel: {
      en: "The Dream",
      ro: "Visul",
      hu: "Az Álom",
    } as T,
    transformTitle: {
      en: "A New Chapter\nUnfolds",
      ro: "Un Nou Capitol\nSe Deschide",
      hu: "Egy Új Fejezet\nKezdetét Veszi",
    } as T,
    transformPara1: {
      en: "The family realized that the values they had cultivated over the years — closeness to nature, quality, tranquility — were worth sharing with others. And so the idea was born: to create a place where guests could experience everything they themselves felt on this land, day after day.",
      ro: "Familia a realizat că valorile cultivate de-a lungul anilor — apropierea de natură, calitatea, liniștea — meritau împărtășite cu alții. Astfel s-a născut ideea: de a crea un loc în care oaspeții să trăiască tot ceea ce ei înșiși simțeau pe acest pământ, zi de zi.",
      hu: "A család felismerte, hogy mindazt az értéket, amit az évek során megteremtettek — a természet közelségét, a minőséget, a nyugalmat — érdemes megosztani másokkal is. Így született meg a gondolat: egy helyet teremteni, ahol a vendégek is átélhetik mindazt, amit ők maguk nap mint nap tapasztaltak.",
    } as T,
    transformPara2: {
      en: "The goat farm moved a few steps further, making way for a new dream. Timian Chalet was born — an idyllic, premium guesthouse where nature and elegance live in harmony. The spirit of the original farm still permeates the place: simplicity, authenticity, care, and premium quality.",
      ro: "Ferma de capre s-a mutat câțiva pași mai departe, făcând loc unui nou vis. Astfel s-a născut Timian Chalet — o pensiune premium, idilică, unde natura și eleganța trăiesc în armonie. Spiritul fermei originale încă pătrunde locul: simplitate, autenticitate, grijă și calitate premium.",
      hu: "A kecskefarm pár lépéssel odébb költözve átadta helyét egy új álomnak. Így született meg a Timian Chalet — egy idilli, prémium panzió, ahol a természet és elegancia harmóniában él. Az egykori farm szellemisége ma is átszövi a helyet: egyszerűség, hitelesség, gondoskodás és prémium minőség.",
    } as T,

    valuesQuote: {
      en: "Timian Chalet is not just accommodation. It is a story that you can live.",
      ro: "Timian Chalet nu este doar cazare. Este o poveste pe care o poți trăi.",
      hu: "A Timian Chalet nemcsak szálláshely. Ez egy történet, amit Te is átélhetsz.",
    } as T,

    farmLabel: {
      en: "From Our Land",
      ro: "De Pe Pământul Nostru",
      hu: "A Saját Földünkről",
    } as T,
    farmTitle: {
      en: "Farm to\nTable",
      ro: "De la Fermă\npe Masă",
      hu: "A Farmtól\naz Asztalig",
    } as T,
    farmPara1: {
      en: "The farm remains an integral part of Timian Chalet's life. Over the years it has undergone continuous development, and today it produces the finest quality cheeses in a variety of forms and flavors. These artisanal products appear not only on cheese boards but serve as key ingredients throughout our cuisine.",
      ro: "Ferma rămâne o parte integrantă a vieții Timian Chalet. De-a lungul anilor a trecut printr-o dezvoltare continuă și astăzi produce brânzeturi de cea mai înaltă calitate într-o varietate de forme și arome. Aceste produse artizanale apar nu doar pe platouri de brânză, ci servesc ca ingrediente cheie în întreaga noastră bucătărie.",
      hu: "A farm azóta is szerves része a Timian Chalet életének. Mára a legkiválóbb minőségű sajtokat állítja elő változatos formákban és ízvilágban. Ezek a kézműves termékek nemcsak sajttálakban jelennek meg, hanem kulcsfontosságú alapanyagként épülnek be ételeinkbe.",
    } as T,
    farmPara2: {
      en: "From fresh garden vegetables and fruits to the ingredients used in our meat dishes — everything comes from our own estate. The trees, the vegetable garden, and our livestock all serve one purpose: for our guests to enjoy truly authentic, natural, and carefully crafted dishes — straight from the source.",
      ro: "De la legumele și fructele proaspete din grădină până la ingredientele folosite în preparatele din carne — totul provine de pe domeniul nostru. Copacii, grădina de legume și animalele noastre servesc un singur scop: ca oaspeții noștri să se bucure de preparate cu adevărat autentice, naturale și elaborate cu grijă — direct de la sursă.",
      hu: "A kert friss zöldségeitől és gyümölcseitől a húsételek alapanyagaiig, minden saját gazdaságunkból származik. A birtok fái, a veteményes és az állatállomány mind azt a célt szolgálják, hogy vendégeink valóban hiteles, természetes és gondosan előállított fogásokat élvezhessenek — közvetlenül a forrásból.",
    } as T,

    roomsLabel: {
      en: "Three Floors",
      ro: "Trei Etaje",
      hu: "Három Emelet",
    } as T,
    roomsTitle: {
      en: "Three Landscapes,\nThree Worlds",
      ro: "Trei Peisaje,\nTrei Lumi",
      hu: "Három Táj,\nHárom Világ",
    } as T,
    roomsIntro: {
      en: "Our rooms are not merely places to stay — each space is a world of its own, a mood, a feeling. Across three floors, three different landscapes come alive, symbols of the surrounding farm and nature.",
      ro: "Camerele noastre nu sunt doar locuri de cazare — fiecare spațiu este o lume aparte, o stare de spirit, o senzație. Pe trei etaje, trei peisaje diferite prind viață, simboluri ale fermei și naturii înconjurătoare.",
      hu: "Szobáink nem csupán szálláshelyek — minden egyes tér egy külön világ, egy hangulat, egy érzés. Három emeleten három különböző táj elevenedik meg, amelyek a környező farm és természet szimbólumai.",
    } as T,
    floorGround: {
      en: "Ground Floor — The Meadow",
      ro: "Parter — Câmpia",
      hu: "Földszint — A Mező Világa",
    } as T,
    floorGroundDesc: {
      en: "Where life begins, open, fresh, and inviting. The gentle calm of the meadow, morning dew, and the play of light — every room on this floor promises a peaceful awakening.",
      ro: "Unde începe viața, deschis, proaspăt și primitor. Calmul blând al câmpiei, roua dimineții și jocul luminii — fiecare cameră de la acest etaj promite o trezire liniștită.",
      hu: "Itt indul az élet, ahol a természet nyitott, friss és hívogató. A mező szelíd nyugalma, a reggeli harmat és a fények játéka — minden szoba a békés ébredés ígéretét hordozza.",
    } as T,
    floorFirst: {
      en: "First Floor — The Forest",
      ro: "Etajul I — Pădurea",
      hu: "Első Emelet — Az Erdő Mélysége",
    } as T,
    floorFirstDesc: {
      en: "A space for inner harmony and contemplation. Soft living greens, the essence of the deep woods, and treasures from the heart of the Harghita mountains — this floor invites you to look inward.",
      ro: "Un spațiu pentru armonia interioară și contemplare. Verzi blânde și vii, esența pădurilor adânci și comori din inima Munților Harghita — acest etaj vă invită să priviți spre interior.",
      hu: "A befelé figyelés, a belső harmónia tere. Puha, élő zöld, az erdő mélységének lényege, a Hargita mélyéből feltörő kincsek — ez a szint a befelé tekintésre hív.",
    } as T,
    floorSecond: {
      en: "Second Floor — The Peaks",
      ro: "Etajul II — Vârfurile",
      hu: "Második Emelet — A Havas Hegycsúcsok",
    } as T,
    floorSecondDesc: {
      en: "The highest order of nature — pure, untouched, silent. Refreshing energy, hidden sparkle, and the majesty of mountaintops where everything is seen from a new perspective.",
      ro: "Cea mai înaltă ordine a naturii — pură, neatinsă, tăcută. Energie revigorantă, strălucire ascunsă și maiestatea vârfurilor munților, de unde totul se vede dintr-o perspectivă nouă.",
      hu: "A természet legmagasabb rendű formája — tiszta, érintetlen, csendes. Frissítő erő, titkos csillogás és a hegycsúcsok fensége, ahonnan minden más szemszögből látszik.",
    } as T,
    roomsLink: {
      en: "Explore our rooms",
      ro: "Explorează camerele",
      hu: "Fedezze fel szobáinkat",
    } as T,
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
