# Commercial Lending DSCR Calculator

A free, browser-based debt service coverage ratio (DSCR) calculator for commercial lending professionals.

🔗 **[Live Tool](https://kjs236.github.io/commercial-lending-debt-service-calculator/)**

---

## What it does

- Calculates monthly payment, annual debt service, and DSCR instantly as you type
- Supports both amortizing and interest-only loans
- Color-coded DSCR output (green above 1.25x, red below)
- Max loan sizing at 1.20x, 1.25x, and 1.30x DSCR targets
- Loan constant output
- Mobile responsive

## Why I built it

I'm targeting CRE and commercial lending tech roles and wanted to demonstrate both domain knowledge (debt underwriting) and the ability to ship a functional web tool from scratch.

## Tech stack

- HTML, CSS, vanilla JavaScript — no dependencies
- Hosted on GitHub Pages

## Formulas used

- **PMT** — standard amortizing payment formula
- **DSCR** — NOI / Annual Debt Service
- **Max loan** — solved from target DSCR and debt service constant
- **IO payment** — Loan × (rate / 12)