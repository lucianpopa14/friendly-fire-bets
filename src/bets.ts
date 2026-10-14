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
    id: "ep01-vizualizari",
    episode: "Ep. 1",
    madeOn: "2026-09-02",
    deadline: "2026-09-30",
    title: "Episodul 1 trece de 100.000 de vizualizări într-o lună",
    moise: "Da, trece",
    vlad: "Nu, rămâne sub",
    stakes: "Cel care pierde plătește cina",
    winner: "moise",
    note: "A ajuns la 118.000 pe 30 septembrie.",
  },
  {
    id: "ep02-vreme",
    episode: "Ep. 2",
    madeOn: "2026-09-16",
    deadline: "2026-10-05",
    title: "Prima ninsoare la Brașov înainte de 5 octombrie",
    moise: "Nu ninge",
    vlad: "Ninge",
    winner: "vlad",
  },
];
