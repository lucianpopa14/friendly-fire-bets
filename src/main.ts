import "./style.css";
import { bets, type Bet, type Winner } from "./bets";

type Filter = "all" | "open" | "done";
type State = "done" | "pending" | "open";
type Player = Exclude<Winner, "draw">;

const NAME: Record<Player, string> = { moise: "Moise", vlad: "Vlad" };

const dateFmt = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// ── date helpers ─────────────────────────────────────────────
const parse = (iso: string) => new Date(`${iso}T00:00:00`);

function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((parse(iso).getTime() - today.getTime()) / 86_400_000);
}

function stateOf(bet: Bet): State {
  if (bet.winner) return "done";
  if(!bet.deadline) return "open";
  return daysUntil(bet.deadline) < 0 ? "pending" : "open";
}

// ── tiny DOM helper (textContent only, so no HTML injection) ─
function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className = "",
  text = "",
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// ── score ────────────────────────────────────────────────────
function tally() {
  const t = { moise: 0, vlad: 0, draw: 0, open: 0, pending: 0 };
  for (const bet of bets) {
    const state = stateOf(bet);
    if (bet.winner) t[bet.winner]++;
    else if (state === "pending") t.pending++;
    else t.open++;
  }
  return t;
}

function renderBoard(): HTMLElement {
  const t = tally();
  const decided = t.moise + t.vlad;
  const share = decided === 0 ? 50 : (t.moise / decided) * 100;

  const board = h("section", "board");
  board.setAttribute("aria-label", "Scor general");

  const side = (who: Player) => {
    const el = h("div", `side ${who}`);
    el.append(h("span", "name", NAME[who]), h("span", "num", String(t[who])));
    return el;
  };

  const tug = h("div", "tug");
  tug.setAttribute("role", "img");
  tug.setAttribute(
    "aria-label",
    `Moise ${t.moise}, Vlad ${t.vlad}`,
  );
  const fill = h("span", "tug-fill");
  fill.style.width = "50%";
  tug.append(fill);
  // animate from the middle to the real share once, after first paint
  requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.width = `${share}%`)));

  const parts = [`${bets.length} pariuri`, `${t.open} deschise`];
  if (t.pending) parts.push(`${t.pending} așteaptă verdictul`);
  if (t.draw) parts.push(`${t.draw} egalități`);

  board.append(side("moise"), side("vlad"), tug, h("p", "tally", parts.join(", ")));
  return board;
}

// ── bets list ────────────────────────────────────────────────
function statusText(bet: Bet): string {
  switch (stateOf(bet)) {
    case "done":
      return bet.winner === "draw" ? "Egalitate" : `A câștigat ${NAME[bet.winner as Player]}`;
    case "pending":
      return "Termen depășit, așteaptă verdictul";
    case "open": {
      if (!bet.deadline) return "Fără termen, în desfășurare";
      const d = daysUntil(bet.deadline);
      if (d === 0) return "Se decide azi";
      if (d === 1) return "Se decide mâine";
      return `Mai sunt ${d} zile`;
    }
  }
}

function renderBet(bet: Bet): HTMLElement {
  const state = stateOf(bet);
  const li = h("li", `bet ${state} ${bet.winner ?? ""}`.trim());

  const main = h("div", "bet-main");
  main.append(
    h("h3", "bet-title", bet.title),
    h("p", "bet-ep", `${bet.episode}, pariat pe ${dateFmt.format(parse(bet.madeOn))}`),
  );

  const sides = h("dl", "sides");
  for (const who of ["moise", "vlad"] as const) {
    const row = h("div", `pick ${who}`);
    row.append(h("dt", "", NAME[who]), h("dd", "", bet[who]));
    sides.append(row);
  }
  main.append(sides);
  if (bet.stakes) main.append(h("p", "stakes", `Miza: ${bet.stakes}`));
  if (bet.note) main.append(h("p", "note", bet.note));

  const aside = h("div", "bet-state");
  aside.append(h("span", "status", statusText(bet)));
  if (bet.deadline) {
  aside.append(h("span", "deadline", `Termen: ${dateFmt.format(parse(bet.deadline))}`));
  }

  li.append(main, aside);
  return li;
}

function sortBets(list: Bet[]): Bet[] {
  const when = (b: Bet) => parse(b.deadline || b.madeOn).getTime();
  // unresolved first (soonest deadline on top, no-deadline last), then resolved (latest on top)
  return [...list].sort((a, b) => {
    const aDone = a.winner ? 1 : 0;
    const bDone = b.winner ? 1 : 0;
    if (aDone !== bDone) return aDone - bDone;
    if (aDone) return when(b) - when(a);
    const ad = a.deadline ? when(a) : Infinity;
    const bd = b.deadline ? when(b) : Infinity;
    return ad === bd ? 0 : ad < bd ? -1 : 1;
  });
}

function matches(bet: Bet, filter: Filter): boolean {
  if (filter === "all") return true;
  return filter === "done" ? !!bet.winner : !bet.winner;
}

// ── page ─────────────────────────────────────────────────────
function mount(root: HTMLElement) {
  let filter: Filter = "all";

  const header = h("header", "top");
  header.append(h("h1", "", "Friendly Fire: pariurile"), h("p", "sub", "Moise vs. Vlad, scorul pariurilor din podcast"));

  const filters: [Filter, string][] = [
    ["all", "Toate"],
    ["open", "Deschise"],
    ["done", "Rezolvate"],
  ];
  const bar = h("div", "filters");
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "Filtrează pariurile");

  const list = h("ul", "bets");

  const draw = () => {
    list.replaceChildren();
    const visible = sortBets(bets.filter((b) => matches(b, filter)));
    if (visible.length === 0) {
      list.append(h("li", "empty", bets.length === 0 ? "Niciun pariu încă. Adaugă-l în src/bets.ts." : "Niciun pariu aici."));
    } else {
      visible.forEach((b) => list.append(renderBet(b)));
    }
    bar.querySelectorAll("button").forEach((btn) =>
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter)),
    );
  };

  for (const [value, label] of filters) {
    const btn = h("button", "", label);
    btn.type = "button";
    btn.dataset.filter = value;
    btn.addEventListener("click", () => {
      filter = value;
      draw();
    });
    bar.append(btn);
  }

  root.append(header, renderBoard(), bar, list);
  draw();
}

mount(document.getElementById("app")!);
