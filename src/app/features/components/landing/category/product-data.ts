export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: string;
  tag: string;
  accent: string;
  colors: string[];
  materials: string[];
  features: string[];
}

export const productCatalog: Record<string, ProductItem[]> = {
  'iphone-13': [
    {
      id: 1,
      name: 'Crystal Grip',
      description:
        'Soft-touch case with a matte finish and drop-tested corners.',
      price: '499/-',
      tag: 'Popular',
      accent: '#0d917e',
      colors: ['#0d917e', '#d1fae5', '#111827'],
      materials: ['TPU shell', 'Shock-absorbing corners'],
      features: ['Raised camera lip', 'MagSafe ready', 'Drop-tested'],
    },
    {
      id: 2,
      name: 'MagSafe Shield',
      description: 'A magnetic, shock-ready case built for everyday carry.',
      price: '499/-',
      tag: 'Best seller',
      accent: '#fac5d2',
      colors: ['#fac5d2', '#f472b6', '#111827'],
      materials: ['Polycarbonate', 'Soft-touch lining'],
      features: ['MagSafe compatible', 'Precise cutouts', 'Lightweight'],
    },
    {
      id: 3,
      name: 'Leather Luxe',
      description: 'Premium leather finish with a refined luxury profile.',
      price: '499/-',
      tag: 'Luxury',
      accent: '#7c3aed',
      colors: ['#7c3aed', '#d8b4fe', '#111827'],
      materials: ['Genuine vegan leather', 'Textured finish'],
      features: ['Premium grip', 'Classic profile', 'Scratch-resistant'],
    },
    {
      id: 4,
      name: 'Urban Clear',
      description:
        'Transparent shell with anti-yellow finish and anti-scratch coating.',
      price: '499/-',
      tag: 'Clear',
      accent: '#60a5fa',
      colors: ['#60a5fa', '#e0f2fe', '#f8fafc'],
      materials: ['Clear polycarbonate', 'Anti-yellow coating'],
      features: ['Crystal view', 'Air-pocket corners', 'Ultra-clear'],
    },
  ],
  'iphone-14': [
    {
      id: 5,
      name: 'Aero Case',
      description:
        'Ultra-light profile with shock absorption and raised edge protection.',
      price: '499/-',
      tag: 'New',
      accent: '#22c55e',
      colors: ['#22c55e', '#bbf7d0', '#111827'],
      materials: ['Flexible TPU', 'Impact foam'],
      features: ['Air cushion corners', 'Raised lip', 'Slim profile'],
    },
    {
      id: 6,
      name: 'Nightfall',
      description: 'Satin finish with a sleek profile for professional style.',
      price: '499/-',
      tag: 'Limited',
      accent: '#111827',
      colors: ['#111827', '#9ca3af', '#d1d5db'],
      materials: ['Microfiber interior', 'Satin finish'],
      features: ['Professional finish', 'Soft grip', 'Easy install'],
    },
    {
      id: 7,
      name: 'Rose Quartz',
      description: 'Soft pastel finish with a premium everyday grip.',
      price: '499/-',
      tag: 'Trending',
      accent: '#f472b6',
      colors: ['#f472b6', '#fbcfe8', '#ffffff'],
      materials: ['Soft-touch TPU', 'Dual-layer shell'],
      features: ['Pastel tone', 'Shock absorbing', 'Daily comfort'],
    },
    {
      id: 8,
      name: 'Sport Edge',
      description: 'Built for active days with a rugged, durable feel.',
      price: '499/-',
      tag: 'Rugged',
      accent: '#f59e0b',
      colors: ['#f59e0b', '#fef3c7', '#111827'],
      materials: ['Shock-absorbing frame', 'Textured grip'],
      features: ['Rugged protection', 'Grip texture', 'Easy handling'],
    },
  ],
  'iphone-15': [
    {
      id: 9,
      name: 'Titanium Lite',
      description:
        'Premium matte finish with scratch resistance and slim curves.',
      price: '499/-',
      tag: 'Pro',
      accent: '#c084fc',
      colors: ['#c084fc', '#f5d0fe', '#111827'],
      materials: ['Matte shell', 'Scratch-safe finish'],
      features: ['Slim fit', 'Premium finish', 'Scratch resistant'],
    },
    {
      id: 10,
      name: 'Cloud Cover',
      description: 'Minimalist design with a microfiber-soft touch finish.',
      price: '499/-',
      tag: 'Soft touch',
      accent: '#38bdf8',
      colors: ['#38bdf8', '#dbeafe', '#f8fafc'],
      materials: ['Microfiber interior', 'Soft-touch texture'],
      features: ['Minimal profile', 'Soft grip', 'Comfort use'],
    },
    {
      id: 11,
      name: 'Desert Gold',
      description: 'Warm luxury styling inspired by premium modern finishes.',
      price: '499/-',
      tag: 'Signature',
      accent: '#fbbf24',
      colors: ['#fbbf24', '#fef3c7', '#111827'],
      materials: ['Hard shell', 'Soft lining'],
      features: ['Warm finish', 'Premium feel', 'Strong edges'],
    },
    {
      id: 12,
      name: 'Clean Clear',
      description: 'Crystal-clear shell with a smudge-resistant finish.',
      price: '499/-',
      tag: 'Clear',
      accent: '#93c5fd',
      colors: ['#93c5fd', '#dbeafe', '#f8fafc'],
      materials: ['Crystal TPU', 'Anti-smudge layer'],
      features: ['Transparent shell', 'Fingerprint lock', 'Slim silhouette'],
    },
  ],
  'iphone-16': [
    {
      id: 13,
      name: 'Carbon Frame',
      description: 'Strong edges and sharp contours for a sleek profile.',
      price: '499/-',
      tag: 'Popular',
      accent: '#1f2937',
      colors: ['#1f2937', '#9ca3af', '#d1d5db'],
      materials: ['Acrylic shell', 'Shock core'],
      features: ['Strong edges', 'Quick grip', 'Modern body'],
    },
    {
      id: 14,
      name: 'Bloom Shell',
      description: 'Soft pastel tones with a premium, contemporary finish.',
      price: '499/-',
      tag: 'Fresh',
      accent: '#f9a8d4',
      colors: ['#f9a8d4', '#fdf2f8', '#60a5fa'],
      materials: ['Soft-touch polymer', 'Dual-layer build'],
      features: ['Pastel palette', 'Daily comfort', 'Premium detailing'],
    },
    {
      id: 15,
      name: 'Urban Clay',
      description: 'A warm neutral finish designed for everyday elegance.',
      price: '499/-',
      tag: 'New',
      accent: '#f97316',
      colors: ['#f97316', '#fed7aa', '#111827'],
      materials: ['Textured shell', 'Flexible frame'],
      features: ['Warm finish', 'Clean lines', 'Grip texture'],
    },
    {
      id: 16,
      name: 'View Guard',
      description: 'Raised camera lip and screen protection with clean design.',
      price: '499/-',
      tag: 'Protective',
      accent: '#14b8a6',
      colors: ['#14b8a6', '#ccfbf1', '#111827'],
      materials: ['Impact-resistant shell', 'Raised rim'],
      features: ['Camera guard', 'Protective rim', 'Drop-ready'],
    },
  ],
  'iphone-16-pro': [
    {
      id: 17,
      name: 'Pro Armor',
      description: 'Heavy-duty protection combined with premium materials.',
      price: '499/-',
      tag: 'Pro',
      accent: '#0f172a',
      colors: ['#0f172a', '#94a3b8', '#cbd5e1'],
      materials: ['Dual-layer shell', 'Shock-absorbing corners'],
      features: ['Pro-grade', 'Corner protection', 'Secure fit'],
    },
    {
      id: 18,
      name: 'Velvet Grip',
      description: 'Comfortable grip with a low-profile silhouette.',
      price: '499/-',
      tag: 'Soft touch',
      accent: '#a78bfa',
      colors: ['#a78bfa', '#ede9fe', '#111827'],
      materials: ['Velvet texture', 'Flexible frame'],
      features: ['Comfort grip', 'Low profile', 'Satin feel'],
    },
    {
      id: 19,
      name: 'Silver Edge',
      description: 'Bright polished finish for a clean premium aesthetic.',
      price: '499/-',
      tag: 'Luxury',
      accent: '#cbd5e1',
      colors: ['#cbd5e1', '#e2e8f0', '#111827'],
      materials: ['Metal-inspired shell', 'Smooth finish'],
      features: ['Luxury finish', 'Minimal design', 'Premium polish'],
    },
    {
      id: 20,
      name: 'Neo Clear',
      description:
        'Crystal clarity with high-impact corners and scratch defense.',
      price: '499/-',
      tag: 'Clear',
      accent: '#2dd4bf',
      colors: ['#2dd4bf', '#ccfbf1', '#f8fafc'],
      materials: ['Clear TPU', 'Scratch-resistant finish'],
      features: ['Clean clarity', 'Shock corners', 'Easy daily use'],
    },
  ],
  'iphone-16-pro-max': [
    {
      id: 21,
      name: 'Max Shield',
      description: 'Heavy-duty rugged case built for larger-screen protection.',
      price: '499/-',
      tag: 'Heavy duty',
      accent: '#0d917e',
      colors: ['#0d917e', '#a7f3d0', '#111827'],
      materials: ['Shock core', 'Rugged shell'],
      features: ['Max protection', 'Bulk-safe', 'Strong grip'],
    },
    {
      id: 22,
      name: 'Canvas Wave',
      description:
        'Textured features and modern lines for a contemporary look.',
      price: '499/-',
      tag: 'Design',
      accent: '#fca5a5',
      colors: ['#fca5a5', '#fee2e2', '#111827'],
      materials: ['Textured surface', 'Flexible shell'],
      features: ['Modern design', 'Texture grip', 'Premium finish'],
    },
    {
      id: 23,
      name: 'Slate Pro',
      description: 'Clean, minimal profile with stronger impact defense.',
      price: '499/-',
      tag: 'Minimal',
      accent: '#64748b',
      colors: ['#64748b', '#cbd5e1', '#111827'],
      materials: ['Hard shell', 'Soft interior'],
      features: ['Minimal profile', 'Strong corners', 'Everyday utility'],
    },
    {
      id: 24,
      name: 'Drift Clear',
      description: 'High clarity and raised edges built for everyday use.',
      price: '499/-',
      tag: 'Clear',
      accent: '#7dd3fc',
      colors: ['#7dd3fc', '#dbeafe', '#f8fafc'],
      materials: ['Clear shell', 'Protective frame'],
      features: ['Clear finish', 'Extra lip protection', 'Daily reliability'],
    },
  ],
  'iphone-17': [
    {
      id: 25,
      name: 'Monarch',
      description:
        'Contemporary case with bold color accents and a slim build.',
      price: '499/-',
      tag: 'Featured',
      accent: '#f43f5e',
      colors: ['#f43f5e', '#fecdd3', '#111827'],
      materials: ['Soft-touch shell', 'Dual-layer build'],
      features: ['Bold finish', 'Slim profile', 'Daily grip'],
    },
    {
      id: 26,
      name: 'Pearl Frame',
      description: 'Smooth and light with a luxury-inspired minimalist finish.',
      price: '499/-',
      tag: 'Soft touch',
      accent: '#f5d0fe',
      colors: ['#f5d0fe', '#fdf2f8', '#111827'],
      materials: ['Smooth polymer', 'Textured inner layer'],
      features: ['Lightweight', 'Minimal style', 'Comfortable grip'],
    },
    {
      id: 27,
      name: 'Titan Grip',
      description: 'Firm grip for travel, work, and everyday handling.',
      price: '499/-',
      tag: 'Grip',
      accent: '#16a34a',
      colors: ['#16a34a', '#bbf7d0', '#111827'],
      materials: ['Firm grip TPU', 'Reinforced shell'],
      features: ['Strong grip', 'Travel-ready', 'Shock resilient'],
    },
    {
      id: 28,
      name: 'Glassline',
      description: 'Premium transparent build with crystal-sharp clarity.',
      price: '499/-',
      tag: 'Clear',
      accent: '#93c5fd',
      colors: ['#93c5fd', '#dbeafe', '#f8fafc'],
      materials: ['Clear acrylic', 'Scratch guard'],
      features: ['Crystal clarity', 'Premium gloss', 'Long-lasting shine'],
    },
  ],
  'iphone-17-pro': [
    {
      id: 29,
      name: 'Pro Apex',
      description: 'Luxury protection crafted for premium performance devices.',
      price: '499/-',
      tag: 'Top pick',
      accent: '#7c3aed',
      colors: ['#7c3aed', '#ddd6fe', '#111827'],
      materials: ['Premium shell', 'Shock guard'],
      features: ['Luxury protection', 'Pro-grade fit', 'High performance'],
    },
    {
      id: 30,
      name: 'Mosaic Glow',
      description: 'Premium colors paired with subtle shimmer detailing.',
      price: '499/-',
      tag: 'Design',
      accent: '#f59e0b',
      colors: ['#f59e0b', '#fef3c7', '#111827'],
      materials: ['Glow finish', 'Flexible shell'],
      features: ['Visual pop', 'Premium finish', 'Light shimmer'],
    },
    {
      id: 31,
      name: 'Stealth Matte',
      description: 'A matte finish with understated polish and impact defense.',
      price: '499/-',
      tag: 'Matte',
      accent: '#1f2937',
      colors: ['#1f2937', '#e5e7eb', '#111827'],
      materials: ['Matte polymer', 'Shock frame'],
      features: ['Matte finish', 'Refined look', 'Drop protection'],
    },
    {
      id: 32,
      name: 'Glass Muse',
      description: 'Clear protective shell with a premium glossy finish.',
      price: '499/-',
      tag: 'Clear',
      accent: '#67e8f9',
      colors: ['#67e8f9', '#cffafe', '#111827'],
      materials: ['Gloss shell', 'Impact insert'],
      features: ['Premium clarity', 'Glossy finish', 'Strong guard'],
    },
  ],
  'iphone-18': [
    {
      id: 33,
      name: 'Beam Edge',
      description: 'A polished, premium case built for refined everyday use.',
      price: '499/-',
      tag: 'New',
      accent: '#22d3ee',
      colors: ['#22d3ee', '#cffafe', '#111827'],
      materials: ['Clear shell', 'Textured rim'],
      features: ['Premium finish', 'Refined profile', 'Strong corners'],
    },
    {
      id: 34,
      name: 'Satin Run',
      description: 'Luxury finish with soft-touch comfort and visual depth.',
      price: '499/-',
      tag: 'Luxury',
      accent: '#f472b6',
      colors: ['#f472b6', '#fbcfe8', '#111827'],
      materials: ['Soft-touch polymer', 'Satin finish'],
      features: ['Luxury look', 'Soft feel', 'Premium design'],
    },
    {
      id: 35,
      name: 'Flex Guard',
      description: 'Hybrid protection with a strong flexible frame and grip.',
      price: '499/-',
      tag: 'Popular',
      accent: '#10b981',
      colors: ['#10b981', '#d1fae5', '#111827'],
      materials: ['Hybrid polymer', 'Shock frame'],
      features: ['Hybrid strength', 'Flex grip', 'Impact defense'],
    },
    {
      id: 36,
      name: 'Pure View',
      description: 'Minimal and transparent for a crisp, premium look.',
      price: '499/-',
      tag: 'Clear',
      accent: '#60a5fa',
      colors: ['#60a5fa', '#dbeafe', '#f8fafc'],
      materials: ['Ultra-clear shell', 'Low-glare finish'],
      features: ['Minimal design', 'Transparent build', 'Crystal finish'],
    },
  ],
  'iphone-18-pro': [
    {
      id: 37,
      name: 'Pro Fusion',
      description: 'Premium build with comfortable grip and luxury appeal.',
      price: '499/-',
      tag: 'Pro',
      accent: '#0d917e',
      colors: ['#0d917e', '#a7f3d0', '#111827'],
      materials: ['Luxury shell', 'Impact cushion'],
      features: ['Luxury finish', 'Comfort grip', 'Premium protection'],
    },
    {
      id: 38,
      name: 'Metal Luxe',
      description:
        'Refined edges and metallic styling for elevated daily wear.',
      price: '499/-',
      tag: 'Luxury',
      accent: '#a1a1aa',
      colors: ['#a1a1aa', '#e4e4e7', '#111827'],
      materials: ['Metal-inspired shell', 'Protective coat'],
      features: ['Metal look', 'Premium style', 'Strong feel'],
    },
    {
      id: 39,
      name: 'Night Pulse',
      description:
        'Bold dark finish with a statement-making high-end aesthetic.',
      price: '499/-',
      tag: 'Featured',
      accent: '#111827',
      colors: ['#111827', '#9ca3af', '#d1d5db'],
      materials: ['Dark shell', 'Shock layer'],
      features: [
        'Statement design',
        'Refined finish',
        'Professional aesthetic',
      ],
    },
    {
      id: 40,
      name: 'Clear Horizon',
      description:
        'An ultra-clear case designed for a crisp device silhouette.',
      price: '499/-',
      tag: 'Clear',
      accent: '#7dd3fc',
      colors: ['#7dd3fc', '#dbeafe', '#f8fafc'],
      materials: ['Ultra-clear polymer', 'Scratch guard'],
      features: ['Crystal view', 'Premium fit', 'Maximum clarity'],
    },
  ],
};

