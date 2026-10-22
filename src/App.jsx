import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Sparkles,
  Headphones,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { supabase } from './supabaseClient';

// Custom SVG Brand Icons (fixes icon compatibility crashes)
const Instagram = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3v6Z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill={fill} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

// ============================================================================
// INITIAL REALISTIC CATALOG & BUSINESS DATA FOR ASWINI TRADERS
// ============================================================================
const INITIAL_BUSINESS_SETTINGS = {
  brandName: '',
  brandSubtitle: '',
  brandInitial: '',
  footerBio: '',
  aboutDescription: '',
  tagline: 'Chaitu-Traders – Premium Fashion for Everyone',
  subTagline: 'Tradition Woven with Elegance',
  whatsapp: '',
  whatsappDisplay: '',
  phone: '',
  phoneHours: 'Mon - Sat, 9AM - 8PM',
  email: 'aswinitraders@gmail.com',
  location: 'Visakhapatnam, Andhra Pradesh, India',
  announcementLeft: 'Free Shipping on Orders Above ₹999 (Within India)',
  announcementCenter: 'Aswini-Traders – Premium Fashion for Everyone',
  whatsappUrl: '',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  bannerImages: [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1400&q=85'
  ],
  aboutImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'
};

const INITIAL_CATEGORIES = [
  {
    id: 'cat-sarees',
    name: 'Sarees',
    slug: 'Sarees',
    subtitle: 'Graceful drapes for every occasion',
    description: 'Explore our signature collection of traditional, festive, and everyday sarees handpicked for elegance.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: true
  },
  {
    id: 'cat-cotton-sarees',
    name: 'Cotton Sarees',
    slug: 'Cotton Sarees',
    subtitle: 'Soft • Breathable • Elegant drapes for daily grace',
    description: 'Pure handloom and printed cotton sarees crafted for all-day comfort and timeless poise.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: true
  },
  {
    id: 'cat-fancy-sarees',
    name: 'Fancy Sarees',
    slug: 'Fancy Sarees',
    subtitle: 'Contemporary shimmer and festive elegance',
    description: 'Lightweight organza, georgette, and designer fancy sarees ideal for celebrations and evening gatherings.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: true
  },
  {
    id: 'cat-embroidered-sarees',
    name: 'Embroidered Sarees',
    slug: 'Embroidered Sarees',
    subtitle: 'Intricate threadwork and artisanal craftsmanship',
    description: 'Delicate floral and traditional embroidery woven onto fine fabrics for memorable occasions.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: true
  },
  {
    id: 'cat-worked-sarees',
    name: 'Worked Sarees',
    slug: 'Worked Sarees',
    subtitle: 'Rich zari, stone, and festive border work',
    description: 'Grand bridal and partywear worked sarees featuring intricate zari weaves and embellished borders.',
    image: 'https://images.unsplash.com/photo-1610030469668-8e9f64122417?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: false
  },
  {
    id: 'cat-linen-cotton',
    name: 'Linen Cotton Sarees',
    slug: 'Linen Cotton Sarees',
    subtitle: 'Crisp textures with understated sophistication',
    description: 'Refined linen-cotton blends with subtle zari borders and botanical prints for office and daytime wear.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: false
  },
  {
    id: 'cat-kurtis',
    name: 'Kurtis',
    slug: 'Kurtis',
    displaySub: 'Full-Length Tops',
    subtitle: 'Comfortable & stylish everyday ethnic wear',
    description: 'From embroidered festive kurtis to breathable flared full-length tops for work and casual outings.',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: true
  },
  {
    id: 'cat-coord-sets',
    name: 'Co-ord Sets',
    slug: 'Co-ord Sets',
    subtitle: 'Trendy matching sets for modern elegance',
    description: 'Effortlessly coordinated ethnic and fusion two-piece sets tailored with contemporary prints.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: true
  },
  {
    id: 'cat-nightwear',
    name: "Women's Nightwear",
    slug: "Women's Nightwear",
    subtitle: 'Comfort for your relaxed moments',
    description: 'Ultra-soft, breathable cotton night suits and lounge sets designed for restful sleep and home comfort.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85',
    featuredOnHome: true
  }
];

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: 'TRADITION • ELEGANCE • EVERYDAY YOU',
    title: 'ASWINI TRADERS',
    subtitle: 'Premium Fashion for Every You',
    ctaText: 'Explore Collection',
    targetCategory: 'All',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85'
  },
  {
    id: 2,
    eyebrow: 'GRACE IN EVERY DRAPE',
    title: 'HANDPICKED SAREES',
    subtitle: 'Pure Cotton, Fancy & Festive Weaves Crafted with Love',
    ctaText: 'Shop Sarees',
    targetCategory: 'Sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=85'
  },
  {
    id: 3,
    eyebrow: 'EFFORTLESS EVERYDAY STYLE',
    title: 'KURTIS & CO-ORD SETS',
    subtitle: 'Breathable Fabrics & Contemporary Silhouettes for Every Occasion',
    ctaText: 'Explore Kurtis & Sets',
    targetCategory: 'Kurtis',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1400&q=85'
  }
];

// Helper to determine available sizes/variants based on category
const getVariantsForProduct = (product) => {
  const cat = (product?.category || '').toLowerCase();
  if (cat.includes('saree')) return ['Free Size (With Blouse)'];
  return ['S', 'M', 'L', 'XL', 'XXL'];
};

