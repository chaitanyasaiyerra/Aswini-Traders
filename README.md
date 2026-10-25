# 🛍️ Aswini Traders — E-Commerce Storefront

A fast, mobile-first, white-label e-commerce storefront built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**. Designed for boutiques, fashion retailers, and direct-to-consumer brands, this storefront syncs in real time with a decoupled Admin CMS Portal and converts shoppers directly via **WhatsApp Ordering**.

---

## ✨ Key Features

- **Real-Time Cloud Catalog:** Dynamically fetches products, multi-image galleries, pricing, discounts, badges (`New`, `Trending`, `Bestseller`), and stock status from Supabase PostgreSQL.
- **Dynamic Brand & Theme Sync:** Store name, logo initials, top announcement bar, hero slideshow banners, promotional banners, About Us story, and contact details are 100% controlled from the Admin Portal without touching code.
- **Frictionless WhatsApp Checkout:** Customers can inquire about or order single products or full cart selections directly via pre-formatted WhatsApp messages containing SKU IDs, prices, and product links.
- **Smart Category & Search Filtering:** Instant client-side search by product name or SKU, category tabs, and sorting options.
- **Responsive & Mobile-First UI:** Custom mobile-friendly dropdowns, touch-optimized image galleries (`object-contain` for full garment visibility), and fast local caching.
- **Social Sharing Ready:** Pre-configured Open Graph (`og:image`, `og:title`, `og:description`) meta tags for rich link previews on WhatsApp, Instagram, and Facebook.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend & Database:** Supabase (PostgreSQL + Cloud Storage)
- **Hosting & CI/CD:** Vercel (Auto-deploy via GitHub)

---

## 📂 Project Structure

```text
aswini-traders/
├── public/
│   └── preview.jpg          # Local Open Graph social share thumbnail
├── src/
│   ├── App.jsx              # Main storefront application, cart & WhatsApp routing
│   ├── supabaseClient.js    # Supabase client initialization
│   ├── main.jsx             # React DOM entry point
│   └── index.css            # Global styles & Tailwind imports
├── index.html               # HTML entry with Open Graph (og:image) meta tags
├── .env                     # Environment variables (Supabase URL & Anon Key)
├── package.json
└── vite.config.js
```

---

## 🚀 Local Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/chaitanyasaiyerra/Aswini-Traders.git
cd aswini-traders
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a **`.env`** file in the root folder and add your Supabase project credentials:

```env
VITE_SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

### 4. Start the development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🖼️ Customizing the WhatsApp / Social Share Link Preview

1. Save your preferred store thumbnail image inside the **`public/`** folder as `preview.jpg` (recommended size: `1200x630px`, under `300 KB`).
2. Ensure the following Open Graph tags are inside the `<head>` section of **`index.html`**:

```html
<meta property="og:title" content="ASWINI TRADERS — Premium Fashion" />
<meta property="og:description" content="Traditional & Contemporary Fashion Woven with Elegance." />
<meta property="og:image" content="/preview.jpg" />
```

---

## 🌐 Deploying to Vercel

1. Push your code to a GitHub repository.
2. Import the repository into **[Vercel](https://vercel.com)**.
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Any future `git push` to your main branch will automatically redeploy the live store in ~30 seconds.