export interface CatalogCategory {
  model: string;
  label: string;
  subtitle: string;
  accent: string;
  count: number;
}

export interface CatalogProduct extends ProductItem {
  model: string;
  modelLabel: string;
}

export const modelLabels: Record<string, string> = {
  'iphone-13': 'iPhone 13',
  'iphone-14': 'iPhone 14',
  'iphone-15': 'iPhone 15',
  'iphone-16': 'iPhone 16',
  'iphone-16-pro': 'iPhone 16 Pro',
  'iphone-16-pro-max': 'iPhone 16 Pro Max',
  'iphone-17': 'iPhone 17',
  'iphone-17-pro': 'iPhone 17 Pro',
  'iphone-18': 'iPhone 18',
  'iphone-18-pro': 'iPhone 18 Pro',
};

const categoryCopy: Record<string, { subtitle: string; accent: string }> = {
  'iphone-13': { subtitle: 'Classic everyday protection', accent: '#0d917e' },
  'iphone-14': {
    subtitle: 'Clean design with everyday grip',
    accent: '#fac5d2',
  },
  'iphone-15': { subtitle: 'Slim, premium, and modern', accent: '#7c3aed' },
  'iphone-16': {
    subtitle: 'Fresh color stories and durable builds',
    accent: '#60a5fa',
  },
  'iphone-16-pro': {
    subtitle: 'Advanced finish for pro users',
    accent: '#1f2937',
  },
  'iphone-16-pro-max': {
    subtitle: 'Max protection and bigger screen styling',
    accent: '#f59e0b',
  },
  'iphone-17': {
    subtitle: 'Next-gen style for your daily carry',
    accent: '#f43f5e',
  },
  'iphone-17-pro': {
    subtitle: 'Performance-first premium cases',
    accent: '#a78bfa',
  },
  'iphone-18': {
    subtitle: 'New-year essentials and sleek finishes',
    accent: '#22d3ee',
  },
  'iphone-18-pro': {
    subtitle: 'Luxury protection for top-tier devices',
    accent: '#0d917e',
  },
};

