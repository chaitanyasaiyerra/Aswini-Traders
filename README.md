# 👗 ASWINI TRADERS — Premium Women's Fashion Boutique

> **Tradition • Elegance • Everyday You**
> An online fashion showroom and inventory management platform built for **ASWINI TRADERS** (Visakhapatnam, Andhra Pradesh, India). Customers can browse curated collections of Sarees, Kurtis, Co-ord Sets, and Nightwear, filter by price or category, and place direct enquiries via WhatsApp with pre-filled product details.

---

## ✨ Key Features

### 🛍️ Customer Storefront

* **Luxury Indian Boutique UI:** Designed with Warm Cream (`#F6EFE5`), Deep Burgundy (`#650D24`), and Muted Gold (`#C5A15B`) accents.
* **Interactive Homepage:** Top announcement bar, sticky header with circular `'A'` monogram crest, split hero carousel, *Shop by Category* grid, trust strip, *New Arrivals*, and dual promotional banners.
* **All Products & Category Pages:** Filter by category, live price range slider (`₹0 – ₹5000`), stock availability (`In Stock` / `Out of Stock`), search by Product Name or Product ID (`AT-SAR-001`), sorting, and pagination.
* **Product Details Page:** Multi-image gallery, discount badge (`% OFF`), stock status pill, fabric & care specification table, quantity selector, and related product recommendations.
* **1-Click WhatsApp Ordering:** Automatically generates a formatted WhatsApp message containing the Product Name, Product ID, Category, Price, Quantity, and Link connected directly to `+91 9182433043`.
* **About Us & Contact Us Pages:** Dedicated brand story showcase and customer enquiry form with Visakhapatnam store contact details.

### 🔐 Admin Dashboard (For Store Owner)

* **Secure Admin Login:** Dedicated login portal to manage inventory.
* **Dashboard Overview:** Live KPI cards tracking *Total Products*, *Available*, *Out of Stock*, and *Categories*.
* **Full Product Management (CRUD):** Add new products, upload product images, edit prices/specifications, delete items, or toggle *In Stock / Out of Stock* with a single click.
* **Category & Business Settings Manager:** Add/remove product categories and update store WhatsApp numbers, phone numbers, email, and announcement banners without touching code.

---

## 🛠️ Tech Stack

* **Frontend:** React 19 + Vite
* **Styling:** Tailwind CSS v3 + Custom SVG Botanical Ornaments
* **Icons:** Lucide React + Custom Brand SVGs
* **Backend / Database:** Supabase (PostgreSQL Database + Cloud Image Storage) with automatic LocalStorage fallback

---

## 🚀 Step-by-Step Local Setup Guide (Run on Your Laptop)

Follow these exact commands in your terminal to set up and run the project from scratch:

### 1. Prerequisites

Ensure you have **Node.js (v18+)** installed:

```bash
node -v
npm -v

```

### 2. Create or Clone the Project

If setting up a fresh Vite + React folder:

```bash
# Create Vite React project
npm create vite@latest aswini-traders -- --template react

# Navigate into project directory
cd aswini-traders

```

### 3. Install All Required Dependencies

Run these commands inside the `aswini-traders` folder:

```bash
# Install core dependencies, icons, and cloud database SDKs
npm install
npm install lucide-react firebase @supabase/supabase-js

# Install Tailwind CSS v3
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

```

### 4. Configure Tailwind CSS

1. Open **`tailwind.config.js`** and ensure it contains:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

2. Open **`src/index.css`** and replace everything with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

### 5. Start the Development Server

```bash
npm run dev

```

Open the local URL shown in your terminal (e.g., `http://localhost:5173/` or `http://localhost:5174/`) in your browser.

---

## ☁️ Step-by-Step Supabase Cloud Database Setup

Connecting Supabase makes all uploaded products and images live across all devices (phones, tablets, and laptops).

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a new project named **`aswini-traders`**.
2. Choose **Mumbai (`ap-south-1`)** as the region.

### Step 2: Run the Database & Storage SQL Script

Open **SQL Editor → + New Query** in your Supabase Dashboard, paste the SQL below, and click **Run**:

```sql
-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT DEFAULT '',
  price NUMERIC NOT NULL,
  original_price NUMERIC DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  badge TEXT DEFAULT '',
  is_new_arrival BOOLEAN DEFAULT true,
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  fabric TEXT DEFAULT 'Premium Cotton',
  length TEXT DEFAULT '6.3 Meters (With Blouse)',
  blouse TEXT DEFAULT 'Contrast Blouse (Included)',
  work TEXT DEFAULT 'Printed Design',
  care TEXT DEFAULT 'Dry Clean / Hand Wash',
  occasion TEXT DEFAULT 'Daily Wear, Office Wear, Casual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  banner_image TEXT DEFAULT ''
);

-- 3. Business Settings Table
CREATE TABLE IF NOT EXISTS public.business_settings (
  id INT PRIMARY KEY DEFAULT 1,
  store_name TEXT DEFAULT 'ASWINI TRADERS',
  tagline TEXT DEFAULT 'Premium Fashion for Every You',
  whatsapp TEXT DEFAULT '919182433043',
  phone_display TEXT DEFAULT '+91 9182433043',
  secondary_phone TEXT DEFAULT '+91 6304526779',
  email TEXT DEFAULT 'aswinitraders@gmail.com',
  address TEXT DEFAULT 'Visakhapatnam, Andhra Pradesh, India',
  hours TEXT DEFAULT 'Mon - Sat, 9AM - 8PM',
  announcement TEXT DEFAULT 'Free Shipping on Orders Above ₹999 (Within India)'
);

INSERT INTO public.business_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.business_settings FOR SELECT USING (true);

CREATE POLICY "Admin Write Products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Settings" ON public.business_settings FOR ALL USING (true) WITH CHECK (true);

-- 5. Create Public Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public View Product Images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin Upload Product Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Admin Delete Product Images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

```

### Step 3: Add Environment Variables (`.env`)

Create a `.env` file in the root folder (`aswini-traders/.env`) and add your Supabase credentials from **Project Settings → API**:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

```

### Step 4: Create `src/supabaseClient.js`

Create `src/supabaseClient.js` and add:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

```

---

## 🔑 Default Admin Login Credentials

To access the Admin Dashboard locally:

* **Click:** `Admin Login` button in the top-right navigation bar
* **Email:** `admin@aswinitraders.com`
* **Password:** `Aswini@2026`

---

## 📂 Project Structure

```text
aswini-traders/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx              # Main storefront, pages, WhatsApp flow & Admin Dashboard
│   ├── supabaseClient.js    # Supabase PostgreSQL & Storage connection
│   ├── main.jsx             # React DOM entry point
│   └── index.css            # Tailwind CSS directives
├── .env                     # Supabase API credentials (keep private)
├── index.html               # HTML root template
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite bundler configuration
└── README.md                # Project documentation

```

---

## 📦 Build & Deployment (Vercel / Netlify)

To create an optimized production build:

```bash
npm run build

```

To preview the production build locally:

```bash
npm run preview

```

**Deploying to Vercel:**

1. Push your project to GitHub.
2. Import the repository on [vercel.com](https://vercel.com).
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Environment Variables**.
4. Click **Deploy**.

---

## 📞 Business Contact Details

* **Brand:** ASWINI TRADERS
* **WhatsApp Enquiries:** +91 9182433043
* **Customer Support Phone:** +91 6304526779
* **Email:** aswinitraders@gmail.com
* **Location:** Visakhapatnam, Andhra Pradesh, India