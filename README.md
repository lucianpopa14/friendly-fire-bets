# Friendly Fire: pariurile

Pagină simplă (TypeScript + Vite) cu pariurile dintre Moise și Vlad: ce s-a pariat, termenul și scorul general.

## Adaugi sau rezolvi un pariu
Editezi doar `src/bets.ts`. Scorul, starea („Mai sunt 12 zile", „Termen depășit") și sortarea se calculează automat.

## Rulare locală
```bash
npm install
npm run dev
```

## Publicare pe GitHub Pages
1. Creează un repo și urcă tot proiectul pe `main`.
2. În repo: Settings → Pages → Source: **GitHub Actions**.
3. Orice push pe `main` rebuild-uiește și publică site-ul (workflow-ul e în `.github/workflows/deploy.yml`).
