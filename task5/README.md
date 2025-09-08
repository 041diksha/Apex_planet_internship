Task5 – Capstone Web App

A responsive, performant, cross-browser storefront built with HTML, CSS, and JavaScript.

Features
- Responsive layout (mobile-first), accessible markup and roles
- Product listing, search, category filter
- Cart with quantity controls, persistence via localStorage
- Performance optimizations: minified CSS/JS, lazy image loading, preload, defer

Getting Started
- Open `index.html` in any modern browser (no build step required).
- For best results during local testing, use a local server to avoid CORS restrictions.

Run a quick local server
- Python 3: `python -m http.server 8080`
- Node: `npx serve .`

Then open `http://localhost:8080/Apex_planet_internship/task5/`.

Structure
- `index.html` – Routes: `#home`, `#products`, `#cart`
- `css/style.min.css` – Minified styles
- `js/app.min.js` – Minified logic (routing, filters, cart)
- `assets/` – SVG logo and hero

Performance Notes
- CSS preloaded and in a single file
- JS deferred
- Images use `loading="lazy"`
- Minimal DOM work; ARIA live regions where needed

Cross-Browser & Devices
Tested on latest Chrome and Firefox. For Safari/older browsers, core features use standard APIs. If needed, add polyfills for:
- `Element.closest`
- `Array.from`, `Set`

Checklist
- Home page loads under 1s on local
- Product filter/search responsive under 100ms
- Cart persists after refresh
- Layout works on 360px–1440px widths
- Verified on Chrome, Firefox. Safari optional.


