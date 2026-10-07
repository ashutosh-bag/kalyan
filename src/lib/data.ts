import { Project, BlogPost, ServiceItem } from './types';

export const HERO_LETTER_IMAGES = {
  K: [
    {
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      title: 'Patia Luxury Villa — Bhubaneswar',
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      title: 'Mahanadi Riverfront Estate — Cuttack',
    },
    {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      title: 'Jaydev Vihar Duplex Lounge — Bhubaneswar',
    },
    {
      url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80',
      title: 'Puri Coastal Retreat — Marine Drive',
    },
  ],
  Y: [
    {
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80',
      title: 'Calacatta & Teak Kitchen — Chandrasekharpur',
    },
    {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
      title: 'Courtyard Pavilion — CDA Cuttack',
    },
    {
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80',
      title: 'Laterite Stone Spa Bath — Khandagiri',
    },
    {
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
      title: 'Artisanal Dining Hall — Bhubaneswar',
    },
  ],
  N: [
    {
      url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=80',
      title: 'Infocity Executive Penthouse — Bhubaneswar',
    },
    {
      url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=80',
      title: 'Sky Terrace Duplex — Cuttack Ring Road',
    },
    {
      url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1400&q=80',
      title: 'The Brass & Rosewood Salon — Saheed Nagar',
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      title: 'Private Library & Study — Rourkela Estate',
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'kyn-proj-01',
    slug: 'patia-monolithic-villa',
    title: 'The Patia Monolithic Villa',
    category: 'residential',
    location: 'Patia, Bhubaneswar',
    year: 2025,
    areaSqFt: 6800,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'An architectural sanctuary blending natural Khandagiri sandstone, seasoned Indian teak, and double-height glass. Features an inner courtyard that brings monsoon breezes and serene natural light indoors.',
    client: 'Industrialist Family',
    featured: true,
    materials: ['Khandagiri Sandstone', 'Burma Teak', 'Unlacquered Brass', 'Italian Statuario Marble'],
  },
  {
    id: 'kyn-proj-02',
    slug: 'mahanadi-cda-residence',
    title: 'Mahanadi Riverfront Residence',
    category: 'residential',
    location: 'CDA Sector 9, Cuttack',
    year: 2024,
    areaSqFt: 7500,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'A contemporary tribute to Cuttack’s silver city heritage and riverfront breezes. Polished terrazzo, bespoke brass filigree screens, and minimalist acoustic wood ceilings.',
    client: 'Heritage Business House',
    featured: true,
    materials: ['River Basalt Stone', 'Custom Brass Filigree', 'Honed Terrazzo', 'Warm Cedar'],
  },
  {
    id: 'kyn-proj-03',
    slug: 'infocity-tech-headquarters',
    title: 'Infocity Corporate Headquarters',
    category: 'commercial',
    location: 'Infocity, Bhubaneswar',
    year: 2025,
    areaSqFt: 11500,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Corporate prestige designed with biophilic Odia architecture. Micro-perforated wood acoustic baffles, circadian dynamic lighting, and museum-grade Dhokra metal installations.',
    client: 'Enterprise Software Corporation',
    featured: true,
    materials: ['Acoustic Teak', 'Black Marquina', 'Dhokra Metal Accents', 'Low-Iron Acoustic Glass'],
  },
  {
    id: 'kyn-proj-04',
    slug: 'puri-marine-drive-villa',
    title: 'The Bay of Bengal Coastal Villa',
    category: 'hospitality',
    location: 'Marine Drive, Puri',
    year: 2024,
    areaSqFt: 9200,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Engineered for coastal resilience and sensory calm. Salt-resistant lime plasters, local laterite pavers, and open verandas facing the Puri twilight.',
    client: 'Luxury Boutique Resort Group',
    featured: false,
    materials: ['Laterite Stone', 'Hydraulic Lime Plaster', 'Reclaimed Sal Wood'],
  },
  {
    id: 'kyn-proj-05',
    slug: 'jaydev-vihar-sky-duplex',
    title: 'Jaydev Vihar Sky Duplex',
    category: 'penthouse',
    location: 'Jaydev Vihar, Bhubaneswar',
    year: 2025,
    areaSqFt: 5800,
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'A 14th-floor penthouse overlooking the smart city skyline. Minimalist floating staircase, Italian bookmatched marble, and automated smart climate control.',
    client: 'Senior Tech Executive',
    featured: true,
    materials: ['Bookmatched Calacatta', 'Champagne Titanium', 'Smoked European Oak'],
  },
  {
    id: 'kyn-proj-06',
    slug: 'cantonment-road-heritage-estate',
    title: 'Cantonment Road Heritage Bungalow',
    category: 'residential',
    location: 'Cantonment Road, Cuttack',
    year: 2024,
    areaSqFt: 6200,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Sensitive revitalization of an ancestral colonial-era bungalow, pairing heritage exposed brick arches with ultra-sleek contemporary brass joinery.',
    client: 'Senior High Court Jurist',
    featured: false,
    materials: ['Kiln-Fired Terracotta', 'Reclaimed Teak', 'Blackened Steel', 'Handloom Linen'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-01',
    title: 'Architectural Interior Design',
    subtitle: 'Comprehensive residential & commercial transformation',
    description: 'From 3D spatial simulation and Vastu-compliant layout planning to municipal coordination and demolition-to-handover turnkey execution in Bhubaneswar, Cuttack, and across Odisha.',
    features: ['Vastu-harmonized spatial architecture', 'Photorealistic raytraced 3D visual walkthroughs', 'Statutory approvals & structural compliance', 'Complete site supervision & vendor oversight'],
    icon: 'Compass',
    metric: '100% turnkey delivery',
  },
  {
    id: 'srv-02',
    title: 'Bespoke Millwork & Odia Artistry',
    subtitle: 'Custom furniture and regional craftsmanship',
    description: 'Handcrafted cabinetry, custom Burma teak furniture, rare natural stone selection, and curating authentic Odia brass filigree and Pattachitra artworks for modern luxury homes.',
    features: ['Custom modular kitchen & wardrobes', 'Seasoned teak, walnut & marble sourcing', 'Bespoke brass filigree & craft integration', 'Curated lighting & imported fabrics'],
    icon: 'Palette',
    metric: 'Over 30 master artisan guilds',
  },
  {
    id: 'srv-03',
    title: 'Architectural Lighting & Smart Living',
    subtitle: 'Atmosphere & automation engineering',
    description: 'Invisible cove lighting calibrated to natural daylight cycles, Lutron & KNX smart automation, and acoustic panelling suited for Odisha’s climate.',
    features: ['Smart home touchless automation', 'Concealed architectural cove profiles', 'Acoustic decay & theater engineering', 'Climate-adapted ventilation design'],
    icon: 'Sparkles',
    metric: 'Energy-star smart living',
  },
  {
    id: 'srv-04',
    title: 'Commercial & Institutional Direction',
    subtitle: 'Corporate offices, clinics & luxury hospitality',
    description: 'High-impact executive headquarters, premium hospitality destinations, and modern retail environments across Bhubaneswar, Cuttack, Puri, and Rourkela.',
    features: ['Corporate identity in physical space', 'Executive boardroom acoustics & AV', 'High-traffic durable stone & finishes', 'Rigorous timeline and budget management'],
    icon: 'Building2',
    metric: 'Enterprise execution scale',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    slug: 'modern-interior-architecture-odisha',
    title: 'Modern Architecture in Odisha: Balancing Tropical Climate with Quiet Luxury',
    excerpt: 'How contemporary residences in Bhubaneswar and Cuttack are utilizing natural Khandagiri sandstone, courtyards, and deep overhangs to stay naturally cool and luxurious.',
    date: 'March 2026',
    readTime: '5 min read',
    category: 'Regional Architecture',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Ar. Somit Patnaik',
      role: 'Principal Architect & Founder',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'post-02',
    slug: 'teak-and-laterite-craftsmanship',
    title: 'The Revival of Teak and Laterite in Contemporary Odia Homes',
    excerpt: 'Exploring how local materials can be reimagined with minimalist Italian joinery techniques for timeless durability in coastal and riverfront climates.',
    date: 'February 2026',
    readTime: '7 min read',
    category: 'Material Innovation',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Subhalaxmi Ray',
      role: 'Design Director & Material Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'post-03',
    slug: 'lighting-vastu-harmony',
    title: 'Harmonizing Vastu Shastra with Modern Minimalist Lighting Schemes',
    excerpt: 'Practical insights into combining centuries-old spatial energy principles with recessed architectural linear fixtures and automated daylight rhythms.',
    date: 'January 2026',
    readTime: '6 min read',
    category: 'Spatial Design',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Rohan Mohanty',
      role: 'Head of Lighting & Automation',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
  },
];

export const AGENCY_STATS = [
  { value: '140+', label: 'Luxury Homes & Villas in Odisha' },
  { value: '12+', label: 'Years of Architectural Excellence' },
  { value: '100%', label: 'Turnkey Delivery Guarantee' },
  { value: '98%', label: 'Client Referrals & Trust' },
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: 'KYN transformed our Patia villa into an architectural masterpiece. The way they integrated our ancestral courtyard with contemporary Italian marble and teak is unbelievable.',
    client: 'Er. Rajesh & Manaswini Mishra',
    location: 'Patia, Bhubaneswar',
    role: 'Private Villa Owner',
  },
  {
    quote: 'Their attention to detail on our CDA Cuttack riverfront residence exceeded all expectations. Flawless execution, transparent budgets, and timeless aesthetics.',
    client: 'Debabrata Mohapatra',
    location: 'CDA Sector 9, Cuttack',
    role: 'Managing Director, Horizon Infra',
  },
  {
    quote: 'From Vastu-aligned layout to turnkey execution of our Infocity tech office, KYN has set a new benchmark for interior architecture in Odisha.',
    client: 'Ananya Tripathy',
    location: 'Infocity, Bhubaneswar',
    role: 'Founder, CloudCore Labs',
  },
];
