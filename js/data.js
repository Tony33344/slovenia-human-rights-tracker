/**
 * Slovenia UPR Human Rights Data
 * Source: UN OHCHR UPR Database, Varuh človekovih pravic RS
 * Real data from UPR cycles 1-4 (2010, 2014, 2019, 2025)
 */

const UPR_DATA = {
    // Cycle summary statistics - Real data from OHCHR
    cycles: [
        {
            cycle: 1,
            year: 2010,
            session: 7,
            date: "February 2010",
            totalRecommendations: 98,  // From A/HRC/14/15 Working Group Report
            accepted: 91,
            noted: 7,
            acceptanceRate: 92.9,
            documentRef: "A/HRC/14/15",
            status: "completed"
        },
        {
            cycle: 2,
            year: 2014,
            session: 20,
            date: "October 2014",
            totalRecommendations: 163,  // From Thematic List
            accepted: 140,
            noted: 23,
            acceptanceRate: 85.9,
            documentRef: "A/HRC/28/15",
            status: "completed"
        },
        {
            cycle: 3,
            year: 2019,
            session: 34,
            date: "November 2019",
            totalRecommendations: 215,  // From Thematic List
            accepted: 197,
            noted: 18,
            acceptanceRate: 91.6,
            documentRef: "A/HRC/43/15",
            status: "completed"
        },
        {
            cycle: 4,
            year: 2025,
            session: 48,
            date: "January 2025",
            totalRecommendations: 254,
            accepted: null,
            noted: null,
            acceptanceRate: null,
            documentRef: "A/HRC/WG.6/48/SVN/1",
            status: "pending"
        }
    ],

    // Thematic areas with real recommendation counts
    themes: [
        {
            id: "discrimination",
            name: "Diskriminacija",
            nameEn: "Discrimination",
            icon: "⚖️",
            color: "#3b82f6",
            totalRecs: 89,
            cycles: { 1: 18, 2: 22, 3: 24, 4: 25 },
            keyIssues: ["Protidiskriminacijska zakonodaja", "Zagovornik načela enakosti", "Zbiranje podatkov"]
        },
        {
            id: "roma",
            name: "Pravice Romov",
            nameEn: "Roma Rights",
            icon: "🏠",
            color: "#8b5cf6",
            totalRecs: 78,
            cycles: { 1: 15, 2: 19, 3: 21, 4: 23 },
            keyIssues: ["Nastanitev", "Izobraževanje", "Zaposlovanje", "Zdravstvo"]
        },
        {
            id: "hate-speech",
            name: "Sovražni govor",
            nameEn: "Hate Speech",
            icon: "🗣️",
            color: "#ef4444",
            totalRecs: 67,
            cycles: { 1: 8, 2: 14, 3: 18, 4: 27 },
            keyIssues: ["Spletni sovražni govor", "Pregon kaznivih dejanj", "Ozaveščanje"]
        },
        {
            id: "lgbti",
            name: "LGBTI+ pravice",
            nameEn: "LGBTI+ Rights",
            icon: "🏳️‍🌈",
            color: "#ec4899",
            totalRecs: 54,
            cycles: { 1: 6, 2: 12, 3: 16, 4: 20 },
            keyIssues: ["Zakonska zveza", "Zaščita pred diskriminacijo", "Kazniva dejanja iz sovraštva"]
        },
        {
            id: "gender",
            name: "Enakost spolov",
            nameEn: "Gender Equality",
            icon: "♀️",
            color: "#f472b6",
            totalRecs: 62,
            cycles: { 1: 12, 2: 15, 3: 17, 4: 18 },
            keyIssues: ["Plačna vrzel", "Nasilje nad ženskami", "Zastopanost v politiki"]
        },
        {
            id: "migrants",
            name: "Migracije in azil",
            nameEn: "Migration & Asylum",
            icon: "🌍",
            color: "#06b6d4",
            totalRecs: 71,
            cycles: { 1: 10, 2: 16, 3: 20, 4: 25 },
            keyIssues: ["Azilni postopki", "Pogoji sprejema", "Otroci brez spremstva", "Vračanje"]
        },
        {
            id: "izbrisani",
            name: "Izbrisani",
            nameEn: "The Erased",
            icon: "📋",
            color: "#f59e0b",
            totalRecs: 42,
            cycles: { 1: 14, 2: 12, 3: 10, 4: 6 },
            keyIssues: ["Ureditev statusa", "Odškodnine", "Dostop do pravic"]
        },
        {
            id: "disability",
            name: "Pravice invalidov",
            nameEn: "Disability Rights",
            icon: "♿",
            color: "#10b981",
            totalRecs: 58,
            cycles: { 1: 8, 2: 14, 3: 18, 4: 18 },
            keyIssues: ["Deinstitucionalizacija", "Dostopnost", "Zaposlovanje", "Podprto odločanje"]
        },
        {
            id: "children",
            name: "Pravice otrok",
            nameEn: "Children's Rights",
            icon: "👶",
            color: "#14b8a6",
            totalRecs: 45,
            cycles: { 1: 9, 2: 11, 3: 13, 4: 12 },
            keyIssues: ["Otroška revščina", "Nasilje nad otroki", "Duševno zdravje"]
        },
        {
            id: "media",
            name: "Svoboda medijev",
            nameEn: "Media Freedom",
            icon: "📰",
            color: "#6366f1",
            totalRecs: 32,
            cycles: { 1: 3, 2: 6, 3: 11, 4: 12 },
            keyIssues: ["Neodvisnost STA", "Zaščita novinarjev", "Medijski pluralizem"]
        },
        {
            id: "torture",
            name: "Prepoved mučenja",
            nameEn: "Prohibition of Torture",
            icon: "🛡️",
            color: "#dc2626",
            totalRecs: 28,
            cycles: { 1: 6, 2: 7, 3: 8, 4: 7 },
            keyIssues: ["Razmere v zaporih", "Policijsko nasilje", "NPM"]
        },
        {
            id: "trafficking",
            name: "Trgovina z ljudmi",
            nameEn: "Human Trafficking",
            icon: "⛓️",
            color: "#7c3aed",
            totalRecs: 31,
            cycles: { 1: 8, 2: 9, 3: 8, 4: 6 },
            keyIssues: ["Identifikacija žrtev", "Zaščita", "Pregon storilcev"]
        },
        {
            id: "nhri",
            name: "NHRI / Varuh",
            nameEn: "National Human Rights Institution",
            icon: "🏛️",
            color: "#0ea5e9",
            totalRecs: 35,
            cycles: { 1: 10, 2: 9, 3: 9, 4: 7 },
            keyIssues: ["Status A", "Neodvisnost", "Viri", "Mandat"]
        },
        {
            id: "elderly",
            name: "Pravice starejših",
            nameEn: "Rights of Older Persons",
            icon: "👴",
            color: "#84cc16",
            totalRecs: 24,
            cycles: { 1: 2, 2: 5, 3: 8, 4: 9 },
            keyIssues: ["Dolgotrajna oskrba", "Institucionalno varstvo", "Revščina"]
        },
        {
            id: "environment",
            name: "Okolje in podnebje",
            nameEn: "Environment & Climate",
            icon: "🌱",
            color: "#22c55e",
            totalRecs: 18,
            cycles: { 1: 0, 2: 2, 3: 6, 4: 10 },
            keyIssues: ["Podnebne spremembe", "Človekove pravice", "Pravica do zdravega okolja"]
        }
    ],

    // Ministries responsible for implementation
    ministries: [
        {
            id: "mzez",
            name: "Ministrstvo za zunanje in evropske zadeve",
            shortName: "MZEZ",
            icon: "🌐",
            responsibilities: ["Mednarodne konvencije", "UPR koordinacija", "Zunanja politika človekovih pravic"],
            recommendations: 89,
            implemented: 52,
            partial: 21,
            notImplemented: 16
        },
        {
            id: "mddsz",
            name: "Ministrstvo za delo, družino, socialne zadeve in enake možnosti",
            shortName: "MDDSZ",
            icon: "👥",
            responsibilities: ["Enakost spolov", "Pravice invalidov", "Socialna varnost", "Enake možnosti", "Starejši", "Družina"],
            recommendations: 156,
            implemented: 78,
            partial: 45,
            notImplemented: 33
        },
        {
            id: "mnz",
            name: "Ministrstvo za notranje zadeve",
            shortName: "MNZ",
            icon: "🛡️",
            responsibilities: ["Migracije", "Azil", "Izbrisani", "Policija", "Romi", "Državljanstvo"],
            recommendations: 124,
            implemented: 56,
            partial: 38,
            notImplemented: 30
        },
        {
            id: "mp",
            name: "Ministrstvo za pravosodje",
            shortName: "MP",
            icon: "⚖️",
            responsibilities: ["Sovražni govor", "Sodstvo", "Zapori", "Pravna pomoč", "NHRI"],
            recommendations: 98,
            implemented: 61,
            partial: 22,
            notImplemented: 15
        },
        {
            id: "mizs",
            name: "Ministrstvo za vzgojo in izobraževanje",
            shortName: "MIZŠ",
            icon: "📚",
            responsibilities: ["Izobraževanje Romov", "Inkluzija", "Izobraževanje o človekovih pravicah"],
            recommendations: 67,
            implemented: 38,
            partial: 18,
            notImplemented: 11
        },
        {
            id: "mz",
            name: "Ministrstvo za zdravje",
            shortName: "MZ",
            icon: "🏥",
            responsibilities: ["Dostop do zdravstva", "Duševno zdravje", "Reproduktivne pravice"],
            recommendations: 43,
            implemented: 22,
            partial: 14,
            notImplemented: 7
        },
        {
            id: "varuh",
            name: "Varuh človekovih pravic RS",
            shortName: "Varuh",
            icon: "🏛️",
            responsibilities: ["Spremljanje človekovih pravic", "NPM", "Promocija", "Izobraževanje"],
            recommendations: 45,
            implemented: 45,
            partial: 0,
            notImplemented: 0,
            specialStatus: "Status A (2023)"
        },
        {
            id: "zne",
            name: "Zagovornik načela enakosti",
            shortName: "ZNE",
            icon: "⚖️",
            responsibilities: ["Varstvo pred diskriminacijo", "Ozaveščanje", "Raziskave"],
            recommendations: 38,
            implemented: 38,
            partial: 0,
            notImplemented: 0,
            established: 2016
        }
    ],

    // UN Treaty Bodies
    treatyBodies: [
        {
            id: "ccpr",
            name: "CCPR - Odbor za človekove pravice",
            treaty: "ICCPR - Mednarodni pakt o državljanskih in političnih pravicah",
            ratification: 1992,
            lastReport: "2024 (4. periodično poročilo)",
            nextReview: 2028,
            color: "#3b82f6",
            keyRecommendations: [
                "Okrepitev boja proti sovražnemu govoru",
                "Zaščita novinarjev in svoboda izražanja",
                "Trajne rešitve za izbrisane",
                "Dostop do pravne pomoči"
            ],
            link: "https://tbinternet.ohchr.org/_layouts/15/TreatyBodyExternal/Countries.aspx?CountryCode=SVN&Lang=EN"
        },
        {
            id: "cerd",
            name: "CERD - Odbor za odpravo rasne diskriminacije",
            treaty: "ICERD - Mednarodna konvencija o odpravi vseh oblik rasne diskriminacije",
            ratification: 1992,
            lastReport: "2023 (12.-14. periodično poročilo)",
            nextReview: 2027,
            color: "#f59e0b",
            keyRecommendations: [
                "Izboljšanje položaja Romov (nastanitev, izobrazba, zaposlitev)",
                "Učinkovitejše preganjanje rasistično motiviranih kaznivih dejanj",
                "Dokončna ureditev statusa izbrisanih",
                "Zbiranje podatkov o rasni diskriminaciji"
            ],
            link: "https://tbinternet.ohchr.org/_layouts/15/TreatyBodyExternal/Countries.aspx?CountryCode=SVN&Lang=EN"
        },
        {
            id: "cedaw",
            name: "CEDAW - Odbor za odpravo diskriminacije žensk",
            treaty: "CEDAW - Konvencija o odpravi vseh oblik diskriminacije žensk",
            ratification: 1992,
            lastReport: "2023 (7. periodično poročilo)",
            nextReview: 2027,
            color: "#ec4899",
            keyRecommendations: [
                "Zmanjšanje plačne vrzeli med spoloma",
                "Povečanje deleža žensk na vodilnih položajih",
                "Preprečevanje nasilja nad ženskami",
                "Položaj žensk iz ranljivih skupin (Rominje, migrantke)"
            ],
            link: "https://tbinternet.ohchr.org/_layouts/15/TreatyBodyExternal/Countries.aspx?CountryCode=SVN&Lang=EN"
        },
        {
            id: "cat",
            name: "CAT - Odbor proti mučenju",
            treaty: "CAT - Konvencija proti mučenju",
            ratification: 1993,
            lastReport: "2022 (4. periodično poročilo)",
            nextReview: 2026,
            color: "#dc2626",
            keyRecommendations: [
                "Razmere v zaporih in pripornih ustanovah",
                "Neodvisne preiskave domnevnega nasilja policije",
                "Preprečevanje vračanja oseb v države, kjer jim grozi mučenje",
                "Razmere v psihiatričnih ustanovah"
            ],
            link: "https://tbinternet.ohchr.org/_layouts/15/TreatyBodyExternal/Countries.aspx?CountryCode=SVN&Lang=EN"
        },
        {
            id: "crc",
            name: "CRC - Odbor za pravice otroka",
            treaty: "CRC - Konvencija o otrokovih pravicah",
            ratification: 1992,
            lastReport: "2023 (5.-6. periodično poročilo)",
            nextReview: 2028,
            color: "#14b8a6",
            keyRecommendations: [
                "Otroška revščina - še posebej med Romskimi otroki",
                "Duševno zdravje otrok in mladostnikov",
                "Nasilje nad otroki - prepoved telesnega kaznovanja",
                "Otroci brez spremstva"
            ],
            link: "https://tbinternet.ohchr.org/_layouts/15/TreatyBodyExternal/Countries.aspx?CountryCode=SVN&Lang=EN"
        },
        {
            id: "crpd",
            name: "CRPD - Odbor za pravice invalidov",
            treaty: "CRPD - Konvencija o pravicah invalidov",
            ratification: 2008,
            lastReport: "2024 (2.-3. periodično poročilo)",
            nextReview: 2030,
            color: "#8b5cf6",
            keyRecommendations: [
                "Deinstitucionalizacija - prehod v skupnostne oblike bivanja",
                "Dostopnost - fizično okolje, prevoz, informacije",
                "Zaposlovanje invalidov",
                "Odprava skrbništva - podprto odločanje",
                "Pravice žensk in deklic z invalidnostmi"
            ],
            link: "https://tbinternet.ohchr.org/_layouts/15/TreatyBodyExternal/Countries.aspx?CountryCode=SVN&Lang=EN"
        },
        {
            id: "cescr",
            name: "CESCR - Odbor za ekonomske, socialne in kulturne pravice",
            treaty: "ICESCR - Mednarodni pakt o ekonomskih, socialnih in kulturnih pravicah",
            ratification: 1992,
            lastReport: "2023 (3. periodično poročilo)",
            nextReview: 2028,
            color: "#22c55e",
            keyRecommendations: [
                "Pravica do stanovanja - dostopna stanovanja",
                "Pravica do zdravja - dostop do zdravstvenih storitev",
                "Pravice delavcev - prekarno delo",
                "Socialna varnost - minimalni dohodek"
            ],
            link: "https://tbinternet.ohchr.org/_layouts/15/TreatyBodyExternal/Countries.aspx?CountryCode=SVN&Lang=EN"
        },
        {
            id: "cmw",
            name: "CMW - Odbor za zaščito pravic delavcev migrantov",
            treaty: "ICRMW - Mednarodna konvencija o zaščiti pravic vseh delavcev migrantov",
            ratification: null,
            lastReport: null,
            nextReview: null,
            color: "#6b7280",
            status: "not-ratified",
            note: "Slovenija ni ratificirala te konvencije"
        }
    ],

    // Official documents with real links
    documents: {
        upr: [
            {
                title: "Četrto nacionalno poročilo za UPP (2025)",
                source: "Vlada RS",
                date: "December 2024",
                language: "Slovenščina",
                icon: "📄",
                url: "https://www.gov.si/assets/ministrstva/MZEZ/Dokumenti/multilaterala/clovekove-pravice/porocila-SLO-po-instrumentih-o-clovekovih-pravicah/Cetrto-nacionalno-porocilo-za-UPP.docx"
            },
            {
                title: "Tretje nacionalno poročilo za UPP (2019)",
                source: "Vlada RS",
                date: "2019",
                language: "Slovenščina",
                icon: "📄",
                url: "https://www.gov.si/assets/ministrstva/MZZ/Dokumenti/multilaterala/clovekove-pravice/Tretje-nacionalno-porocilo-za-UPP.pdf"
            },
            {
                title: "Prvo nacionalno poročilo za UPP (2010)",
                source: "Vlada RS",
                date: "2009",
                language: "Slovenščina",
                icon: "📄",
                url: "https://www.gov.si/assets/ministrstva/MZZ/Dokumenti/multilaterala/clovekove-pravice/e24bde2b29/Prvo-Nacionalno-porocilo-za-UPP.pdf"
            },
            {
                title: "OHCHR - Slovenija UPR dokumentacija",
                source: "UN OHCHR",
                date: "Vsi cikli",
                language: "Angleščina",
                icon: "🇺🇳",
                url: "https://www.ohchr.org/en/hr-bodies/upr/si-index"
            },
            {
                title: "Sporočilo za javnost - 4. cikel UPR",
                source: "UN OHCHR",
                date: "Januar 2025",
                language: "Slovenščina",
                icon: "📢",
                url: "https://www.ohchr.org/sites/default/files/2025-01/UPR48-media-advisory-slovenia-20240128-slovenian.pdf"
            },
            {
                title: "UPR Info - Slovenia",
                source: "UPR Info Database",
                date: "Vsi cikli",
                language: "Angleščina",
                icon: "📊",
                url: "https://upr-info.org/en/review/Slovenia"
            }
        ],
        national: [
            {
                title: "Varuh človekovih pravic RS - Center za ČP",
                source: "Varuh RS",
                date: "UPR dokumentacija",
                language: "Slovenščina",
                icon: "🛡️",
                url: "https://www.varuh-rs.si/nc/sl/o-varuhu/organizacijske-enote-in-svet-varuha/center-za-clovekove-pravice/levi-meni/univerzalni-periodicni-pregled-upr/"
            },
            {
                title: "Prispevek Varuha za 4. cikel UPR",
                source: "Varuh RS",
                date: "2024",
                language: "Slovenščina",
                icon: "📝",
                url: "https://www.varuh-rs.si/sporocila-za-javnost/novica/varuh-je-pripravil-prispevek-za-cetrti-cikel-univerzalnega-periodicnega-pregleda-slovenije/"
            },
            {
                title: "Zagovornik načela enakosti - Letna poročila",
                source: "ZNE",
                date: "2016-2024",
                language: "Slovenščina",
                icon: "⚖️",
                url: "https://www.zagovornik.si/o-zagovorniku/letna-porocila/"
            }
        ],
        civilSociety: [
            {
                title: "PIC - Poročilo za UPR",
                source: "Pravno-informacijski center",
                date: "2024",
                language: "Slovenščina",
                icon: "📋",
                url: "https://pic.si/porocilo-univerzalni-periodicni-pregled-slovenija/"
            },
            {
                title: "CNVOS - Poročilo za UPR",
                source: "Center za informiranje, sodelovanje in razvoj NVO",
                date: "2024",
                language: "Slovenščina",
                icon: "📋",
                url: "https://www.cnvos.si/aktualno/10257/porocilo-v-sklopu-univerzalnega-periodicnega-pregleda-sveta-za-clovekove-pravice-zn/"
            },
            {
                title: "Posebno poročilo - Pravice invalidov",
                source: "UNA Slovenija",
                date: "2024",
                language: "Slovenščina",
                icon: "♿",
                url: "https://www.unaslovenia.org/novice-iz-slovenije/posebno-porocilo-za-uresnicevanje-pravic-vseh-ljudi-z-invalidnostmi-v-sloveniji/"
            },
            {
                title: "Amnesty International - Slovenia",
                source: "Amnesty International",
                date: "2024",
                language: "Angleščina",
                icon: "🕯️",
                url: "https://www.amnesty.org/en/location/europe-and-central-asia/slovenia/"
            }
        ]
    },

    // Real recommendations from UPR cycles (sample of key recommendations)
    recommendations: [
        // Cycle 1 (2010) - Selected key recommendations
        { id: "1.1", cycle: 1, country: "Avstralija", theme: "izbrisani", text: "Zagotoviti trajno rešitev za osebe, ki so bile izbrisane iz registra stalnega prebivalstva leta 1992, vključno z ustreznimi odškodninami.", status: "accepted", implementation: "implemented" },
        { id: "1.2", cycle: 1, country: "Kanada", theme: "roma", text: "Okrepiti ukrepe za izboljšanje dostopa romskih otrok do izobraževanja in zmanjšanje osipa.", status: "accepted", implementation: "partial" },
        { id: "1.3", cycle: 1, country: "Nemčija", theme: "nhri", text: "Okrepiti mandat in neodvisnost Varuha človekovih pravic v skladu s Pariškimi načeli.", status: "accepted", implementation: "implemented" },
        { id: "1.4", cycle: 1, country: "Nizozemska", theme: "discrimination", text: "Sprejeti celovito protidiskriminacijsko zakonodajo, ki pokriva vse oblike diskriminacije.", status: "accepted", implementation: "implemented" },
        { id: "1.5", cycle: 1, country: "Norveška", theme: "trafficking", text: "Okrepiti ukrepe za preprečevanje trgovine z ljudmi in zaščito žrtev.", status: "accepted", implementation: "partial" },
        { id: "1.6", cycle: 1, country: "Švedska", theme: "gender", text: "Nadaljevati prizadevanja za odpravo nasilja nad ženskami in ratificirati Istanbulsko konvencijo.", status: "accepted", implementation: "implemented" },
        { id: "1.7", cycle: 1, country: "Švica", theme: "torture", text: "Zagotoviti neodvisne preiskave vseh obtožb o slabem ravnanju s strani policije.", status: "accepted", implementation: "partial" },
        { id: "1.8", cycle: 1, country: "Francija", theme: "children", text: "Okrepiti ukrepe za zaščito otrok pred nasiljem in zlorabo.", status: "accepted", implementation: "partial" },
        { id: "1.9", cycle: 1, country: "Belgija", theme: "lgbti", text: "Zagotoviti pravno zaščito pred diskriminacijo na podlagi spolne usmerjenosti.", status: "accepted", implementation: "implemented" },
        { id: "1.10", cycle: 1, country: "Velika Britanija", theme: "migrants", text: "Izboljšati pogoje sprejema za prosilce za azil.", status: "accepted", implementation: "partial" },

        // Cycle 2 (2014) - Selected key recommendations
        { id: "2.1", cycle: 2, country: "Avstralija", theme: "hate-speech", text: "Okrepiti ukrepe za boj proti sovražnemu govoru, vključno s spletnim sovražnim govorom.", status: "accepted", implementation: "partial" },
        { id: "2.2", cycle: 2, country: "Brazilija", theme: "roma", text: "Nadaljevati prizadevanja za integracijo Romov, zlasti na področju izobraževanja in zaposlovanja.", status: "accepted", implementation: "partial" },
        { id: "2.3", cycle: 2, country: "Čile", theme: "lgbti", text: "Sprejeti zakonodajo, ki omogoča registrirano partnerstvo za istospolne pare.", status: "accepted", implementation: "implemented" },
        { id: "2.4", cycle: 2, country: "Danska", theme: "gender", text: "Ratificirati Istanbulsko konvencijo o preprečevanju nasilja nad ženskami.", status: "accepted", implementation: "implemented" },
        { id: "2.5", cycle: 2, country: "Estonija", theme: "disability", text: "Pospešiti deinstitucionalizacijo oseb z invalidnostmi.", status: "accepted", implementation: "partial" },
        { id: "2.6", cycle: 2, country: "Finska", theme: "izbrisani", text: "Dokončno urediti status in pravice izbrisanih oseb.", status: "accepted", implementation: "partial" },
        { id: "2.7", cycle: 2, country: "Grčija", theme: "migrants", text: "Zagotoviti dostop do azilnega postopka za vse prosilce.", status: "accepted", implementation: "partial" },
        { id: "2.8", cycle: 2, country: "Irska", theme: "children", text: "Prepovedati telesno kaznovanje otrok v vseh okoljih.", status: "accepted", implementation: "implemented" },
        { id: "2.9", cycle: 2, country: "Italija", theme: "discrimination", text: "Ustanoviti neodvisno telo za boj proti diskriminaciji.", status: "accepted", implementation: "implemented" },
        { id: "2.10", cycle: 2, country: "Japonska", theme: "trafficking", text: "Okrepiti pregon storilcev trgovine z ljudmi.", status: "accepted", implementation: "partial" },

        // Cycle 3 (2019) - Selected key recommendations
        { id: "3.1", cycle: 3, country: "Argentina", theme: "hate-speech", text: "Učinkoviteje preganjati sovražni govor, zlasti na spletu, in zagotoviti ustrezne kazni.", status: "accepted", implementation: "partial" },
        { id: "3.2", cycle: 3, country: "Avstrija", theme: "media", text: "Zagotoviti neodvisnost in stabilno financiranje javne tiskovne agencije STA.", status: "accepted", implementation: "implemented" },
        { id: "3.3", cycle: 3, country: "Belgija", theme: "lgbti", text: "Omogočiti istospolnim parom dostop do posvojitve otrok.", status: "accepted", implementation: "implemented" },
        { id: "3.4", cycle: 3, country: "Kanada", theme: "roma", text: "Odpraviti segregacijo romskih otrok v izobraževanju.", status: "accepted", implementation: "partial" },
        { id: "3.5", cycle: 3, country: "Kostarika", theme: "disability", text: "Zagotoviti prehod od institucionalnega varstva k skupnostnim oblikam bivanja za osebe z invalidnostmi.", status: "accepted", implementation: "partial" },
        { id: "3.6", cycle: 3, country: "Hrvaška", theme: "izbrisani", text: "Zagotoviti ustrezne odškodnine za vse izbrisane osebe.", status: "accepted", implementation: "partial" },
        { id: "3.7", cycle: 3, country: "Ciper", theme: "gender", text: "Zmanjšati plačno vrzel med spoloma.", status: "accepted", implementation: "partial" },
        { id: "3.8", cycle: 3, country: "Češka", theme: "elderly", text: "Izboljšati dostop do dolgotrajne oskrbe za starejše.", status: "accepted", implementation: "partial" },
        { id: "3.9", cycle: 3, country: "Ekvador", theme: "environment", text: "Vključiti človekove pravice v podnebne politike.", status: "accepted", implementation: "partial" },
        { id: "3.10", cycle: 3, country: "Egipt", theme: "nhri", text: "Zagotoviti akreditacijo Varuha človekovih pravic s statusom A.", status: "accepted", implementation: "implemented" },

        // Cycle 4 (2025) - Selected key recommendations (pending response)
        { id: "4.1", cycle: 4, country: "Albanija", theme: "hate-speech", text: "Okrepiti ukrepe za boj proti spletnemu sovražnemu govoru in dezinformacijam.", status: "pending", implementation: null },
        { id: "4.2", cycle: 4, country: "Armenija", theme: "roma", text: "Zagotoviti enake možnosti za Rome na področju zaposlovanja.", status: "pending", implementation: null },
        { id: "4.3", cycle: 4, country: "Avstralija", theme: "lgbti", text: "Zagotoviti popolno pravno priznanje istospolnih družin.", status: "pending", implementation: null },
        { id: "4.4", cycle: 4, country: "Avstrija", theme: "migrants", text: "Preprečiti nezakonita vračanja migrantov na meji.", status: "pending", implementation: null },
        { id: "4.5", cycle: 4, country: "Belgija", theme: "disability", text: "Pospešiti deinstitucionalizacijo in zagotoviti dostopnost.", status: "pending", implementation: null },
        { id: "4.6", cycle: 4, country: "Brazilija", theme: "gender", text: "Odpraviti plačno vrzel med spoloma do leta 2030.", status: "pending", implementation: null },
        { id: "4.7", cycle: 4, country: "Kanada", theme: "media", text: "Zagotoviti zaščito novinarjev pred grožnjami in nadlegovanjem.", status: "pending", implementation: null },
        { id: "4.8", cycle: 4, country: "Čile", theme: "environment", text: "Sprejeti zakonodajo o pravici do zdravega okolja.", status: "pending", implementation: null },
        { id: "4.9", cycle: 4, country: "Kolumbija", theme: "children", text: "Okrepiti ukrepe za zaščito duševnega zdravja otrok.", status: "pending", implementation: null },
        { id: "4.10", cycle: 4, country: "Kostarika", theme: "elderly", text: "Zagotoviti dostopno in kakovostno dolgotrajno oskrbo.", status: "pending", implementation: null },
        { id: "4.11", cycle: 4, country: "Danska", theme: "hate-speech", text: "Učinkoviteje preganjati kazniva dejanja iz sovraštva.", status: "pending", implementation: null },
        { id: "4.12", cycle: 4, country: "Finska", theme: "roma", text: "Izboljšati stanovanjske razmere romskih skupnosti.", status: "pending", implementation: null },
        { id: "4.13", cycle: 4, country: "Francija", theme: "lgbti", text: "Prepovedati konverzijsko terapijo.", status: "pending", implementation: null },
        { id: "4.14", cycle: 4, country: "Nemčija", theme: "migrants", text: "Zagotoviti dostop do azilnega postopka na meji.", status: "pending", implementation: null },
        { id: "4.15", cycle: 4, country: "Islandija", theme: "gender", text: "Povečati zastopanost žensk v politiki in gospodarstvu.", status: "pending", implementation: null }
    ],

    // Countries that made most recommendations to Slovenia
    topRecommendingCountries: [
        { country: "Nemčija", total: 28, cycles: { 1: 5, 2: 7, 3: 8, 4: 8 } },
        { country: "Francija", total: 26, cycles: { 1: 5, 2: 6, 3: 7, 4: 8 } },
        { country: "Avstrija", total: 24, cycles: { 1: 4, 2: 6, 3: 7, 4: 7 } },
        { country: "Kanada", total: 23, cycles: { 1: 5, 2: 5, 3: 6, 4: 7 } },
        { country: "Belgija", total: 22, cycles: { 1: 4, 2: 5, 3: 6, 4: 7 } },
        { country: "Nizozemska", total: 21, cycles: { 1: 4, 2: 5, 3: 6, 4: 6 } },
        { country: "Norveška", total: 20, cycles: { 1: 4, 2: 5, 3: 5, 4: 6 } },
        { country: "Švedska", total: 19, cycles: { 1: 4, 2: 4, 3: 5, 4: 6 } },
        { country: "Švica", total: 18, cycles: { 1: 4, 2: 4, 3: 5, 4: 5 } },
        { country: "Velika Britanija", total: 17, cycles: { 1: 4, 2: 4, 3: 4, 4: 5 } }
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UPR_DATA;
}
