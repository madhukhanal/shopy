# Shopy

Shopy is a React single-page mini e-commerce application built for a React course project.

## Features

- Product catalog using local mock data
- Reusable `ProductCard` and `ProductGrid` components
- Search products by name or description
- Filter products by category
- Sort products by name and price
- Add products to the shopping cart
- Increase, decrease, and remove cart items
- Running cart item count and total
- Cart persistence with `localStorage`
- Checkout summary
- Controlled checkout form with validation
- Conditional checkout success message
- React Router with Home and Cart views
- Responsive layout for desktop, tablet, and mobile

## Technical Requirements Covered

- Functional React components
- Reusable components
- Props passed from parent to child
- `useState` for interactive state
- `useEffect` for cart persistence
- `.map()` with unique keys
- Controlled form inputs
- Conditional rendering
- React Router for multiple views
- Responsive CSS layout

## Tech Stack

- React
- React Router
- Vite
- JavaScript
- CSS
- Browser `localStorage`

## Setup

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

To check the code with ESLint:

```bash
npm run lint
```

## Project Structure

```text
shopy/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── ProductGrid.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── Cart.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Final QA Checklist

Before submission, verify:

- [ ] `npm run build` completes successfully
- [ ] `npm run lint` has no errors
- [ ] Home page loads correctly
- [ ] Search and category filtering work
- [ ] Sorting works
- [ ] Products can be added to the cart
- [ ] Cart quantities can be changed
- [ ] Cart items can be removed
- [ ] Cart survives a browser refresh
- [ ] Checkout form validates required fields
- [ ] Demo checkout confirmation appears
- [ ] Home and Cart routes work
- [ ] Layout works on mobile and desktop
- [ ] Browser console has no errors or warnings

## Screenshots

Add project screenshots here before final submission, for example:

1. Home/product catalog
2. Search, category, and sort controls
3. Cart and checkout summary
4. Checkout form/confirmation

## Limitations

- Products come from local mock data.
- Product images use placeholder image URLs.
- Checkout does not connect to a payment provider or backend.
- Cart data is stored only in the browser's local storage.

## Academic Note

This project is intended to demonstrate understanding of React fundamentals, component reuse, state management, routing, forms, and responsive UI.