const newArrivalTags = new Set(['New', 'Featured', 'Limited', 'Trending']);

export function getModelLabel(model: string): string {
  return modelLabels[model] ?? 'iPhone';
}

export function getCollectionTitle(model: string): string {
  return `${getModelLabel(model)} Cases`;
}

export function resolveCatalogModel(
  value: string | null | undefined,
): string | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  if (productCatalog[normalized]) return normalized;

  const compact = normalized.replace(/\s+/g, ' ');
  const match = Object.entries(modelLabels).find(([model, label]) => {
    const labelValue = label.toLowerCase();
    return (
      compact === labelValue ||
      compact === `${labelValue} cases` ||
      compact === `${model} cases`
    );
  });

  return match?.[0] ?? null;
}

export function getProducts(model: string): ProductItem[] {
  const key = resolveCatalogModel(model);
  return key ? productCatalog[key] : [];
}

export function findProduct(
  model: string,
  productId: number,
): CatalogProduct | null {
  const key = resolveCatalogModel(model);
  if (!key) return null;

  const product = productCatalog[key].find((item) => item.id === productId);
  if (!product) return null;

  return { ...product, model: key, modelLabel: getModelLabel(key) };
}

export function listCategories(): CatalogCategory[] {
  return Object.keys(modelLabels).map((model) => ({
    model,
    label: getModelLabel(model),
    subtitle: categoryCopy[model].subtitle,
    accent: categoryCopy[model].accent,
    count: productCatalog[model]?.length ?? 0,
  }));
}

export function listNewArrivals(): CatalogProduct[] {
  return Object.entries(productCatalog).flatMap(([model, products]) =>
    products
      .filter((product) => newArrivalTags.has(product.tag))
      .map((product) => ({
        ...product,
        model,
        modelLabel: getModelLabel(model),
      })),
  );
}

export function parsePrice(price: string): number {
  return Number(price.replace(/[^\d.]/g, '')) || 0;
}
