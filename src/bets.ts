// ──────────────────────────────────────────────────────────────
// Aici adaugi pariurile. Atât. Restul paginii se calculează singur.
//
// Pariu nou:      adaugă un obiect în lista de mai jos.
// Pariu rezolvat: adaugă `winner: "moise" | "vlad" | "draw"`
//                 și, opțional, `note` cu o explicație.
// Datele sunt în format AAAA-LL-ZZ.
//
// ATENȚIE: pariurile de mai jos sunt EXEMPLE. Șterge-le și pune-le pe cele reale.
// ──────────────────────────────────────────────────────────────

export type Winner = "moise" | "vlad" | "draw";

export interface Bet {
  id: string;
  episode: string; // ex. "Ep. 42"
  madeOn: string; // data episodului
  deadline: string; // până când se decide pariul
  title: string; // despre ce e pariul
  moise: string; // ce susține Moise
  vlad: string; // ce susține Vlad
  stakes?: string; // miza, dacă există
  winner?: Winner; // lipsește cât timp pariul e deschis
  note?: string; // cum s-a decis
}

export const bets: Bet[] = [
  {
    id: "guvernul-vestea-vot",
    episode: "Friendly Fire #67",
    madeOn: "2026-06-17",
    deadline: "",
    title: "Guvernul Veștea trece de Parlament cu peste 240 de voturi",
    moise: "Da, trece cu peste 240 de voturi",
    vlad: "Nu, nu se ajunge acolo atât de simplu",
    stakes: "O sticlă de vin",
    winner: "vlad",
    note: "Guvernul Veștea nu a fost învestit; premierul desemnat a afirmat că „voturile nu le-am strâns, am fost asigurat că există”.",
  },
  {
    id: "guvernul-vestea-retragere",
    episode: "Friendly Fire #67",
    madeOn: "2026-06-17",
    deadline: "",
    title: "Veștea nu se retrage singur (ca Tomac), ci prin decret oficial de retragere emis de Nicușor Dan",
    moise: "Da, va fi nevoie de decret de retragere",
    vlad: "Nu, se va retrage de la sine",
    stakes: "O sticlă de vin",
    winner: "draw",
    note: "Nu am găsit o decontare explicită în sursele publice.",
  },
  {
    id: "siegfried-muresan",
    episode: "Friendly Fire Special – Dacă Siegfried a fost o cacealma",
    madeOn: "2026-10-01",
    deadline: "2026-10-07",
    title: "Siegfried Mureșan trece de votul Parlamentului",
    moise: "Da, trece („și soacră-mea ar trece dacă ar fi numită prim-ministru”)",
    vlad: "Nu, are îndoieli, mai ales după poziționarea PSD",
    stakes: "A doua sticlă de vin din serie",
    winner: "vlad",
    note: "Guvernul Mureșan nu a trecut, confirmat de ei la episodul #77 („Guvernul care nici n-a fost”).",
  },
  {
    id: "guvernul-niculescu",
    episode: "Friendly Fire #78",
    madeOn: "2026-10-07",
    deadline: "",
    title: "Guvernul Luca Niculescu (nominalizarea a IV-a) trece de Parlament",
    moise: "Sceptic – parlamentarii își fac calcule proprii și se tem de anticipate („Nu plecă bă nimeni, că nu e gară!”)",
    vlad: "Da, trece – motive obiective (rectificarea bugetară) și subiective",
    stakes: "O sticlă de vin",
    winner: "draw",
    note: "Încă în curs la data de 20 octombrie 2026; PSD a decis să susțină un guvern „PSDan”. Dezbaterea de învestitură e iminentă.",
  },
  {
    id: "anticipate",
    episode: "Pariu ongoing (episoade multiple)",
    madeOn: "2026-06-17",
    deadline: "",
    title: "Nu se vor organiza niciodată alegeri anticipate în România ( Constituția actuală)",
    moise: "Deschis la scenariul anticipate",
    vlad: "Niciodată nu se vor organiza",
    stakes: "O sticlă de vin",
    winner: "draw",
    note: "Pariu „ongoing” menționut constant;",
  },
  
];
