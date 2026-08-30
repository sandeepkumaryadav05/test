# Devansh Dairy Farm — Frontend E-Commerce

A premium, production-quality **frontend-only** dairy e-commerce website built with React + Vite.

> "Pure From Our Farm to Your Family."

## Stack
- React 18 + Vite
- Tailwind CSS
- React Router (lazy routes)
- Framer Motion (animations)
- Lucide React (icons)
- Context API + localStorage persistence — no backend anywhere.

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Push this folder to a Git repo (or use the Vercel CLI: `vercel`).
2. Framework preset: **Vite** · Build command `npm run build` · Output dir `dist`.
3. `vercel.json` already includes SPA rewrites for clean URLs.

## Features
- Home with animated hero, categories, best sellers, offers (coupon `FRESH20`), subscription planner, testimonials carousel, gallery preview.
- Shop with debounced search (`/shop?search=milk`), category/price/rating/availability filters and 5 sort modes.
- Product details with image gallery, weight variants, nutrition accordions, reviews & related products.
- Cart & Wishlist persisted via localStorage; coupon engine; free-delivery progress bar.
- Frontend-only checkout with validation → order saved to localStorage → animated order-success page.
- Account page: profile, orders, wishlist, addresses, subscriptions, settings/danger-zone.
- `/admin` demo dashboard: stats, revenue chart, product/category/testimonial/coupon CRUD, order status updates — all in localStorage.
- 404 page, skeletons, empty states, SEO meta per page, responsive from 320px up.

All data is mock/local. No servers, databases or payments are involved.
