# Shopy

Shopy is a React single-page mini e-commerce application built for a React course project.

## Features

- Product catalog using local mock data
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
└── README.md
```

## Current Progress

Commit 8 adds a controlled checkout form and checkout confirmation flow, plus accessibility and responsive polish. The checkout is a front-end demo and does not process real payments or orders.

## Limitations

- Products come from local mock data.
- Product images use placeholder image URLs.
- Checkout does not connect to a payment provider or backend.
- Cart data is stored only in the browser's local storage.

## Screenshots

Add project screenshots here before final submission, for example:

- Home/product catalog
- Search/filter/sort controls
- Cart page
- Checkout form
