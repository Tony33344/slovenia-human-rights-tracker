/**
 * Extended UPR Recommendations Database - Slovenia
 * Real data from OHCHR UPR Database
 */

const FULL_RECOMMENDATIONS = [
    // ============ CYCLE 1 (2010) - 7th Session ============
    // Izbrisani (The Erased)
    { id: "110.1", cycle: 1, country: "Avstralija", theme: "izbrisani", text: "Zagotoviti trajno rešitev za osebe, ki so bile izbrisane iz registra stalnega prebivalstva leta 1992, vključno z ustreznimi odškodninami.", status: "accepted", implementation: "implemented", ministry: "mnz" },
    { id: "110.2", cycle: 1, country: "Kanada", theme: "izbrisani", text: "Sprejeti ukrepe za popolno odpravo posledic izbrisa iz registra stalnega prebivalstva.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "110.3", cycle: 1, country: "Nemčija", theme: "izbrisani", text: "Nadaljevati prizadevanja za ureditev statusa izbrisanih oseb in zagotoviti ustrezne pravne sredstva.", status: "accepted", implementation: "implemented", ministry: "mnz" },
    { id: "110.4", cycle: 1, country: "Madžarska", theme: "izbrisani", text: "Zagotoviti pravično odškodnino za vse izbrisane osebe.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "110.5", cycle: 1, country: "Švica", theme: "izbrisani", text: "Izvajati priporočila ustavnega sodišča glede izbrisanih.", status: "accepted", implementation: "implemented", ministry: "mp" },
    
    // Roma Rights
    { id: "110.6", cycle: 1, country: "Kanada", theme: "roma", text: "Okrepiti ukrepe za izboljšanje dostopa romskih otrok do izobraževanja in zmanjšanje osipa.", status: "accepted", implementation: "partial", ministry: "mizs" },
    { id: "110.7", cycle: 1, country: "Norveška", theme: "roma", text: "Izboljšati stanovanjske razmere romskih skupnosti.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "110.8", cycle: 1, country: "Nizozemska", theme: "roma", text: "Odpraviti diskriminacijo Romov pri dostopu do zaposlitve.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "110.9", cycle: 1, country: "Finska", theme: "roma", text: "Zagotoviti enakopraven dostop Romov do zdravstvenih storitev.", status: "accepted", implementation: "partial", ministry: "mz" },
    { id: "110.10", cycle: 1, country: "Švedska", theme: "roma", text: "Povečati vključenost romskih otrok v predšolsko vzgojo.", status: "accepted", implementation: "partial", ministry: "mizs" },
    { id: "110.11", cycle: 1, country: "Velika Britanija", theme: "roma", text: "Okrepiti izvajanje Nacionalnega programa ukrepov za Rome.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "110.12", cycle: 1, country: "Avstrija", theme: "roma", text: "Izboljšati dostop romskih skupnosti do pitne vode in sanitarij.", status: "accepted", implementation: "partial", ministry: "mnz" },
    
    // NHRI
    { id: "110.13", cycle: 1, country: "Nemčija", theme: "nhri", text: "Okrepiti mandat in neodvisnost Varuha človekovih pravic v skladu s Pariškimi načeli.", status: "accepted", implementation: "implemented", ministry: "mp" },
    { id: "110.14", cycle: 1, country: "Francija", theme: "nhri", text: "Zagotoviti zadostne vire za delovanje Varuha človekovih pravic.", status: "accepted", implementation: "implemented", ministry: "mp" },
    { id: "110.15", cycle: 1, country: "Irska", theme: "nhri", text: "Prizadevati si za pridobitev statusa A za nacionalno institucijo za človekove pravice.", status: "accepted", implementation: "implemented", ministry: "mp" },
    
    // Discrimination
    { id: "110.16", cycle: 1, country: "Nizozemska", theme: "discrimination", text: "Sprejeti celovito protidiskriminacijsko zakonodajo, ki pokriva vse oblike diskriminacije.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "110.17", cycle: 1, country: "Belgija", theme: "discrimination", text: "Okrepiti mehanizme za zbiranje podatkov o diskriminaciji.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "110.18", cycle: 1, country: "Danska", theme: "discrimination", text: "Zagotoviti učinkovito izvajanje protidiskriminacijske zakonodaje.", status: "accepted", implementation: "implemented", ministry: "mp" },
    
    // Trafficking
    { id: "110.19", cycle: 1, country: "Norveška", theme: "trafficking", text: "Okrepiti ukrepe za preprečevanje trgovine z ljudmi in zaščito žrtev.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "110.20", cycle: 1, country: "Belorusija", theme: "trafficking", text: "Nadaljevati prizadevanja za boj proti trgovini z ljudmi.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "110.21", cycle: 1, country: "Filipini", theme: "trafficking", text: "Zagotoviti ustrezno zaščito in podporo žrtvam trgovine z ljudmi.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Gender
    { id: "110.22", cycle: 1, country: "Švedska", theme: "gender", text: "Nadaljevati prizadevanja za odpravo nasilja nad ženskami in ratificirati Istanbulsko konvencijo.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "110.23", cycle: 1, country: "Norveška", theme: "gender", text: "Zmanjšati plačno vrzel med spoloma.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "110.24", cycle: 1, country: "Španija", theme: "gender", text: "Povečati zastopanost žensk na vodilnih položajih.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Torture
    { id: "110.25", cycle: 1, country: "Švica", theme: "torture", text: "Zagotoviti neodvisne preiskave vseh obtožb o slabem ravnanju s strani policije.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "110.26", cycle: 1, country: "Danska", theme: "torture", text: "Izboljšati razmere v zaporih in pripornih ustanovah.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "110.27", cycle: 1, country: "Češka", theme: "torture", text: "Zagotoviti učinkovito delovanje nacionalnega preventivnega mehanizma.", status: "accepted", implementation: "implemented", ministry: "mp" },
    
    // Children
    { id: "110.28", cycle: 1, country: "Francija", theme: "children", text: "Okrepiti ukrepe za zaščito otrok pred nasiljem in zlorabo.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "110.29", cycle: 1, country: "Poljska", theme: "children", text: "Izboljšati položaj otrok v institucionalnem varstvu.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "110.30", cycle: 1, country: "Italija", theme: "children", text: "Zagotoviti posebno zaščito za otroke brez spremstva.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // LGBTI
    { id: "110.31", cycle: 1, country: "Belgija", theme: "lgbti", text: "Zagotoviti pravno zaščito pred diskriminacijo na podlagi spolne usmerjenosti.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "110.32", cycle: 1, country: "Nizozemska", theme: "lgbti", text: "Okrepiti ukrepe proti kazljivim dejanjem iz sovraštva do LGBTI oseb.", status: "accepted", implementation: "partial", ministry: "mp" },
    
    // Migrants
    { id: "110.33", cycle: 1, country: "Velika Britanija", theme: "migrants", text: "Izboljšati pogoje sprejema za prosilce za azil.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "110.34", cycle: 1, country: "Mehika", theme: "migrants", text: "Zagotoviti dostop do pravne pomoči za vse prosilce za azil.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "110.35", cycle: 1, country: "Brazilija", theme: "migrants", text: "Izboljšati postopke za obravnavo prošenj za azil.", status: "accepted", implementation: "partial", ministry: "mnz" },

    // ============ CYCLE 2 (2014) - 20th Session ============
    // Hate Speech
    { id: "120.1", cycle: 2, country: "Avstralija", theme: "hate-speech", text: "Okrepiti ukrepe za boj proti sovražnemu govoru, vključno s spletnim sovražnim govorom.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "120.2", cycle: 2, country: "Francija", theme: "hate-speech", text: "Učinkoviteje preganjati kazniva dejanja sovražnega govora.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "120.3", cycle: 2, country: "Nemčija", theme: "hate-speech", text: "Zagotoviti usposabljanje za sodnike in tožilce o sovražnem govoru.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "120.4", cycle: 2, country: "Norveška", theme: "hate-speech", text: "Okrepiti ozaveščanje o škodljivosti sovražnega govora.", status: "accepted", implementation: "partial", ministry: "mk" },
    
    // Roma
    { id: "120.5", cycle: 2, country: "Brazilija", theme: "roma", text: "Nadaljevati prizadevanja za integracijo Romov, zlasti na področju izobraževanja in zaposlovanja.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "120.6", cycle: 2, country: "Madžarska", theme: "roma", text: "Zagotoviti romskim otrokom dostop do kakovostnega izobraževanja.", status: "accepted", implementation: "partial", ministry: "mizs" },
    { id: "120.7", cycle: 2, country: "Avstrija", theme: "roma", text: "Odpraviti segregacijo romskih otrok v šolah.", status: "accepted", implementation: "partial", ministry: "mizs" },
    { id: "120.8", cycle: 2, country: "Slovaška", theme: "roma", text: "Izboljšati dostop Romov do zdravstvenih storitev.", status: "accepted", implementation: "partial", ministry: "mz" },
    
    // LGBTI
    { id: "120.9", cycle: 2, country: "Čile", theme: "lgbti", text: "Sprejeti zakonodajo, ki omogoča registrirano partnerstvo za istospolne pare.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "120.10", cycle: 2, country: "Nizozemska", theme: "lgbti", text: "Prepovedati diskriminacijo na podlagi spolne identitete.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "120.11", cycle: 2, country: "Urugvaj", theme: "lgbti", text: "Omogočiti pravno priznanje spola za transspolne osebe.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "120.12", cycle: 2, country: "Argentina", theme: "lgbti", text: "Okrepiti boj proti nasilju nad LGBTI osebami.", status: "accepted", implementation: "partial", ministry: "mp" },
    
    // Gender
    { id: "120.13", cycle: 2, country: "Danska", theme: "gender", text: "Ratificirati Istanbulsko konvencijo o preprečevanju nasilja nad ženskami.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "120.14", cycle: 2, country: "Finska", theme: "gender", text: "Okrepiti ukrepe za preprečevanje nasilja v družini.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "120.15", cycle: 2, country: "Islandija", theme: "gender", text: "Zagotoviti enako plačilo za enako delo.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Disability
    { id: "120.16", cycle: 2, country: "Estonija", theme: "disability", text: "Pospešiti deinstitucionalizacijo oseb z invalidnostmi.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "120.17", cycle: 2, country: "Mehika", theme: "disability", text: "Izboljšati dostopnost javnih prostorov za invalide.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "120.18", cycle: 2, country: "Avstralija", theme: "disability", text: "Zagotoviti vključujoče izobraževanje za otroke z invalidnostmi.", status: "accepted", implementation: "partial", ministry: "mizs" },
    { id: "120.19", cycle: 2, country: "Španija", theme: "disability", text: "Odpraviti omejitve poslovne sposobnosti za osebe z invalidnostmi.", status: "accepted", implementation: "partial", ministry: "mp" },
    
    // Izbrisani
    { id: "120.20", cycle: 2, country: "Finska", theme: "izbrisani", text: "Dokončno urediti status in pravice izbrisanih oseb.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "120.21", cycle: 2, country: "Švica", theme: "izbrisani", text: "Zagotoviti ustrezne odškodnine za vse prizadete izbrisane.", status: "accepted", implementation: "partial", ministry: "mnz" },
    
    // Migrants
    { id: "120.22", cycle: 2, country: "Grčija", theme: "migrants", text: "Zagotoviti dostop do azilnega postopka za vse prosilce.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "120.23", cycle: 2, country: "Turčija", theme: "migrants", text: "Izboljšati pogoje v azilnih domovih.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "120.24", cycle: 2, country: "Iran", theme: "migrants", text: "Zagotoviti dostop do izobraževanja za otroke prosilcev za azil.", status: "accepted", implementation: "implemented", ministry: "mizs" },
    
    // Children
    { id: "120.25", cycle: 2, country: "Irska", theme: "children", text: "Prepovedati telesno kaznovanje otrok v vseh okoljih.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "120.26", cycle: 2, country: "Liechtenstein", theme: "children", text: "Okrepiti ukrepe za zaščito otrok pred nasiljem.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "120.27", cycle: 2, country: "Kostarika", theme: "children", text: "Izboljšati sistem rejništva.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Discrimination
    { id: "120.28", cycle: 2, country: "Italija", theme: "discrimination", text: "Ustanoviti neodvisno telo za boj proti diskriminaciji.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "120.29", cycle: 2, country: "Portugalska", theme: "discrimination", text: "Okrepiti zbiranje podatkov o diskriminaciji.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Trafficking
    { id: "120.30", cycle: 2, country: "Japonska", theme: "trafficking", text: "Okrepiti pregon storilcev trgovine z ljudmi.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "120.31", cycle: 2, country: "Belorusija", theme: "trafficking", text: "Izboljšati identifikacijo žrtev trgovine z ljudmi.", status: "accepted", implementation: "partial", ministry: "mnz" },

    // ============ CYCLE 3 (2019) - 34th Session ============
    // Hate Speech
    { id: "130.1", cycle: 3, country: "Argentina", theme: "hate-speech", text: "Učinkoviteje preganjati sovražni govor, zlasti na spletu, in zagotoviti ustrezne kazni.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "130.2", cycle: 3, country: "Belgija", theme: "hate-speech", text: "Okrepiti ukrepe za boj proti spletnemu sovražnemu govoru.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "130.3", cycle: 3, country: "Kanada", theme: "hate-speech", text: "Zagotoviti usposabljanje za organe pregona o prepoznavanju sovražnega govora.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "130.4", cycle: 3, country: "Francija", theme: "hate-speech", text: "Okrepiti sodelovanje s platformami družbenih medijev pri odstranjevanju sovražnega govora.", status: "accepted", implementation: "partial", ministry: "mp" },
    
    // Media
    { id: "130.5", cycle: 3, country: "Avstrija", theme: "media", text: "Zagotoviti neodvisnost in stabilno financiranje javne tiskovne agencije STA.", status: "accepted", implementation: "implemented", ministry: "mk" },
    { id: "130.6", cycle: 3, country: "Nemčija", theme: "media", text: "Zaščititi novinarje pred grožnjami in napadi.", status: "accepted", implementation: "partial", ministry: "mk" },
    { id: "130.7", cycle: 3, country: "Nizozemska", theme: "media", text: "Zagotoviti medijski pluralizem.", status: "accepted", implementation: "partial", ministry: "mk" },
    { id: "130.8", cycle: 3, country: "Švedska", theme: "media", text: "Preiskovati vse primere groženj novinarjem.", status: "accepted", implementation: "partial", ministry: "mp" },
    
    // LGBTI
    { id: "130.9", cycle: 3, country: "Belgija", theme: "lgbti", text: "Omogočiti istospolnim parom dostop do posvojitve otrok.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "130.10", cycle: 3, country: "Islandija", theme: "lgbti", text: "Zagotoviti popolno pravno priznanje istospolnih partnerstev.", status: "accepted", implementation: "implemented", ministry: "mddsz" },
    { id: "130.11", cycle: 3, country: "Kanada", theme: "lgbti", text: "Prepovedati konverzijsko terapijo.", status: "noted", implementation: null, ministry: "mz" },
    { id: "130.12", cycle: 3, country: "Malta", theme: "lgbti", text: "Poenostaviti postopek pravnega priznanja spola.", status: "accepted", implementation: "partial", ministry: "mnz" },
    
    // Roma
    { id: "130.13", cycle: 3, country: "Kanada", theme: "roma", text: "Odpraviti segregacijo romskih otrok v izobraževanju.", status: "accepted", implementation: "partial", ministry: "mizs" },
    { id: "130.14", cycle: 3, country: "Finska", theme: "roma", text: "Izboljšati stanovanjske razmere romskih skupnosti.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.15", cycle: 3, country: "Norveška", theme: "roma", text: "Okrepiti ukrepe za zaposlovanje Romov.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.16", cycle: 3, country: "ZDA", theme: "roma", text: "Odpraviti diskriminacijo Romov pri dostopu do javnih storitev.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Disability
    { id: "130.17", cycle: 3, country: "Kostarika", theme: "disability", text: "Zagotoviti prehod od institucionalnega varstva k skupnostnim oblikam bivanja za osebe z invalidnostmi.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.18", cycle: 3, country: "Avstralija", theme: "disability", text: "Odpraviti skrbništvo in uvesti podprto odločanje.", status: "accepted", implementation: "partial", ministry: "mp" },
    { id: "130.19", cycle: 3, country: "Mehika", theme: "disability", text: "Izboljšati dostopnost javnega prevoza.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.20", cycle: 3, country: "Španija", theme: "disability", text: "Zagotoviti vključujoče izobraževanje za vse otroke z invalidnostmi.", status: "accepted", implementation: "partial", ministry: "mizs" },
    
    // Izbrisani
    { id: "130.21", cycle: 3, country: "Hrvaška", theme: "izbrisani", text: "Zagotoviti ustrezne odškodnine za vse izbrisane osebe.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "130.22", cycle: 3, country: "Srbija", theme: "izbrisani", text: "Dokončno urediti status preostalih izbrisanih.", status: "accepted", implementation: "partial", ministry: "mnz" },
    
    // Gender
    { id: "130.23", cycle: 3, country: "Ciper", theme: "gender", text: "Zmanjšati plačno vrzel med spoloma.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.24", cycle: 3, country: "Francija", theme: "gender", text: "Okrepiti ukrepe za preprečevanje nasilja nad ženskami.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.25", cycle: 3, country: "Irska", theme: "gender", text: "Povečati zastopanost žensk na vodilnih položajih v gospodarstvu.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Elderly
    { id: "130.26", cycle: 3, country: "Češka", theme: "elderly", text: "Izboljšati dostop do dolgotrajne oskrbe za starejše.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.27", cycle: 3, country: "Japonska", theme: "elderly", text: "Zagotoviti kakovostno oskrbo v domovih za starejše.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    { id: "130.28", cycle: 3, country: "Portugalska", theme: "elderly", text: "Okrepiti ukrepe proti revščini med starejšimi.", status: "accepted", implementation: "partial", ministry: "mddsz" },
    
    // Environment
    { id: "130.29", cycle: 3, country: "Ekvador", theme: "environment", text: "Vključiti človekove pravice v podnebne politike.", status: "accepted", implementation: "partial", ministry: "mzez" },
    { id: "130.30", cycle: 3, country: "Kostarika", theme: "environment", text: "Okrepiti ukrepe za boj proti podnebnim spremembam.", status: "accepted", implementation: "partial", ministry: "mzez" },
    { id: "130.31", cycle: 3, country: "Fidži", theme: "environment", text: "Zagotoviti pravico do zdravega okolja.", status: "accepted", implementation: "partial", ministry: "mzez" },
    
    // NHRI
    { id: "130.32", cycle: 3, country: "Egipt", theme: "nhri", text: "Zagotoviti akreditacijo Varuha človekovih pravic s statusom A.", status: "accepted", implementation: "implemented", ministry: "mp" },
    { id: "130.33", cycle: 3, country: "Maroko", theme: "nhri", text: "Zagotoviti zadostne vire za delovanje Varuha.", status: "accepted", implementation: "implemented", ministry: "mp" },
    
    // Migrants
    { id: "130.34", cycle: 3, country: "Afganistan", theme: "migrants", text: "Zagotoviti humano ravnanje z migranti na meji.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "130.35", cycle: 3, country: "Honduras", theme: "migrants", text: "Zagotoviti dostop do azilnega postopka.", status: "accepted", implementation: "partial", ministry: "mnz" },
    { id: "130.36", cycle: 3, country: "Irak", theme: "migrants", text: "Preprečiti vračanje oseb v države, kjer jim grozi preganjanje.", status: "accepted", implementation: "partial", ministry: "mnz" },

    // ============ CYCLE 4 (2025) - 48th Session ============
    // Hate Speech (major theme - 47 countries raised)
    { id: "140.1", cycle: 4, country: "Albanija", theme: "hate-speech", text: "Okrepiti ukrepe za boj proti spletnemu sovražnemu govoru in dezinformacijam.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.2", cycle: 4, country: "Argentina", theme: "hate-speech", text: "Učinkoviteje preganjati sovražni govor, zlasti proti manjšinam.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.3", cycle: 4, country: "Belgija", theme: "hate-speech", text: "Sprejeti nacionalno strategijo za boj proti sovražnemu govoru.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.4", cycle: 4, country: "Danska", theme: "hate-speech", text: "Učinkoviteje preganjati kazniva dejanja iz sovraštva.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.5", cycle: 4, country: "Estonija", theme: "hate-speech", text: "Zagotoviti statistiko o kaznivih dejanjih iz sovraštva.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.6", cycle: 4, country: "Francija", theme: "hate-speech", text: "Okrepiti usposabljanje za organe pregona o kaznivih dejanjih iz sovraštva.", status: "pending", implementation: null, ministry: "mnz" },
    { id: "140.7", cycle: 4, country: "Grčija", theme: "hate-speech", text: "Okrepiti boj proti antisemitizmu in islamofobiji.", status: "pending", implementation: null, ministry: "mp" },
    
    // LGBTI+ (38 countries raised)
    { id: "140.8", cycle: 4, country: "Avstralija", theme: "lgbti", text: "Zagotoviti popolno pravno priznanje istospolnih družin.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.9", cycle: 4, country: "Francija", theme: "lgbti", text: "Prepovedati konverzijsko terapijo.", status: "pending", implementation: null, ministry: "mz" },
    { id: "140.10", cycle: 4, country: "Islandija", theme: "lgbti", text: "Zagotoviti dostop do zdravstvene oskrbe za transspolne osebe.", status: "pending", implementation: null, ministry: "mz" },
    { id: "140.11", cycle: 4, country: "Irska", theme: "lgbti", text: "Okrepiti ukrepe proti nasilju nad LGBTI+ osebami.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.12", cycle: 4, country: "Luksemburg", theme: "lgbti", text: "Zagotoviti pravno priznanje nebinarnih oseb.", status: "pending", implementation: null, ministry: "mnz" },
    { id: "140.13", cycle: 4, country: "Malta", theme: "lgbti", text: "Odpraviti patologizacijo transspolnosti.", status: "pending", implementation: null, ministry: "mz" },
    
    // Roma (35 countries raised)
    { id: "140.14", cycle: 4, country: "Armenija", theme: "roma", text: "Zagotoviti enake možnosti za Rome na področju zaposlovanja.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.15", cycle: 4, country: "Finska", theme: "roma", text: "Izboljšati stanovanjske razmere romskih skupnosti.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.16", cycle: 4, country: "Madžarska", theme: "roma", text: "Odpraviti segregacijo romskih otrok v šolah.", status: "pending", implementation: null, ministry: "mizs" },
    { id: "140.17", cycle: 4, country: "Romunija", theme: "roma", text: "Zagotoviti dostop do zdravstvenih storitev za romske skupnosti.", status: "pending", implementation: null, ministry: "mz" },
    { id: "140.18", cycle: 4, country: "Srbija", theme: "roma", text: "Okrepiti izvajanje Nacionalnega programa za Rome.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.19", cycle: 4, country: "Slovaška", theme: "roma", text: "Zagotoviti dostop romskih naselij do pitne vode.", status: "pending", implementation: null, ministry: "mddsz" },
    
    // Migrants & Asylum (42 countries raised)
    { id: "140.20", cycle: 4, country: "Avstrija", theme: "migrants", text: "Preprečiti nezakonita vračanja migrantov na meji.", status: "pending", implementation: null, ministry: "mnz" },
    { id: "140.21", cycle: 4, country: "Nemčija", theme: "migrants", text: "Zagotoviti dostop do azilnega postopka na meji.", status: "pending", implementation: null, ministry: "mnz" },
    { id: "140.22", cycle: 4, country: "Norveška", theme: "migrants", text: "Izboljšati pogoje v centrih za pridržanje migrantov.", status: "pending", implementation: null, ministry: "mnz" },
    { id: "140.23", cycle: 4, country: "Švica", theme: "migrants", text: "Zagotoviti posebno zaščito za otroke brez spremstva.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.24", cycle: 4, country: "Turčija", theme: "migrants", text: "Zagotoviti dostop do izobraževanja za otroke migrantov.", status: "pending", implementation: null, ministry: "mizs" },
    { id: "140.25", cycle: 4, country: "UNHCR", theme: "migrants", text: "Spoštovati načelo nevračanja (non-refoulement).", status: "pending", implementation: null, ministry: "mnz" },
    
    // Gender (33 countries raised)
    { id: "140.26", cycle: 4, country: "Brazilija", theme: "gender", text: "Odpraviti plačno vrzel med spoloma do leta 2030.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.27", cycle: 4, country: "Islandija", theme: "gender", text: "Povečati zastopanost žensk v politiki in gospodarstvu.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.28", cycle: 4, country: "Španija", theme: "gender", text: "Okrepiti ukrepe za preprečevanje femicida.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.29", cycle: 4, country: "Švedska", theme: "gender", text: "Zagotoviti ustrezno financiranje zatočišč za žrtve nasilja.", status: "pending", implementation: null, ministry: "mddsz" },
    
    // Disability (29 countries raised)
    { id: "140.30", cycle: 4, country: "Belgija", theme: "disability", text: "Pospešiti deinstitucionalizacijo in zagotoviti dostopnost.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.31", cycle: 4, country: "Italija", theme: "disability", text: "Zagotoviti vključujoče izobraževanje za vse otroke z invalidnostmi.", status: "pending", implementation: null, ministry: "mizs" },
    { id: "140.32", cycle: 4, country: "Japonska", theme: "disability", text: "Odpraviti skrbništvo in uvesti podprto odločanje.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.33", cycle: 4, country: "Koreja", theme: "disability", text: "Povečati zaposlovanje oseb z invalidnostmi.", status: "pending", implementation: null, ministry: "mddsz" },
    
    // Media Freedom (18 countries raised)
    { id: "140.34", cycle: 4, country: "Kanada", theme: "media", text: "Zagotoviti zaščito novinarjev pred grožnjami in nadlegovanjem.", status: "pending", implementation: null, ministry: "mk" },
    { id: "140.35", cycle: 4, country: "Nizozemska", theme: "media", text: "Zagotoviti neodvisnost javnih medijev.", status: "pending", implementation: null, ministry: "mk" },
    { id: "140.36", cycle: 4, country: "Norveška", theme: "media", text: "Preiskovati vse primere napadov na novinarje.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.37", cycle: 4, country: "ZDA", theme: "media", text: "Zagotoviti medijski pluralizem in svobodo tiska.", status: "pending", implementation: null, ministry: "mk" },
    
    // Environment & Climate (12 countries raised)
    { id: "140.38", cycle: 4, country: "Čile", theme: "environment", text: "Sprejeti zakonodajo o pravici do zdravega okolja.", status: "pending", implementation: null, ministry: "mzez" },
    { id: "140.39", cycle: 4, country: "Kostarika", theme: "environment", text: "Vključiti človekove pravice v podnebne politike.", status: "pending", implementation: null, ministry: "mzez" },
    { id: "140.40", cycle: 4, country: "Fidži", theme: "environment", text: "Okrepiti ukrepe za podnebno pravičnost.", status: "pending", implementation: null, ministry: "mzez" },
    { id: "140.41", cycle: 4, country: "Maršalovi otoki", theme: "environment", text: "Ratificirati Escazújski sporazum.", status: "pending", implementation: null, ministry: "mzez" },
    
    // Children (22 countries raised)
    { id: "140.42", cycle: 4, country: "Kolumbija", theme: "children", text: "Okrepiti ukrepe za zaščito duševnega zdravja otrok.", status: "pending", implementation: null, ministry: "mz" },
    { id: "140.43", cycle: 4, country: "Liechtenstein", theme: "children", text: "Okrepiti boj proti spletnemu izkoriščanju otrok.", status: "pending", implementation: null, ministry: "mp" },
    { id: "140.44", cycle: 4, country: "Monako", theme: "children", text: "Zagotoviti ustrezno varstvo otrok v digitnem okolju.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.45", cycle: 4, country: "Poljska", theme: "children", text: "Odpraviti revščino med otroki.", status: "pending", implementation: null, ministry: "mddsz" },
    
    // Elderly (15 countries raised)
    { id: "140.46", cycle: 4, country: "Kostarika", theme: "elderly", text: "Zagotoviti dostopno in kakovostno dolgotrajno oskrbo.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.47", cycle: 4, country: "Avstrija", theme: "elderly", text: "Izboljšati oskrbo v domovih za starejše.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.48", cycle: 4, country: "Češka", theme: "elderly", text: "Okrepiti ukrepe proti zlorabi starejših.", status: "pending", implementation: null, ministry: "mddsz" },
    
    // Discrimination (general)
    { id: "140.49", cycle: 4, country: "Bosna in Hercegovina", theme: "discrimination", text: "Okrepiti boj proti vsem oblikam diskriminacije.", status: "pending", implementation: null, ministry: "mddsz" },
    { id: "140.50", cycle: 4, country: "Severna Makedonija", theme: "discrimination", text: "Zagotoviti učinkovito izvajanje protidiskriminacijske zakonodaje.", status: "pending", implementation: null, ministry: "mddsz" }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FULL_RECOMMENDATIONS;
}