// ============================================================================
// CUSTOM SVG BOTANICAL & ORNAMENTAL MOTIFS
// ============================================================================
const LotusIcon = ({ className = 'w-6 h-6', color = '#C5A15B' }) => (
  <svg viewBox="0 0 40 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2C17.5 8 15 13 20 22C25 13 22.5 8 20 2Z" fill={color} fillOpacity="0.85" />
    <path d="M20 22C14 19 9 13 11 6C14 9 16.5 14 20 22Z" fill={color} fillOpacity="0.65" />
    <path d="M20 22C26 19 31 13 29 6C26 9 23.5 14 20 22Z" fill={color} fillOpacity="0.65" />
    <path d="M20 22C11 22 4 18 3 12C8 13 14 16 20 22Z" fill={color} fillOpacity="0.45" />
    <path d="M20 22C29 22 36 18 37 12C32 13 26 16 20 22Z" fill={color} fillOpacity="0.45" />
    <path d="M8 25H32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// ============================================================================
// STOREFRONT BRAND LOGO COMPONENT (Dynamic & Global - Zero Old Fallbacks)
// ============================================================================
const BrandLogo = ({ onClick, size = 'default', light = false, businessSettings }) => {
  const isCompact = size === 'compact';

  // Strictly use ONLY what comes from Admin Portal / Cache
  const initial = businessSettings?.brandInitial || '';
  const name = businessSettings?.brandName || '';
  const subtitle = businessSettings?.brandSubtitle || '';

  // Wait silently if data is not yet loaded on a first-time visit instead of flashing old names
  if (!name) {
    return <div className={isCompact ? 'h-9 w-28 sm:h-10 sm:w-36' : 'h-11 w-36 sm:h-14 sm:w-48'} />;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-2 sm:gap-3 text-left focus:outline-none cursor-pointer min-w-0 shrink-0"
    >
      {initial && (
        <div
          className={`relative flex items-center justify-center rounded-full border-2 border-[#C5A15B] shrink-0 ${
            light ? 'bg-[#4E081B]/90' : 'bg-gradient-to-br from-[#FAF6F0] to-[#EFE5D8]'
          } shadow-sm transition-transform duration-300 group-hover:scale-105 ${
            isCompact ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'
          }`}
        >
          <div className="absolute inset-1 rounded-full border border-[#C5A15B]/50 pointer-events-none" />
          <span
            className={`font-serif font-bold tracking-tight ${ light ? 'text-[#E6D3A7]' : 'text-[#650D24]' } ${isCompact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {initial}
          </span>
        </div>
      )}

      <div className="flex flex-col items-center min-w-0">
        <span
          className={`font-serif font-bold tracking-[0.1em] sm:tracking-[0.12em] leading-none truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none ${ light ? 'text-[#FAF6F0]' : 'text-[#650D24]' } ${isCompact ? 'text-base sm:text-lg' : 'text-base sm:text-xl md:text-2xl'}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {name}
        </span>
        {subtitle && (
          <div className="flex items-center gap-1 sm:gap-1.5 mt-1">
            <span className="h-[1px] w-2.5 sm:w-4 bg-[#C5A15B]" />
            <span
              className={`text-[9px] sm:text-[11px] font-medium tracking-[0.22em] sm:tracking-[0.26em] uppercase ${
                light ? 'text-[#E6D3A7]' : 'text-[#7A122D]'
              }`}
            >
              {subtitle}
            </span>
            <span className="h-[1px] w-2.5 sm:w-4 bg-[#C5A15B]" />
          </div>
        )}
        <div className="mt-0.5">
          <LotusIcon className="w-3.5 h-2 sm:w-4 sm:h-2.5" color="#C5A15B" />
        </div>
      </div>
    </button>
  );
};

// ============================================================================
// REUSABLE PRODUCT CARD COMPONENT
// ============================================================================
const ProductCard = ({ product, isWishlisted, onToggleWishlist, onAddToCart, onViewDetails }) => {
  const badgeStyle = useMemo(() => {
    if (!product.badge) return null;
    const b = product.badge.toLowerCase();
    if (b === 'new') return 'bg-[#650D24] text-[#FAF6F0]';
    if (b === 'trending' || b === 'bestseller') return 'bg-gradient-to-r from-[#C5A15B] to-[#B08A42] text-white';
    return 'bg-[#650D24] text-white';
  }, [product.badge]);

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group cursor-pointer bg-[#FAF6F0] rounded-xl border border-[#E5D9C8] p-2 sm:p-3 transition-all duration-300 hover:shadow-md hover:border-[#C5A15B] flex flex-col justify-between h-full"
    >
      <div>
        <div className="relative aspect-[4/4.3] w-full rounded-lg overflow-hidden bg-[#EFE5D8]">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}

            onClick={(event) => {
              if (window.matchMedia?.('(hover: none)').matches) {
                event.stopPropagation();
                setIsTouchZoomed((zoomed) => !zoomed);
              }
            }}

            
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {product.badge && (
            <span className={`absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-sm ${badgeStyle}`}>
              {product.badge}
            </span>
          )}

          {product.inStock === true ? (
            <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wide bg-[#1E7E34]/90 text-white backdrop-blur-xs">
              Available
            </span>
          ) : (
            <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-red-900/90 text-white">
              Out of Stock
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#E5D9C8] flex items-center justify-center text-[#650D24] hover:bg-[#650D24] hover:text-white transition-colors shadow-sm cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#650D24] text-[#650D24] hover:fill-white' : ''}`} />
          </button>
        </div>

        <div className="pt-2.5 sm:pt-3 px-0.5">
          <h3 className="font-medium text-[#3A1F24] text-xs sm:text-[15px] leading-snug line-clamp-1 group-hover:text-[#650D24] transition-colors">
            {product.name}
          </h3>

          <div className="mt-1 flex items-baseline flex-wrap gap-1.5 sm:gap-2">
            <span className="font-bold text-[#650D24] text-sm sm:text-lg">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
              <span className="text-[11px] sm:text-xs text-[#8C7A6B] line-through">
                ₹{Number(product.originalPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-[#8C7A6B] tracking-wide uppercase truncate">
            {product.sku || product.id}
          </p>
        </div>
      </div>

      <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) {
              const defaultVariant = getVariantsForProduct(product)[0];
              onAddToCart(product, 1, defaultVariant);
            }
          }}
          className="flex-1 py-2 px-2 sm:px-2.5 rounded-lg bg-[#650D24] hover:bg-[#4E081B] text-[#FAF6F0] text-[11px] sm:text-xs font-medium tracking-wide transition-colors shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer min-w-0"
          aria-label={`Add ${product.name} to Cart`}
        >
          <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Add to Cart</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="py-2 px-2 sm:px-2.5 rounded-lg border border-[#DECBB4] bg-[#F6EFE5] hover:bg-[#EFE5D8] text-[#650D24] text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer shrink-0"
          aria-label={`View details for ${product.name}`}
          title="View Product Details"
        >
          Details
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProductId, setSelectedProductId] = useState('AT-SAR-001');
  const [globalSearch, setGlobalSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [footerSareesOpen, setFooterSareesOpen] = useState(false);

  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('store_live_products');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const cached = localStorage.getItem('store_live_categories');
      return cached ? JSON.parse(cached) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [businessSettings, setBusinessSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('store_live_settings');
      return cached ? { ...INITIAL_BUSINESS_SETTINGS, ...JSON.parse(cached) } : INITIAL_BUSINESS_SETTINGS;
    } catch {
      return INITIAL_BUSINESS_SETTINGS;
    }
  });
  const [inquiries, setInquiries] = useState([]);

  // Persistent Wishlist State (saved in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aswini_wishlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter(item => item && (item.id || item.sku || typeof item === 'string')) : [];
    } catch (e) {
      return [];
    }
  });

  // Persistent Shopping Cart State (saved in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aswini_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aswini_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Wishlist save error:', e);
    }
  }, [wishlist]);

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aswini_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Cart save error:', e);
    }
  }, [cart]);

  useEffect(() => {
    const storeTitle = [businessSettings.brandName, businessSettings.brandSubtitle].filter(Boolean).join(' ') || 'ASWINI TRADERS';
    const tag = businessSettings.tagline || 'Premium Fashion for Everyone';
    document.title = `${storeTitle} –${tag}`;
  }, [businessSettings.brandName, businessSettings.brandSubtitle, businessSettings.tagline]);

  // Deep Link Routing: Open specific product page if URL has ?product=SKU_OR_ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodParam = params.get('product');
    if (prodParam) {
      setSelectedProductId(prodParam);
      setCurrentPage('product-detail');
    }
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  // ============================================================================
  // SUPABASE REAL-TIME SYNC (PRODUCTS, CATEGORIES & SETTINGS)
  // ============================================================================
  useEffect(() => {
    if (!supabase) return;

    const loadSupabaseData = async () => {
      try {
        // 1. Fetch Products
        const { data: prodData, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!prodErr && prodData) {
          const mappedProducts = prodData.map((row) => ({
            id: row.id,
            sku: row.id,
            name: row.name,
            category: row.category,
            parentCategory: row.sub_category || 'Sarees',
            price: Number(row.price),
            originalPrice: Number(row.original_price || 0),
            inStock: Boolean(row.in_stock),
            badge: row.badge || '',
            isNewArrival: row.is_new_arrival,
            images: row.gallery?.length ? row.gallery : [row.image],
            description: row.description,
            specs: {
              fabric: row.fabric,
              length: row.length,
              blouse: row.blouse,
              work: row.work,
              care: row.care,
              occasion: row.occasion,
            },
            createdAt: row.created_at,
          }));
          setProducts(mappedProducts);
          localStorage.setItem('store_live_products', JSON.stringify(mappedProducts));
        }

        // 2. Fetch Categories
        const { data: catData, error: catErr } = await supabase
          .from('categories')
          .select('*');

        if (!catErr && catData && catData.length > 0) {
          const mappedCats = catData.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.name,
            subtitle: c.subtitle || '',
            description: c.description || '',
            image: c.image || '',
            featuredOnHome: true,
          }));
          setCategories(mappedCats);
          localStorage.setItem('store_live_categories', JSON.stringify(mappedCats));
        }

        // 3. Fetch Business Settings
        const { data: setRow } = await supabase
          .from('business_settings')
          .select('*')
          .eq('id', 1)
          .single();

        if (setRow) {
          setBusinessSettings((prev) => {
            const resolvedTagline =
              setRow.tagline ?? prev.tagline ?? 'Chaitu-Traders – Premium Fashion for Everyone';
            const resolvedAnnouncementLeft =
              setRow.announcement ?? prev.announcementLeft ?? 'Free Shipping on Orders Above ₹999 (Within India)';

            // Extract clean digits from WhatsApp Order Number (or Display Number if Order Number is empty)
            const rawOrderDigits = String(setRow.whatsapp || setRow.phone_display || prev.whatsapp || '').replace(/[^0-9]/g, '');
            const resolvedWhatsappDisplay =
              setRow.phone_display?.trim() ||
              prev.whatsappDisplay ||
              (rawOrderDigits.length === 12 && rawOrderDigits.startsWith('91')
                ? `+91 ${rawOrderDigits.slice(2, 7)}${rawOrderDigits.slice(7)}`
                : rawOrderDigits ? `+${rawOrderDigits}` : '');
            const resolvedWhatsappUrl = rawOrderDigits ? `https://wa.me/${rawOrderDigits}` : '';

            const resolvedInstagramUrl =
              setRow.instagram_url ?? setRow.instagram ?? prev.instagramUrl ?? prev.instagram ?? '';
            const resolvedYoutubeUrl =
              setRow.youtube_url ?? setRow.youtube ?? prev.youtubeUrl ?? prev.youtube ?? '';

            const updatedSettings = {
              ...prev,
              brandName: setRow.store_name ?? '',
              brandSubtitle: setRow.brand_subtitle ?? '',
              brandInitial: setRow.brand_initial ?? '',
              footerBio: setRow.footer_bio ?? '',
              aboutDescription: setRow.about_description ?? '',
              tagline: resolvedTagline,
              announcementCenter: resolvedTagline,
              announcementLeft: resolvedAnnouncementLeft,

              whatsapp: rawOrderDigits,
              whatsappDisplay: resolvedWhatsappDisplay,

              phone: setRow.secondary_phone ?? prev.phone,
              email: setRow.email ?? prev.email,
              location: setRow.address ?? prev.location,

              whatsappUrl: resolvedWhatsappUrl,

              instagramUrl: resolvedInstagramUrl,
              youtubeUrl: resolvedYoutubeUrl,
              instagram: resolvedInstagramUrl,
              youtube: resolvedYoutubeUrl,
              promoBanners: Array.isArray(setRow.promo_banners) && setRow.promo_banners.length > 0
                ? setRow.promo_banners
                : prev.promoBanners,
              heroSlides:
                Array.isArray(setRow.hero_slides) && setRow.hero_slides.length > 0
                  ? setRow.hero_slides
                  : prev.heroSlides || HERO_SLIDES,
              bannerImages:
                Array.isArray(setRow.banner_images) && setRow.banner_images.length > 0
                  ? setRow.banner_images
                  : prev.bannerImages,
              aboutImage: setRow.about_image || prev.aboutImage,
            };
            localStorage.setItem('store_live_settings', JSON.stringify(updatedSettings));
            return updatedSettings;
          });
        }
      } catch (err) {
        console.error('Supabase load error:', err);
      }
    };

    loadSupabaseData();

    const storeChannel = supabase
      .channel('aswini-live-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        loadSupabaseData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
        loadSupabaseData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'business_settings' }, () => {
        loadSupabaseData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(storeChannel);
    };
  }, []);

  // ============================================================================
  // WISHLIST & SHOPPING CART HANDLERS
  // ============================================================================
  const handleToggleWishlist = (productId) => {
    const targetProduct = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists
          ? `Removed "${targetProduct?.name || 'item'}" from your Wishlist`
          : `Saved "${targetProduct?.name || 'item'}" to your Wishlist ❤️`,
        'info'
      );
      return updated;
    });
  };

  const handleAddToCart = (product, quantity = 1, variant = '') => {
    if (!product) return;
    const selectedVariant = variant || getVariantsForProduct(product)[0] || 'Standard';
    const qtyToAdd = Math.max(1, Number(quantity) || 1);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && (item.variant || 'Standard') === selectedVariant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd
        };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          variant: selectedVariant,
          quantity: qtyToAdd,
          addedAt: new Date().toISOString()
        }
      ];
    });

    showToast(`Added "${product.name}" (${selectedVariant}) to your Cart 🛒`);
  };

  const handleUpdateCartQuantity = (productId, variant, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, variant);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && (item.variant || 'Standard') === (variant || 'Standard')
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId, variant) => {
    const targetProduct = products.find((p) => p.id === productId);
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && (item.variant || 'Standard') === (variant || 'Standard'))
      )
    );
    showToast(`Removed "${targetProduct?.name || 'item'}" from your Cart`, 'info');
  };

  const handleMoveWishlistToCart = (product) => {
    if (!product) return;
    const defaultVariant = getVariantsForProduct(product)[0] || 'Standard';
    handleAddToCart(product, 1, defaultVariant);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
    showToast(`Moved "${product.name}" to your Shopping Cart 🛒`);
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Shopping cart cleared', 'info');
  };

  // Enrich cart items with live product details from catalog
  const enrichedCartItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const unitPrice = Number(product.price) || 0;
        const subtotal = unitPrice * item.quantity;
        return {
          ...item,
          product,
          unitPrice,
          subtotal
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  const totalCartCount = useMemo(() => {
    return enrichedCartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [enrichedCartItems]);

  const cartTotalAmount = useMemo(() => {
    return enrichedCartItems.reduce((sum, item) => sum + item.subtotal, 0);
  }, [enrichedCartItems]);

  const navigateTo = (page, options = {}) => {
    if (options.category !== undefined) setSelectedCategory(options.category);
    if (options.productId !== undefined) setSelectedProductId(options.productId);
    if (options.search !== undefined) setGlobalSearch(options.search);
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (product) => {
    setSelectedProductId(product.id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Product Page URL (Uses current live window origin, avoiding localhost in production)
  const getProductPageUrl = (product) => {
    const origin = window.location.origin.includes('localhost')
      ? 'https://aswinitraders.com'
      : window.location.origin;
    return `${origin}/?product=${encodeURIComponent(product.sku || product.id)}`;
  };

  // Single Source of Truth for WhatsApp Order Number (digits) & Display Number (formatted)
  const cleanWhatsappOrderNumber = useMemo(() => {
    const orderDigits = String(businessSettings.whatsapp || '').replace(/[^0-9]/g, '');
    if (orderDigits) return orderDigits;
    return String(businessSettings.whatsappDisplay || '').replace(/[^0-9]/g, '');
  }, [businessSettings.whatsapp, businessSettings.whatsappDisplay]);

  const displayWhatsappNumber = useMemo(() => {
    if (businessSettings.whatsappDisplay && businessSettings.whatsappDisplay.trim() !== '') {
      return businessSettings.whatsappDisplay.trim();
    }
    if (cleanWhatsappOrderNumber.length === 12 && cleanWhatsappOrderNumber.startsWith('91')) {
      return `+91 ${cleanWhatsappOrderNumber.slice(2, 7)}${cleanWhatsappOrderNumber.slice(7)}`;
    }
    return cleanWhatsappOrderNumber ? `+${cleanWhatsappOrderNumber}` : '';
  }, [businessSettings.whatsappDisplay, cleanWhatsappOrderNumber]);

  const topBarWhatsappHref = useMemo(() => {
    return cleanWhatsappOrderNumber ? `https://wa.me/${cleanWhatsappOrderNumber}` : '#';
  }, [cleanWhatsappOrderNumber]);

  const topBarInstagramHref = useMemo(() => {
    return businessSettings.instagramUrl || businessSettings.instagram || 'https://instagram.com';
  }, [businessSettings.instagramUrl, businessSettings.instagram]);

  const topBarYoutubeHref = useMemo(() => {
    return businessSettings.youtubeUrl || businessSettings.youtube || 'https://youtube.com';
  }, [businessSettings.youtubeUrl, businessSettings.youtube]);

  // Single-Product WhatsApp Enquiry
  const triggerWhatsAppEnquiry = (product, quantity = 1, variant = '') => {
    if (!cleanWhatsappOrderNumber) {
      showToast('WhatsApp number is not configured in Admin Settings.', 'error');
      return;
    }
    const productLink = getProductPageUrl(product);
    const selectedVariant = variant || getVariantsForProduct(product)[0] || 'Standard';
    const unitPrice = Number(product.price) || 0;
    const subtotal = unitPrice * quantity;
    const storeTitle = [businessSettings.brandName, businessSettings.brandSubtitle].filter(Boolean).join(' ') || 'ASWINI TRADERS';

    const messageLines = [
      `✦ Hello ${storeTitle} ✦`,
      ``,
      `I'd love to check the availability of this item:`,
      `------------------------`,
      `${product.name}`,
      `Size: ${selectedVariant}`,
      `Quantity: ${quantity}`,
      `Price: ₹${unitPrice.toLocaleString('en-IN')}`,
      ``,
      `View This Piece:`,
      `${productLink}`,
      ``,
      `------------------------`,
      `Order Total: ₹${subtotal.toLocaleString('en-IN')}`,
      `------------------------`,
      ``,
      `Looking forward to hearing from you! ♡`
    ];

    const messageText = messageLines.join('\n');
    const waUrl = `https://wa.me/${cleanWhatsappOrderNumber}?text=${encodeURIComponent(messageText)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp with your product enquiry...');
  };

  // Multiple-Product Cart Order via WhatsApp
  const generateCartWhatsAppOrder = () => {
    if (enrichedCartItems.length === 0 || !cleanWhatsappOrderNumber) return null;
    const storeTitle = [businessSettings.brandName, businessSettings.brandSubtitle].filter(Boolean).join(' ') || 'ASWINI TRADERS';

    const lines = [
      `✦ Hello ${storeTitle} ✦`,
      ``,
      `I'd love to check the availability of these items:`,
      `------------------------`
    ];

    enrichedCartItems.forEach((item, index) => {
      lines.push(``);
      const p = item.product;
      const productUrl = getProductPageUrl(p);
      const itemNum = index + 1;

      lines.push(`${itemNum}.${p.name}`);
      if (item.variant) {
        lines.push(`Size: ${item.variant}`);
      }
      lines.push(`Quantity: ${item.quantity}`);
      lines.push(`Price: ₹${item.unitPrice.toLocaleString('en-IN')}`);
      lines.push(`View Product: ${productUrl}`);
    });

    lines.push(``);
    lines.push(`------------------------`);
    lines.push(`Grand Total: ₹${cartTotalAmount.toLocaleString('en-IN')}`);
    lines.push(`------------------------`);
    lines.push(``);
    lines.push(`Looking forward to hearing from you! ♡`);

    const messageText = lines.join('\n');
    const waUrl = `https://wa.me/${cleanWhatsappOrderNumber}?text=${encodeURIComponent(messageText)}`;
    return { messageText, waUrl };
  };

  const activeProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId || p.sku === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  return (
    <div
      className="min-h-screen w-full overflow-x-clip flex flex-col bg-[#F6EFE5] text-[#2D181C] selection:bg-[#650D24] selection:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* TOP INFORMATION BAR */}
      <div className="bg-[#4E081B] text-[#FAF6F0] text-[11px] sm:text-xs border-b border-[#C5A15B]/30">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-2 grid grid-cols-1 md:grid-cols-3 items-center gap-1.5 sm:gap-2">
          {/* 1. Left: Free Shipping Text */}
          <div className="flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-[#E6D3A7] text-center md:text-left">
            <Truck className="w-3.5 h-3.5 text-[#C5A15B] shrink-0" />
            <span className="font-medium tracking-wide break-words">
              {businessSettings.announcementLeft || 'Free Shipping on Orders Above ₹999 (Within India)'}
            </span>
          </div>

          {/* 2. Center: Brand Tagline Announcement */}
          <div className="text-center text-[#FAF6F0]/95 font-medium tracking-wide break-words">
            {businessSettings.tagline || businessSettings.announcementCenter || 'Chaitu-Traders – Premium Fashion for Everyone'}
          </div>

          {/* 3. Right: Social Icons */}
          <div className="flex items-center justify-center md:justify-end gap-3.5 text-[#E6D3A7]">
            <a
              href={topBarWhatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            </a>
            <a
              href={topBarInstagramHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={topBarYoutubeHref}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              title="YouTube"
              className="hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5D9C8] shadow-xs">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          <BrandLogo onClick={() => navigateTo('home')} businessSettings={businessSettings} />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigateTo('products', { category: 'All', search: globalSearch });
            }}
            className="hidden md:flex items-center flex-1 max-w-md mx-2 lg:mx-6"
          >
            <div className="relative flex w-full rounded-lg overflow-hidden border border-[#DECBB4] bg-[#F5ECE0]/80 focus-within:border-[#650D24] focus-within:bg-white transition-colors">
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search for sarees, kurtis, co-ord sets..."
                className="w-full px-3.5 py-2 text-sm text-[#2D181C] placeholder-[#8C7A6B] bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search Products"
                className="px-4 py-2 bg-[#650D24] hover:bg-[#4E081B] text-[#FAF6F0] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <nav className="hidden xl:flex items-center gap-5 text-[13.5px] font-medium text-[#3A1F24]">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`py-1 transition-colors relative cursor-pointer ${
                currentPage === 'home'
                  ? 'text-[#650D24] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#650D24]'
                  : 'hover:text-[#650D24]'
              }`}
            >
              Home
            </button>

            {/* Sarees Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('sarees')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => navigateTo('category', { category: 'Sarees' })}
                className={`flex items-center gap-1 py-1 transition-colors cursor-pointer ${
                  currentPage === 'category' && selectedCategory.includes('Saree')
                    ? 'text-[#650D24] font-semibold'
                    : 'hover:text-[#650D24]'
                }`}
              >
                <span>Sarees</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-75" />
              </button>
              {openDropdown === 'sarees' && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-[#FAF6F0] rounded-xl border border-[#E5D9C8] shadow-xl py-2 px-1.5">
                    {Array.from(
                      new Set([
                        'Sarees',
                        'Cotton Sarees',
                        'Fancy Sarees',
                        'Worked Sarees',
                        'Embroidered Sarees',
                        'Linen Cotton Sarees',
                        ...categories
                          .filter((c) => c.name.toLowerCase().includes('saree'))
                          .map((c) => c.name),
                      ])
                    ).map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => navigateTo('category', { category: sub })}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[#3A1F24] hover:bg-[#EFE5D8] hover:text-[#650D24] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>{sub === 'Sarees' ? 'All Sarees Collection' : sub}</span>
                        <ChevronRight className="w-3 h-3 text-[#C5A15B]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Non-Saree Categories */}
            {Array.from(
              new Set([
                'Kurtis',
                'Co-ord Sets',
                "Women's Nightwear",
                ...categories
                  .filter((c) => !c.name.toLowerCase().includes('saree'))
                  .map((c) => c.name),
              ])
            ).map((catName) => {
              const displayName = catName === "Women's Nightwear" ? 'Nightwear' : catName;
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => navigateTo('category', { category: catName })}
                  className={`py-1 transition-colors cursor-pointer ${
                    currentPage === 'category' && selectedCategory === catName
                      ? 'text-[#650D24] font-semibold'
                      : 'hover:text-[#650D24]'
                  }`}
                >
                  {displayName}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => navigateTo('products', { category: 'All' })}
              className={`py-1 transition-colors cursor-pointer ${
                currentPage === 'products' ? 'text-[#650D24] font-semibold' : 'hover:text-[#650D24]'
              }`}
            >
              New Arrivals
            </button>

            <button
              type="button"
              onClick={() => navigateTo('about')}
              className={`py-1 transition-colors cursor-pointer ${
                currentPage === 'about' ? 'text-[#650D24] font-semibold' : 'hover:text-[#650D24]'
              }`}
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className={`py-1 transition-colors cursor-pointer ${
                currentPage === 'contact' ? 'text-[#650D24] font-semibold' : 'hover:text-[#650D24]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* RIGHT ACTION ICONS: WISHLIST & SHOPPING CART */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('wishlist')}
              aria-label="Open Wishlist"
              title="Saved Wishlist Items"
              className={`relative p-2 sm:p-2.5 rounded-full border transition-colors cursor-pointer ${
                currentPage === 'wishlist'
                  ? 'bg-[#650D24] text-white border-[#650D24]'
                  : 'border-[#E5D9C8] bg-[#F6EFE5] text-[#650D24] hover:bg-[#EFE5D8]'
              }`}
            >
              <Heart className={`w-4 h-4 ${currentPage === 'wishlist' ? 'fill-white' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#650D24] border border-[#FAF6F0] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigateTo('cart')}
              aria-label="Open Shopping Cart"
              title="Shopping Cart"
              className={`relative p-2 sm:p-2.5 rounded-full border transition-colors cursor-pointer ${
                currentPage === 'cart'
                  ? 'bg-[#650D24] text-white border-[#650D24]'
                  : 'border-[#E5D9C8] bg-[#F6EFE5] text-[#650D24] hover:bg-[#EFE5D8]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#650D24] border border-[#FAF6F0] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-[#E5D9C8] text-[#650D24] hover:bg-[#EFE5D8] cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF6F0] border-t border-[#E5D9C8] px-4 pt-3 pb-5 space-y-3 shadow-lg max-h-[82vh] overflow-y-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigateTo('products', { category: 'All', search: globalSearch });
              }}
              className="flex rounded-lg overflow-hidden border border-[#DECBB4] bg-white"
            >
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search sarees, kurtis..."
                className="w-full px-3 py-2 text-sm focus:outline-none"
              />
              <button type="submit" className="px-4 bg-[#650D24] text-white flex items-center justify-center">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-1.5 text-sm font-medium">
              <button type="button" onClick={() => navigateTo('home')} className="text-left px-3 py-2.5 rounded-lg hover:bg-[#EFE5D8] text-[#650D24] font-semibold">
                Home
              </button>
              <button type="button" onClick={() => navigateTo('products', { category: 'All' })} className="text-left px-3 py-2.5 rounded-lg hover:bg-[#EFE5D8]">
                All Products
              </button>
              <button type="button" onClick={() => navigateTo('wishlist')} className="text-left px-3 py-2.5 rounded-lg hover:bg-[#EFE5D8] flex items-center justify-between">
                <span>Wishlist</span>
                <span className="text-xs font-bold text-[#650D24]">({wishlist.length})</span>
              </button>
              <button type="button" onClick={() => navigateTo('cart')} className="text-left px-3 py-2.5 rounded-lg hover:bg-[#EFE5D8] flex items-center justify-between">
                <span>Shopping Cart</span>
                <span className="text-xs font-bold text-[#650D24]">({totalCartCount})</span>
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => navigateTo('category', { category: c.name })}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#EFE5D8] text-xs sm:text-sm truncate"
                >
                  {c.name}
                </button>
              ))}
              <button type="button" onClick={() => navigateTo('about')} className="text-left px-3 py-2.5 rounded-lg hover:bg-[#EFE5D8]">
                About Us
              </button>
              <button type="button" onClick={() => navigateTo('contact')} className="text-left px-3 py-2.5 rounded-lg hover:bg-[#EFE5D8]">
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* PAGE VIEW ROUTER */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePageView
            products={products}
            categories={categories}
            businessSettings={businessSettings}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProduct}
            onNavigate={navigateTo}
          />
        )}
        {(currentPage === 'products' || currentPage === 'category') && (
          <CatalogPageView
            mode={currentPage}
            initialCategory={currentPage === 'category' ? selectedCategory : 'All'}
            initialSearch={globalSearch}
            products={products}
            categories={categories}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProduct}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'product-detail' && activeProduct && (
          <ProductDetailsPageView
            product={activeProduct}
            allProducts={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProduct}
            onNavigate={navigateTo}
            onWhatsAppEnquire={triggerWhatsAppEnquiry}
            showToast={showToast}
          />
        )}
        {currentPage === 'wishlist' && (
          <WishlistPageView
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onMoveToCart={handleMoveWishlistToCart}
            onViewDetails={handleViewProduct}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'cart' && (
          <CartPageView
            cartItems={enrichedCartItems}
            cartTotal={cartTotalAmount}
            businessSettings={businessSettings}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onViewDetails={handleViewProduct}
            onNavigate={navigateTo}
            onGenerateWhatsAppOrder={generateCartWhatsAppOrder}
            showToast={showToast}
          />
        )}
        {currentPage === 'about' && (
          <AboutUsPageView
            categories={categories}
            businessSettings={businessSettings}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'contact' && (
          <ContactUsPageView
            businessSettings={businessSettings}
            onNavigate={navigateTo}
            onSubmitInquiry={(inq) => {
              setInquiries((prev) => [{ ...inq, id: Date.now(), date: new Date().toLocaleDateString() }, ...prev]);
              showToast('Thank you! Your message has been received by ASWINI TRADERS.');
            }}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#4E081B] text-[#FAF6F0] border-t-2 border-[#C5A15B]/50 mt-12 sm:mt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#C5A15B]/25">
            {/* Column 1: Brand & Social Icons */}
            <div className="space-y-4">
              <BrandLogo onClick={() => navigateTo('home')} businessSettings={businessSettings} light />
              {businessSettings?.footerBio && (
                <p className="text-xs sm:text-sm text-[#E6D3A7]/90 leading-relaxed break-words">
                  {businessSettings.footerBio}
                </p>
              )}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={topBarWhatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 border border-[#C5A15B]/40 flex items-center justify-center text-[#E6D3A7] hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={topBarInstagramHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 border border-[#C5A15B]/40 flex items-center justify-center text-[#E6D3A7] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={topBarYoutubeHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 border border-[#C5A15B]/40 flex items-center justify-center text-[#E6D3A7] hover:text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Our Collections */}
            <div>
              <h4
                className="font-serif text-lg font-semibold text-[#E6D3A7] mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Collections
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF6F0]/85">
                <li
                  className="relative"
                  onMouseEnter={() => setFooterSareesOpen(true)}
                  onMouseLeave={() => setFooterSareesOpen(false)}
                >
                  <div className="flex items-center justify-between max-w-[220px]">
                    <button
                      type="button"
                      onClick={() => setFooterSareesOpen((prev) => !prev)}
                      className="hover:text-[#C5A15B] transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <span className="text-[#C5A15B]">›</span>
                      <span>Sarees</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#C5A15B] transition-transform duration-200 ${
                          footerSareesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {footerSareesOpen && (
                    <ul className="mt-2 ml-3 pl-3 border-l border-[#C5A15B]/35 space-y-1.5 text-xs text-[#E6D3A7]/90">
                      {Array.from(
                        new Set([
                          'Sarees',
                          'Cotton Sarees',
                          'Fancy Sarees',
                          'Worked Sarees',
                          'Embroidered Sarees',
                          'Linen Cotton Sarees',
                          ...categories
                            .filter((c) => c.name.toLowerCase().includes('saree'))
                            .map((c) => c.name),
                        ])
                      ).map((sub) => (
                        <li key={sub}>
                          <button
                            type="button"
                            onClick={() => navigateTo('category', { category: sub })}
                            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-0.5 text-left"
                          >
                            <span className="text-[#C5A15B] text-[10px]">•</span>
                            <span>{sub === 'Sarees' ? 'All Sarees Collection' : sub}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {Array.from(
                  new Set([
                    'Kurtis',
                    'Co-ord Sets',
                    "Women's Nightwear",
                    ...categories
                      .filter((c) => !c.name.toLowerCase().includes('saree'))
                      .map((c) => c.name),
                  ])
                ).map((catName) => (
                  <li key={catName}>
                    <button
                      type="button"
                      onClick={() => navigateTo('category', { category: catName })}
                      className="hover:text-[#C5A15B] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                    >
                      <span className="text-[#C5A15B]">›</span>
                      <span>{catName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#E6D3A7] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF6F0]/85">
                <li>
                  <button type="button" onClick={() => navigateTo('home')} className="hover:text-[#C5A15B] cursor-pointer">
                    Home Showroom
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('products', { category: 'All' })} className="hover:text-[#C5A15B] cursor-pointer">
                    All Products Catalogue
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('about')} className="hover:text-[#C5A15B] cursor-pointer text-left">
                    About {businessSettings.brandName} {businessSettings.brandSubtitle}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('contact')} className="hover:text-[#C5A15B] cursor-pointer">
                    Contact &amp; Support
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Get in Touch */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#E6D3A7] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Get in Touch
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#FAF6F0]/90">
                <li className="flex items-start gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="block text-[11px] text-[#E6D3A7]">WhatsApp Orders:</span>
                    <a href={topBarWhatsappHref} target="_blank" rel="noreferrer" className="font-medium hover:underline break-words">
                      {displayWhatsappNumber}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="block text-[11px] text-[#E6D3A7]">Phone Support:</span>
                    <span className="break-words">{businessSettings.phone}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="block text-[11px] text-[#E6D3A7]">Email:</span>
                    <span className="break-all">{businessSettings.email}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="block text-[11px] text-[#E6D3A7]">Showroom Location:</span>
                    <span className="break-words">{businessSettings.location}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#E6D3A7]/80">
            <p>© {new Date().getFullYear()} {businessSettings.brandName} {businessSettings.brandSubtitle}. All Rights Reserved.</p>
            <p>Tradition Woven with Elegance • {businessSettings.location || 'Visakhapatnam, India'}</p>
          </div>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:bottom-5 z-50 max-w-md flex items-center gap-2.5 bg-[#4E081B] text-[#FAF6F0] border border-[#C5A15B] px-4 py-3 rounded-xl shadow-xl">
          <CheckCircle2 className="w-4 h-4 text-[#C5A15B] shrink-0" />
          <span className="text-xs sm:text-sm font-medium break-words">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 1: HOMEPAGE (FULLY RESPONSIVE HERO & SECTIONS)
// ============================================================================
function HomePageView({ products, categories, businessSettings, wishlist, onToggleWishlist, onAddToCart, onViewDetails, onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo(() => {
    if (Array.isArray(businessSettings?.heroSlides) && businessSettings.heroSlides.length > 0) {
      return businessSettings.heroSlides;
    }
    return HERO_SLIDES;
  }, [businessSettings]);

  useEffect(() => {
    if (activeSlide >= slides.length) setActiveSlide(0);
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, activeSlide]);

  const currentSlide = slides[activeSlide] || slides[0];
  const homeCategories = useMemo(() => categories.filter((c) => c.featuredOnHome), [categories]);
  const newArrivals = useMemo(() => {
    const list = products.filter((p) => p.isNewArrival);
    return (list.length >= 6 ? list : products).slice(0, 6);
  }, [products]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 space-y-6 sm:space-y-10">
      {/* HERO CAROUSEL */}
      <section className="relative rounded-2xl overflow-hidden border border-[#DECBB4] shadow-sm bg-gradient-to-r from-[#F7F0E6] via-[#FAF5EE] to-[#F3E9DC]">
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-2.5 sm:left-4 top-[130px] sm:top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-xs border border-[#DECBB4] text-[#650D24] flex items-center justify-center hover:bg-[#650D24] hover:text-white transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-2.5 sm:right-4 top-[130px] sm:top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-xs border border-[#DECBB4] text-[#650D24] flex items-center justify-center hover:bg-[#650D24] hover:text-white transition-all shadow-md cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px] sm:min-h-[500px] lg:h-[550px]">
          <div className="lg:col-span-5 relative h-[240px] xs:h-[270px] sm:h-[330px] lg:h-full overflow-hidden bg-[#3B0613]">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-top transition-all duration-700"
            />
          </div>

          <div className="lg:col-span-7 relative bg-gradient-to-br from-[#F5ECE0] via-[#FAF5EE] to-[#EFE4D2] flex flex-col items-center justify-center text-center px-4 sm:px-10 md:px-12 py-6 sm:py-8 overflow-hidden h-full">
            <div className="relative z-10 flex items-center justify-center gap-2 text-[9px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.28em] text-[#7A5B3E] uppercase mb-1.5 sm:mb-2">
              <span className="h-[1px] w-5 sm:w-12 bg-[#C5A15B] shrink-0" />
              <span className="line-clamp-1">{currentSlide.eyebrow}</span>
              <span className="h-[1px] w-5 sm:w-12 bg-[#C5A15B] shrink-0" />
            </div>

            <div className="relative z-10 my-0.5 sm:my-1">
              <LotusIcon className="w-6 h-4 sm:w-9 sm:h-6" color="#B68F40" />
            </div>

            <h1
              className="relative z-10 font-serif text-xl sm:text-4xl lg:text-[48px] font-bold text-[#650D24] tracking-wide leading-tight px-2 max-w-xl break-words"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {currentSlide.title}
            </h1>

            <p
              className="relative z-10 mt-1 sm:mt-2 font-serif text-sm sm:text-xl lg:text-2xl text-[#2D181C] font-medium max-w-lg px-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {currentSlide.subtitle}
            </p>

            <div className="relative z-10 flex items-center gap-2.5 my-3 sm:my-5">
              <span className="h-[1px] w-8 sm:w-20 bg-[#C5A15B]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#650D24]" />
              <span className="h-[1px] w-8 sm:w-20 bg-[#C5A15B]" />
            </div>

            <button
              type="button"
              onClick={() =>
                currentSlide.targetCategory === 'All'
                  ? onNavigate('products', { category: 'All' })
                  : onNavigate('category', { category: currentSlide.targetCategory })
              }
              className="relative z-10 px-6 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#650D24] hover:bg-[#4E081B] text-[#FAF6F0] text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {slides.length > 1 && (
              <div className="relative z-10 flex items-center gap-2 mt-4 sm:mt-6">
                {slides.map((s, idx) => (
                  <button
                    key={s.id || idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx ? 'w-6 sm:w-7 bg-[#650D24]' : 'w-2 bg-[#C5A15B]/60 hover:bg-[#650D24]/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-5 sm:mb-6">
          <div className="hidden sm:block w-36" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D181C] text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Shop by Category
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('products', { category: 'All' })}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#650D24] hover:text-[#4E081B] cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 auto-cols-fr">
          {homeCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('category', { category: cat.name })}
              className="group cursor-pointer bg-[#FAF6F0] rounded-xl border border-[#E5D9C8] p-2 hover:border-[#C5A15B] hover:shadow-md transition-all text-center flex flex-col justify-between"
            >
              <div className="aspect-[4/3.6] rounded-lg overflow-hidden bg-[#EFE5D8]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="py-2 sm:py-2.5 px-1">
                <h3 className="text-xs sm:text-[13px] font-semibold text-[#2D181C] group-hover:text-[#650D24] leading-tight line-clamp-1">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] px-3 sm:px-4 py-4 sm:py-5 shadow-2xs">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:divide-x lg:divide-[#E5D9C8]">
          <div className="flex items-center sm:justify-center gap-3.5 px-3 sm:px-4">
            <div className="w-10 h-10 rounded-full bg-[#F6EFE5] border border-[#DECBB4] flex items-center justify-center text-[#650D24] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#650D24]">Quality Products</h4>
              <p className="text-[11px] sm:text-xs text-[#6E5A4F]">Handpicked for You</p>
            </div>
          </div>
          <div className="flex items-center sm:justify-center gap-3.5 px-3 sm:px-4">
            <div className="w-10 h-10 rounded-full bg-[#F6EFE5] border border-[#DECBB4] flex items-center justify-center text-[#650D24] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#650D24]">Trusted by Many</h4>
              <p className="text-[11px] sm:text-xs text-[#6E5A4F]">Customer Satisfaction</p>
            </div>
          </div>
          <div className="flex items-center sm:justify-center gap-3.5 px-3 sm:px-4">
            <div className="w-10 h-10 rounded-full bg-[#F6EFE5] border border-[#DECBB4] flex items-center justify-center text-[#650D24] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#650D24]">Elegant Collections</h4>
              <p className="text-[11px] sm:text-xs text-[#6E5A4F]">For Every Occasion</p>
            </div>
          </div>
          <div className="flex items-center sm:justify-center gap-3.5 px-3 sm:px-4">
            <div className="w-10 h-10 rounded-full bg-[#F6EFE5] border border-[#DECBB4] flex items-center justify-center text-[#650D24] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#650D24]">Direct WhatsApp Support</h4>
              <p className="text-[11px] sm:text-xs text-[#6E5A4F]">Quick Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section>
        <div className="flex items-center justify-between sm:justify-center relative mb-5 sm:mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D181C]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            New Arrivals
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('products', { category: 'All' })}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#650D24] hover:text-[#4E081B] sm:absolute sm:right-0 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* PROMOTIONAL BANNERS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-2">
        {(businessSettings.promoBanners || [
          { eyebrow: 'Grace in Every Drape', title: 'COTTON SAREES', subtitle: 'Soft • Breathable • Elegant', buttonText: 'Shop Now', targetCategory: 'Cotton Sarees', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80' },
          { eyebrow: 'Trendy & Comfortable', title: 'KURTIS & CO-ORD SETS', subtitle: 'Everyday Fashion, Elevated', buttonText: 'Explore Now', targetCategory: 'Kurtis', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=700&q=80' }
        ]).map((banner, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden border border-[#DECBB4] bg-gradient-to-r from-[#EFE3D3] via-[#FAF5EE] to-[#EADACA] p-4 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 min-h-[210px] shadow-xs group"
          >
            <div className="w-full sm:w-2/5">
              <div className="aspect-[16/10] sm:aspect-[4/3.6] rounded-xl overflow-hidden border border-[#DECBB4]">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="w-full sm:w-3/5 text-center px-2 relative z-10">
              <p className="font-serif italic text-xs sm:text-base text-[#6E5A4F]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {banner.eyebrow}
              </p>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#650D24] tracking-wide mt-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {banner.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#3A1F24] font-medium mt-1">{banner.subtitle}</p>
              <button
                type="button"
                onClick={() => onNavigate('category', { category: banner.targetCategory || 'All' })}
                className="mt-3 sm:mt-4 px-5 py-2 rounded-full bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <span>{banner.buttonText || 'Shop Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

// ============================================================================
// VIEW 2: CATALOG / CATEGORY PAGE
// ============================================================================
function CatalogPageView({ mode, initialCategory, initialSearch, products, categories, wishlist, onToggleWishlist, onAddToCart, onViewDetails, onNavigate }) {
  const [selectedCategories, setSelectedCategories] = useState(initialCategory && initialCategory !== 'All' ? [initialCategory] : []);
  const [localSearch, setLocalSearch] = useState(initialSearch || '');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOutOfStock, setOnlyOutOfStock] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') {
      setSelectedCategories([initialCategory]);
    } else {
      setSelectedCategories([]);
    }
    setCurrentPageNum(1);
  }, [initialCategory, mode]);

  useEffect(() => {
    setLocalSearch(initialSearch || '');
  }, [initialSearch]);

  const toggleCategoryFilter = (catName) => {
    setCurrentPageNum(1);
    setSelectedCategories((prev) => prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setLocalSearch('');
    setMaxPrice(5000);
    setOnlyInStock(false);
    setOnlyOutOfStock(false);
    setSortBy('newest');
    setCurrentPageNum(1);
  };

  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach((c) => {
      if (c.name === 'Sarees') {
        counts[c.name] = products.filter((p) => p.category.includes('Saree') || p.parentCategory === 'Sarees').length;
      } else {
        counts[c.name] = products.filter((p) => p.category === c.name).length;
      }
    });
    return counts;
  }, [products, categories]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategories.length > 0) {
          const matchesCat = selectedCategories.some((sel) => {
            if (sel === 'Sarees') return product.category.includes('Saree') || product.parentCategory === 'Sarees';
            return product.category === sel;
          });
          if (!matchesCat) return false;
        }

        if (localSearch.trim() !== '') {
          const q = localSearch.toLowerCase();
          const matchName = product.name?.toLowerCase().includes(q);
          const matchSku = (product.sku || product.id)?.toLowerCase().includes(q);
          const matchCat = product.category?.toLowerCase().includes(q);
          if (!matchName && !matchSku && !matchCat) return false;
        }

        if (Number(product.price) > maxPrice) return false;
        if (onlyInStock && !onlyOutOfStock && !product.inStock) return false;
        if (onlyOutOfStock && !onlyInStock && product.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return Number(a.price) - Number(b.price);
        if (sortBy === 'price-desc') return Number(b.price) - Number(a.price);
        if (sortBy === 'popular') return (b.popularity || 80) - (a.popularity || 80);
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [products, selectedCategories, localSearch, maxPrice, onlyInStock, onlyOutOfStock, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = filteredProducts.slice((currentPageNum - 1) * itemsPerPage, currentPageNum * itemsPerPage);

  const activeBannerMeta = useMemo(() => {
    if (selectedCategories.length === 1) {
      const found = categories.find((c) => c.name === selectedCategories[0]);
      if (found) return found;
    }
    return {
      name: mode === 'category' && initialCategory !== 'All' ? initialCategory : 'All Products',
      subtitle: 'Explore our complete collection of sarees, kurtis, co-ord sets and more.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    };
  }, [selectedCategories, categories, mode, initialCategory]);

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-5 space-y-5 sm:space-y-6">
      <div className="relative rounded-2xl overflow-hidden border border-[#DECBB4] bg-gradient-to-r from-[#F4EAE0] via-[#FAF5EE] to-[#EFE2D1] px-5 sm:px-10 py-6 sm:py-9 flex items-center justify-between shadow-2xs">
        <div className="relative z-10 max-w-xl">
          <nav className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs text-[#7A685B] mb-2">
            <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#650D24] cursor-pointer">
              Home
            </button>
            <span>›</span>
            <span className="font-semibold text-[#650D24]">{activeBannerMeta.name}</span>
          </nav>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#650D24] break-words" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {activeBannerMeta.name}
          </h1>
          <p className="mt-1.5 text-xs sm:text-base text-[#4A353B]">{activeBannerMeta.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        <aside className="lg:col-span-3 bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-5 space-y-5 sm:space-y-6 shadow-2xs">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D181C] mb-3 pb-2 border-b border-[#E5D9C8]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Categories
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {categories.map((cat) => {
                const checked = selectedCategories.includes(cat.name);
                return (
                  <label key={cat.id} className="flex items-center justify-between text-xs sm:text-[13px] text-[#3A1F24] cursor-pointer hover:text-[#650D24]">
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategoryFilter(cat.name)}
                        className="w-4 h-4 rounded accent-[#650D24] cursor-pointer shrink-0"
                      />
                      <span className={`truncate ${checked ? 'font-semibold text-[#650D24]' : ''}`}>{cat.name}</span>
                    </div>
                    <span className="text-[#8C7A6B] text-xs shrink-0 ml-1">({categoryCounts[cat.name] || 0})</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E5D9C8]">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D181C] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Price Range
            </h3>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPageNum(1);
              }}
              className="w-full accent-[#650D24] cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs font-medium text-[#4A353B] mt-2">
              <span>₹0</span>
              <span className="text-[#650D24] font-bold">Up to ₹{maxPrice}</span>
              <span>₹5000</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className="w-full py-2.5 px-4 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold tracking-wide transition-colors shadow-xs cursor-pointer"
          >
            Clear Filters
          </button>
        </aside>

        <div className="lg:col-span-9 space-y-5">
          <div className="bg-[#FAF6F0] rounded-xl border border-[#E5D9C8] p-3 sm:px-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 sm:max-w-md flex rounded-lg overflow-hidden border border-[#DECBB4] bg-white">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setCurrentPageNum(1);
                }}
                placeholder="Search products by name or ID..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm text-[#2D181C] placeholder-[#8C7A6B] focus:outline-none"
              />
              <button type="button" className="px-3.5 bg-[#650D24] text-white flex items-center justify-center">
                <Search className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-[#6E5A4F] font-medium shrink-0">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-[#DECBB4] bg-white px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-[#2D181C] focus:outline-none focus:border-[#650D24]"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <span className="text-xs font-semibold text-[#650D24] shrink-0">{filteredProducts.length} Products</span>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-8 sm:p-12 text-center space-y-3">
              <LotusIcon className="w-10 h-8 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#650D24]">No Matching Products Found</h3>
              <p className="text-xs sm:text-sm text-[#6E5A4F] max-w-md mx-auto">Try resetting filters to browse all collections.</p>
              <button type="button" onClick={handleClearFilters} className="mt-2 px-5 py-2 rounded-full bg-[#650D24] text-white text-xs font-semibold cursor-pointer">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pt-4 flex items-center justify-center flex-wrap gap-1.5">
              <button
                type="button"
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-lg border border-[#DECBB4] bg-[#FAF6F0] flex items-center justify-center text-[#650D24] disabled:opacity-40 hover:bg-[#EFE5D8] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPageNum(pageNum)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    currentPageNum === pageNum
                      ? 'bg-[#650D24] text-white border-[#650D24]'
                      : 'bg-[#FAF6F0] text-[#3A1F24] border-[#DECBB4] hover:bg-[#EFE5D8]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPageNum === totalPages}
                onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
                className="w-9 h-9 rounded-lg border border-[#DECBB4] bg-[#FAF6F0] flex items-center justify-center text-[#650D24] disabled:opacity-40 hover:bg-[#EFE5D8] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 3: PRODUCT DETAILS PAGE
// ============================================================================
function ProductDetailsPageView({ product, allProducts, wishlist, onToggleWishlist, onAddToCart, onViewDetails, onNavigate, onWhatsAppEnquire }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  const availableVariants = useMemo(() => getVariantsForProduct(product), [product]);
  const [selectedVariant, setSelectedVariant] = useState(availableVariants[0]);

  useEffect(() => {
    setSelectedImageIdx(0);
    setQuantity(1);
    setSelectedVariant(getVariantsForProduct(product)[0]);
  }, [product]);

  const gallery = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (typeof product.images === 'string' && product.images.trim()) {
      return product.images.split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (product.image) {
      return [product.image];
    }
    return ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'];
  }, [product]);

  const discountPercent = useMemo(() => {
    if (!product.originalPrice || Number(product.originalPrice) <= Number(product.price)) return null;
    return Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100);
  }, [product]);

  const relatedProducts = useMemo(() => {
    return allProducts.filter((p) => p.id !== product.id && (p.category === product.category || p.parentCategory === product.parentCategory)).slice(0, 4);
  }, [allProducts, product]);

  const isSaved = wishlist.includes(product.id);

  return (
    <div className="max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-5 space-y-8 sm:space-y-12">
      <nav className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs text-[#7A685B] border-b border-[#E5D9C8] pb-3">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#650D24] cursor-pointer">
          Home
        </button>
        <span>›</span>
        <button type="button" onClick={() => onNavigate('category', { category: product.category })} className="hover:text-[#650D24] cursor-pointer">
          {product.category}
        </button>
        <span>›</span>
        <span className="text-[#650D24] font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-3.5">
            <div className="flex sm:flex-col gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImageIdx === idx ? 'border-[#650D24] shadow-sm scale-102' : 'border-[#E5D9C8] opacity-75'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>

            <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#E5D9C8] bg-white shadow-sm">
              <img
                src={gallery[selectedImageIdx] || gallery[0]}
                alt="Main Product View"
                className="w-full h-[350px] xs:h-[410px] sm:h-[520px] lg:h-[550px] object-cover object-top"
              />
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-[#E5D9C8] flex items-center justify-center text-[#650D24] hover:bg-[#650D24] hover:text-white transition-colors shadow-sm cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#650D24] text-[#650D24] hover:fill-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {product.inStock ? (
              <span className="px-3 py-1 rounded-full bg-[#E6F4EA] border border-[#B7E1CD] text-[#1E7E34] text-xs font-semibold inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Available in Showroom</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold inline-flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Out of Stock — Enquire on WhatsApp for Restock</span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D181C] break-words" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#6E5A4F]">
            <span>
              Product ID: <strong className="text-[#2D181C]">{product.sku || product.id}</strong>
            </span>
            <span>•</span>
            <span>
              Category: <strong className="text-[#650D24]">{product.category}</strong>
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 pt-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#650D24]">₹{Number(product.price).toLocaleString('en-IN')}</span>
            {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
              <>
                <span className="text-base sm:text-lg text-[#8C7A6B] line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
                {discountPercent && <span className="px-2.5 py-0.5 rounded-md bg-[#1E9E52] text-white text-xs font-bold">{discountPercent}% OFF</span>}
              </>
            )}
          </div>

          {/* Size / Variant Selector */}
          <div className="pt-1 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E5A4F]">
              {availableVariants.length > 1 ? 'Select Size / Variant:' : 'Size / Fit:'}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableVariants.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedVariant === v
                      ? 'bg-[#650D24] text-white border-[#650D24] shadow-xs'
                      : 'bg-[#FAF6F0] text-[#3A1F24] border-[#DECBB4] hover:border-[#650D24]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity, Add to Cart & Wishlist Buttons */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="flex items-center rounded-xl border border-[#DECBB4] bg-[#FAF6F0] px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-lg text-[#650D24] font-bold hover:bg-[#EFE5D8] flex items-center justify-center cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-lg text-[#650D24] font-bold hover:bg-[#EFE5D8] flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(product, quantity, selectedVariant)}
                className="flex-1 min-w-[150px] py-3 px-5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Add to Cart</span>
              </button>

             
            </div>

            {/* Direct WhatsApp Enquiry / Order Button */}
            <button
              type="button"
              onClick={() => onWhatsAppEnquire(product, quantity, selectedVariant)}
              className="w-full py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#1E9E52] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current shrink-0" />
              <span>Order / Check Availability on WhatsApp</span>
            </button>

            <p className="text-[11px] text-[#6E5A4F] leading-relaxed">
              💡 Tip: Add multiple items to your <strong>Shopping Cart</strong> to send a single combined order list to our WhatsApp team for manual stock &amp; delivery confirmation.
            </p>
          </div>

          <div className="pt-3">
            <div className="flex border-b border-[#DECBB4] gap-1 overflow-x-auto">
              {[
                { id: 'description', label: 'Description' },
                { id: 'fabric', label: 'Fabric & Details' },
                { id: 'care', label: 'Care Instructions' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg border-t border-x whitespace-nowrap cursor-pointer ${
                    activeTab === t.id
                      ? 'bg-[#FAF6F0] text-[#650D24] border-[#DECBB4] -mb-[1px]'
                      : 'bg-transparent text-[#6E5A4F] border-transparent'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="bg-[#FAF6F0] rounded-b-2xl rounded-tr-2xl border border-[#DECBB4] p-4 sm:p-5 space-y-4">
              {activeTab === 'description' && <p className="text-xs sm:text-sm text-[#3A1F24] leading-relaxed">{product.description}</p>}
              {activeTab === 'fabric' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#3A1F24]">
                  <p>
                    <strong>Fabric:</strong> {product.specs?.fabric || 'Pure Cotton'}
                  </p>
                  <p>
                    <strong>Length:</strong> {product.specs?.length || 'Standard'}
                  </p>
                  <p>
                    <strong>Blouse / Set:</strong> {product.specs?.blouse || 'Included'}
                  </p>
                  <p>
                    <strong>Work:</strong> {product.specs?.work || 'Handpicked Finish'}
                  </p>
                </div>
              )}
              {activeTab === 'care' && (
                <p className="text-xs sm:text-sm text-[#3A1F24] leading-relaxed">
                  {product.specs?.care || 'Dry clean or gentle hand wash.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="pt-6 border-t border-[#E5D9C8]">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D181C] mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                isWishlisted={wishlist.includes(rel.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 3B: WISHLIST PAGE
// ============================================================================
function WishlistPageView({ products, wishlist, onToggleWishlist, onMoveToCart, onViewDetails, onNavigate }) {
  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlist.includes(p.id));
  }, [products, wishlist]);

  return (
    <div className="max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6 sm:space-y-8">
      <nav className="flex items-center gap-2 text-xs text-[#7A685B]">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#650D24] cursor-pointer">
          Home
        </button>
        <span>›</span>
        <span className="font-semibold text-[#650D24]">My Wishlist</span>
      </nav>

      <div className="relative rounded-2xl overflow-hidden border border-[#DECBB4] bg-gradient-to-r from-[#F4EAE0] via-[#FAF5EE] to-[#EFE2D1] px-5 sm:px-10 py-6 sm:py-7 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="relative z-10">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Saved Wishlist
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#4A353B]">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved for your wardrobe
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('cart')}
          className="relative z-10 px-5 py-2.5 rounded-full bg-[#650D24] hover:bg-[#4E081B] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Shopping Cart</span>
        </button>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-[#FAF6F0] rounded-3xl border border-[#E5D9C8] p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F6EFE5] border border-[#DECBB4] flex items-center justify-center mx-auto text-[#650D24]">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Your Wishlist is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5A4F] leading-relaxed">
            Tap the heart icon on any saree, kurti, or co-ord set to save your favorite styles here and move them to your cart anytime.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('products', { category: 'All' })}
            className="mt-2 px-7 py-3 rounded-full bg-[#650D24] hover:bg-[#4E081B] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onViewDetails(product)}
              className="group cursor-pointer bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-3 transition-all duration-300 hover:shadow-md hover:border-[#C5A15B] flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/4.3] w-full rounded-xl overflow-hidden bg-[#EFE5D8]">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.inStock ? (
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#1E7E34]/90 text-white">
                      Available
                    </span>
                  ) : (
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-900/90 text-white">
                      Out of Stock
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label="Remove from Wishlist"
                    title="Remove from Wishlist"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 border border-[#E5D9C8] flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-sm cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-3 px-1">
                  <span className="text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-semibold text-[#2D181C] text-sm sm:text-base leading-snug mt-0.5 group-hover:text-[#650D24] line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-bold text-[#650D24] text-base sm:text-lg">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                      <span className="text-xs text-[#8C7A6B] line-through">
                        ₹{Number(product.originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5D9C8] flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveToCart(product);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>Move to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="py-2.5 px-3 rounded-xl border border-[#DECBB4] bg-[#F6EFE5] hover:bg-red-50 hover:text-red-700 text-[#6E5A4F] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 3C: SHOPPING CART & WHATSAPP ORDERING PAGE
// ============================================================================
function CartPageView({
  cartItems,
  cartTotal,
  businessSettings,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onViewDetails,
  onNavigate,
  onGenerateWhatsAppOrder,
  showToast
}) {
  const [whatsappOrderSentPrompt, setWhatsappOrderSentPrompt] = useState(false);

  const handleOrderViaWhatsApp = () => {
    const orderData = onGenerateWhatsAppOrder();
    if (!orderData) return;

    window.open(orderData.waUrl, '_blank', 'noopener,noreferrer');
    setWhatsappOrderSentPrompt(true);
    showToast('WhatsApp opened with your complete order list!');
  };

  return (
    <div className="max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6 sm:space-y-8">
      <nav className="flex items-center gap-2 text-xs text-[#7A685B]">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#650D24] cursor-pointer">
          Home
        </button>
        <span>›</span>
        <span className="font-semibold text-[#650D24]">Shopping Cart</span>
      </nav>

      <div className="relative rounded-2xl overflow-hidden border border-[#DECBB4] bg-gradient-to-r from-[#F4EAE0] via-[#FAF5EE] to-[#EFE2D1] px-5 sm:px-10 py-6 sm:py-7 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="relative z-10">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Your Shopping Cart
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#4A353B]">
            Review your selected items and place your order directly via WhatsApp
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('products', { category: 'All' })}
          className="relative z-10 px-5 py-2.5 rounded-full border border-[#650D24] text-[#650D24] hover:bg-[#650D24] hover:text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {whatsappOrderSentPrompt && cartItems.length > 0 && (
        <div className="bg-[#FAF6F0] border-2 border-[#25D366] rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 mt-0.5">
              <WhatsAppIcon className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#2D181C]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Did you send your order message on WhatsApp?
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5A4F] mt-0.5">
                Our team at <strong>{businessSettings.brandName}</strong> will manually verify stock availability, sizes, and delivery details with you on WhatsApp. Your items are safely kept in your cart until you choose to clear them.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setWhatsappOrderSentPrompt(false)}
              className="px-4 py-2 rounded-xl border border-[#DECBB4] bg-white text-xs font-semibold text-[#4A353B] hover:bg-[#EFE5D8] cursor-pointer"
            >
              Keep Cart Items
            </button>
            <button
              type="button"
              onClick={() => {
                onClearCart();
                setWhatsappOrderSentPrompt(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold cursor-pointer"
            >
              Yes, Clear Cart
            </button>
          </div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="bg-[#FAF6F0] rounded-3xl border border-[#E5D9C8] p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F6EFE5] border border-[#DECBB4] flex items-center justify-center mx-auto text-[#650D24]">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Your Shopping Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5A4F] leading-relaxed">
            Add your favorite sarees, kurtis, co-ord sets, or nightwear to your cart and send your entire order to our showroom on WhatsApp in one click.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('products', { category: 'All' })}
              className="px-7 py-3 rounded-full bg-[#650D24] hover:bg-[#4E081B] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Browse Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('wishlist')}
              className="px-6 py-3 rounded-full border border-[#C5A15B] bg-[#F6EFE5] hover:bg-[#EFE5D8] text-[#650D24] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <span>View Saved Wishlist</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] divide-y divide-[#E5D9C8] overflow-hidden shadow-2xs">
              {cartItems.map((item) => {
                const { product, variant, quantity, unitPrice, subtotal } = item;
                return (
                  <div
                    key={`${product.id}-${variant}`}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-[#F6EFE5]/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 w-full sm:w-auto flex-1 min-w-0">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        onClick={() => onViewDetails(product)}
                        className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover object-top border border-[#DECBB4] cursor-pointer shrink-0"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6B]">
                            {product.sku || product.id}
                          </span>
                          {product.inStock ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#1E7E34]">
                              Available
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              Check Availability via WhatsApp
                            </span>
                          )}
                        </div>

                        <h3
                          onClick={() => onViewDetails(product)}
                          className="font-serif font-bold text-base sm:text-lg text-[#2D181C] hover:text-[#650D24] cursor-pointer line-clamp-1"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-[#6E5A4F] break-words">
                          Category: <span className="font-medium text-[#3A1F24]">{product.category}</span>
                          {variant && (
                            <>
                              {' '}• Size/Variant: <span className="font-semibold text-[#650D24]">{variant}</span>
                            </>
                          )}
                        </p>

                        <p className="text-sm font-semibold text-[#650D24] pt-0.5">
                          Unit Price: ₹{unitPrice.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E5D9C8]">
                      <div className="flex items-center rounded-xl border border-[#DECBB4] bg-white px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, variant, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 rounded-lg text-[#650D24] hover:bg-[#EFE5D8] flex items-center justify-center cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs sm:text-sm font-bold text-[#2D181C]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, variant, quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 rounded-lg text-[#650D24] hover:bg-[#EFE5D8] flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="block text-[11px] text-[#8C7A6B]">Subtotal</span>
                        <span className="text-base sm:text-lg font-bold text-[#650D24]">
                          ₹{subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id, variant)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="text-xs text-red-600 hover:text-red-800 inline-flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#FAF6F0] rounded-2xl border-2 border-[#C5A15B] p-5 sm:p-6 space-y-5 shadow-md lg:sticky lg:top-24">
            <div className="border-b border-[#E5D9C8] pb-3">
              <h2 className="font-serif text-xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Order Summary
              </h2>
              <p className="text-xs text-[#6E5A4F] mt-0.5">
                Direct WhatsApp Order &amp; Availability Check
              </p>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-[#4A353B]">
                <span>Total Items</span>
                <span className="font-semibold">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex items-center justify-between text-[#4A353B]">
                <span>Shipping (Within India)</span>
                <span className="text-xs font-semibold text-[#1E7E34]">
                  {cartTotal >= 999 ? 'Free Shipping Eligible' : 'Calculated on WhatsApp'}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E5D9C8] flex items-baseline justify-between">
                <span className="font-serif text-lg font-bold text-[#2D181C]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Cart Total
                </span>
                <span className="text-2xl font-bold text-[#650D24]">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F6EFE5] border border-[#DECBB4] text-xs text-[#4A353B] space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-[#650D24]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Manual Availability &amp; Order Confirmation</span>
              </div>
              <p className="break-words">
                Clicking below opens WhatsApp with your complete item list, links, and photos addressed to{' '}
                <strong>{businessSettings.whatsappDisplay || `+${String(businessSettings.whatsapp || '').replace(/[^0-9]/g, '')}`}</strong>. Our showroom team will verify stock and confirm payment &amp; delivery details with you directly.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOrderViaWhatsApp}
              className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#1E9E52] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
              <span>Order via WhatsApp</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 4: ABOUT US PAGE (Dynamic & Fully Synced)
// ============================================================================
function AboutUsPageView({ businessSettings, onNavigate }) {
  const showcaseCollections = [
    { name: 'Sarees', desc: 'Elegant drapes for every occasion', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80' },
    { name: 'Kurtis', desc: 'Comfortable everyday wear', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=700&q=80' },
    { name: 'Co-ord Sets', desc: 'Trendy matching sets', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80' },
    { name: "Women's Nightwear", displayName: 'Nightwear', desc: 'Comfort for relaxed moments', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80' }
  ];

  return (
    <div className="max-w-[1300px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8 sm:space-y-12">
      <nav className="flex items-center gap-2 text-xs text-[#7A685B]">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#650D24] cursor-pointer">
          Home
        </button>
        <span>›</span>
        <span className="font-semibold text-[#650D24]">About Us</span>
      </nav>

      <div className="relative bg-[#FAF6F0] rounded-3xl border border-[#E5D9C8] p-5 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#650D24] break-words" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            About {businessSettings.brandName} {businessSettings.brandSubtitle}
          </h1>
          <p className="font-serif italic text-sm sm:text-lg text-[#7A5B3E] mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Tradition Woven with Elegance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {businessSettings?.aboutDescription ? (
              <p className="text-sm sm:text-base text-[#3A1F24] leading-relaxed whitespace-pre-line break-words">
                {businessSettings.aboutDescription}
              </p>
            ) : (
              <>
                <p className="text-sm sm:text-base text-[#3A1F24] leading-relaxed">
                  At <strong className="text-[#650D24]">{businessSettings.brandName} {businessSettings.brandSubtitle}</strong>, we bring you a beautiful collection of sarees, kurtis, co-ord sets and women&apos;s fashion wear crafted with love and a passion for traditional and modern styles.
                </p>
                <p className="text-sm sm:text-base text-[#3A1F24] leading-relaxed">
                  Based in {businessSettings.location || 'Visakhapatnam, Andhra Pradesh'}, every drape and silhouette in our showroom is hand-selected for fabric purity and lasting comfort.
                </p>
              </>
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/4.2] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#C5A15B] shadow-md">
              <img
                src={businessSettings?.aboutImage || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'}
                alt="Showroom"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-[#E5D9C8] relative z-10">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-center text-[#2D181C] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Our Collections
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {showcaseCollections.map((col) => (
              <div
                key={col.name}
                onClick={() => onNavigate('category', { category: col.name })}
                className="group cursor-pointer bg-[#F6EFE5] rounded-xl border border-[#E5D9C8] p-2 sm:p-2.5 hover:border-[#C5A15B] transition-all text-center"
              >
                <div className="aspect-[4/3.8] rounded-lg overflow-hidden mb-2 sm:mb-2.5">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#650D24]">{col.displayName || col.name}</h3>
                <p className="text-[11px] sm:text-xs text-[#6E5A4F] mt-0.5">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 5: CONTACT US PAGE
// ============================================================================
function ContactUsPageView({ businessSettings, onNavigate, onSubmitInquiry }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanWhatsAppOrder = String(businessSettings?.whatsapp || businessSettings?.whatsappDisplay || '').replace(/[^0-9]/g, '');
  const displayWhatsApp = businessSettings?.whatsappDisplay || (cleanWhatsAppOrder ? `+${cleanWhatsAppOrder}` : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !cleanWhatsAppOrder) return;

    const storeTitle = [businessSettings.brandName, businessSettings.brandSubtitle].filter(Boolean).join(' ') || 'Aswini Traders';
    const encodedText = encodeURIComponent(
      `Hello ${storeTitle},\n\n*Name:* ${name}\n*Enquiry:* ${message}`
    );

    window.open(`https://wa.me/${cleanWhatsAppOrder}?text=${encodedText}`, '_blank', 'noopener,noreferrer');

    onSubmitInquiry({ name, message });
    setSubmitted(true);
    setName('');
    setMessage('');
  };

  return (
    <div className="max-w-[1250px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6 sm:space-y-8">
      <nav className="flex items-center gap-2 text-xs text-[#7A685B]">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#650D24] cursor-pointer">
          Home
        </button>
        <span>›</span>
        <span className="font-semibold text-[#650D24]">Contact Us</span>
      </nav>

      <div className="relative bg-[#FAF6F0] rounded-3xl border border-[#E5D9C8] p-5 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 relative z-10">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Get in Touch
          </h1>
          <p className="mt-2 text-xs sm:text-base text-[#4A353B]">We&apos;re here to help you with your orders, enquiries and support.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative z-10">
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <a
              href={cleanWhatsAppOrder ? `https://wa.me/${cleanWhatsAppOrder}` : '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#F6EFE5] border border-[#E5D9C8] hover:border-[#25D366] transition-all"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-[#2D181C]">WhatsApp</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#650D24] break-words">{displayWhatsApp}</p>
              </div>
            </a>

            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#F6EFE5] border border-[#E5D9C8]">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#650D24] text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-[#2D181C]">Phone</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#650D24] break-words">{businessSettings.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#F6EFE5] border border-[#E5D9C8]">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#650D24] text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-[#2D181C]">Email</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#650D24] break-all">{businessSettings.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#F6EFE5] border border-[#E5D9C8]">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#650D24] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-[#2D181C]">Location</h3>
                <p className="text-xs sm:text-sm font-medium text-[#4A353B] break-words">{businessSettings.location}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F6EFE5] rounded-2xl border border-[#E5D9C8] p-5 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#650D24] mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Send Us a Message
            </h2>
            {submitted && (
              <div className="mb-5 p-4 rounded-xl bg-[#E6F4EA] border border-[#B7E1CD] text-[#1E7E34] text-xs sm:text-sm">
                Thank you! Redirecting to WhatsApp...
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2D181C] mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm focus:outline-none focus:border-[#650D24]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2D181C] mb-1.5">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your enquiry..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm focus:outline-none focus:border-[#650D24]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
              >
                Send Message on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
