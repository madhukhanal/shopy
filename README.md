# Shopy

Shopy is a React single-page mini e-commerce product catalog and cart project.

## Current progress

Commit 3 adds:
- Local mock product data
- Reusable `ProductCard` component
- Reusable `ProductGrid` component
- Product cards rendered with `.map()` and unique keys
- Responsive product grid styling

## Tech
- React
- Vite
- React Router DOM
- JavaScript
- CSS

## Setup

```bash
npm install
npm run dev
```

## Project structure

```text
shopy/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── ProductGrid.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Cart.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Limitations

Filtering, cart state, localStorage persistence, sorting, and checkout summary are planned for later commits.
