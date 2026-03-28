export const BRAND = {
  name: 'Die Mart',
  founded: 2022,
  craftSince: 1980,
  founder: 'Elyas Nagavadria',
  secondGen: 'Hussain Nagavadria',
  location: 'Chinchani, Tarapur, Maharashtra',
  heroLocationTag: 'CHINCHANI \u00b7 TARAPUR \u00b7 MAHARASHTRA',
  factories: 3,
  karigars: '100+',
  diesManufactured: '10 Lakh+',
  designArchive: '3,600+',
  primaryTagline: 'The Die Behind Every Jewellery',
  secondaryTagline: 'Rooted in Craft. Driven by Intelligence.',
  instagram: '@die_mart_',
  instagramUrl: 'https://instagram.com/die_mart_/',
  hours: '6 AM \u2013 10 PM IST',
  whatsappNumber: '917499749770',
  whatsappLink: 'https://wa.me/917499749770',
  domain: 'diemart.co.in',
  url: 'https://diemart.co.in',
  marketHub: 'Zaveri Bazaar, Mumbai',
} as const;

export const TRUST_STATS = [
  '3,600+ Designs',
  '10 Lakh+ Dies Manufactured',
  '100+ Karigars',
  '3 Factories in Chinchani',
  '24/7 Operations',
  'Est. 2022',
  'Craft Since 1980',
  'Supplying India',
  'Middle East',
  'Europe',
] as const;

export const PRODUCTS = [
  { id: '01', name: 'Bangle Die', category: 'Traditional', description: 'The foundation of Indian jewellery manufacturing. Precision-cut bangle dies for every diameter and pattern.', pattern: 'hexagon' },
  { id: '02', name: 'Flower Die', category: 'Decorative', description: 'Intricate floral patterns with petal-level precision. From lotus to mogra, every bloom captured in steel.', pattern: 'circle' },
  { id: '03', name: 'Thappad Die', category: 'Flat Press', description: 'Clean, high-force flat dies for bold geometric patterns and statement jewellery pieces.', pattern: 'square' },
  { id: '04', name: 'Cutting Die', category: 'Precision Cut', description: 'Sharp-edge dies for intricate cutwork and filigree designs. Micron-level accuracy.', pattern: 'diamond' },
  { id: '05', name: 'Emboss Die', category: 'Relief Work', description: 'Three-dimensional relief patterns that add depth and texture to every piece of jewellery.', pattern: 'triangle' },
  { id: '06', name: 'Custom Die', category: 'Bespoke', description: 'Bring any design to life. Custom dies manufactured to exact specifications with 7-day turnaround.', pattern: 'star' },
] as const;

export const TIMELINE = [
  { beat: 1, year: '1980', heading: 'A Craft Begins', body: 'Elyas Nagavadria begins his journey in the jewellery die craft. Starting from Kurla, Mumbai, he learns the trade through hands-on work \u2014 carrying parcels between Kurla and Chinchani, watching karigars work their machines.' },
  { beat: 2, year: '1995', heading: 'Growing With Gold', body: 'Years of discipline and craft mastery pay off. Elyas expands operations in Chinchani. Karigar count grows steadily. Flower dies and emboss dies join the catalog alongside bangle dies.' },
  { beat: 3, year: '2008', heading: 'The CNC Revolution', body: 'Elyas invests in CNC wirecut machines, becoming one of the first die manufacturers in the region to blend traditional craftsmanship with computer-controlled precision.' },
  { beat: 4, year: '2016', heading: 'Three Factories Strong', body: 'Third factory opens in Chinchani. 100+ karigars now work across 3 units. Design archive crosses 2,000. Middle East orders begin. Over 10 lakh dies manufactured.' },
  { beat: 5, year: '2022', heading: 'Die Mart is Born', body: 'Hussain Nagavadria establishes Die Mart as a brand \u2014 formalising decades of craft into a company with digital vision and international ambition. European markets enter the pipeline.' },
  { beat: 6, year: '2026', heading: 'Intelligence Meets Craft', body: 'Die Mart launches its digital platform \u2014 3D catalog, AI-powered visual search, and Wirecut BCS. The world is the market.' },
] as const;

export const SERVICES = [
  {
    title: 'Wirecut Machining',
    description: 'Our CNC wire cut machines run around the clock \u2014 24 hours, 7 days a week. Every die set requires three precision operations: the cutting punch, the emboss punch, and the cavity. Each programmed individually, machined to micron tolerances, verified before the next stage.',
    tag: 'Specialists in bangle progressive cutting dies',
  },
  {
    title: 'Master Embossing',
    description: 'Three embossing disciplines under one roof. Hand emboss for standard designs. Engraving machine for complex work \u2014 monograms, bandhel patterns, large top designs. Laser emboss for the intricate \u2014 small, delicate patterns where only a laser has the resolution to execute the design.',
    tag: 'Hand \u00b7 Engraving Machine \u00b7 Laser',
  },
  {
    title: 'Quality Testing',
    description: 'Every die is physically pressed before it leaves our hands. Three gates: Chaap \u2014 the impression must be sharp and correct. Pisur \u2014 components must align with zero crush. Faat \u2014 the material must be crack-free. Any failure sends the die back. It does not leave until it passes all three.',
    tag: 'Chaap \u00b7 Pisur \u00b7 Faat \u2014 three-point quality protocol',
  },
] as const;

export const PROCESS_STEPS = [
  { step: '01', title: 'ORDER CREATED', description: 'Customer places the order. Design reviewed, order paper logged. Customer receives immediate WhatsApp confirmation.' },
  { step: '02', title: 'WASTAGE PREPARED', description: 'Our programmer calculates precise clearance tolerances for the die. Customer approves via WhatsApp.' },
  { step: '03', title: 'BOX RECEIVED', description: 'Customer delivers the raw material assembly. Our team confirms receipt immediately.' },
  { step: '04', title: 'CNC PROGRAMMING', description: 'Three separate programs written: cutting punch, emboss punch, cavity. Every program verified before the machine runs.' },
  { step: '05', title: 'WIRE CUT & EMBOSSING', description: 'Machines execute. Components machined in sequence. Die goes to embossing \u2014 hand, engraving, or laser.' },
  { step: '06', title: 'TESTED & DISPATCHED', description: 'Three-point quality test. Pass: dispatched with WhatsApp confirmation. Fail: repaired and re-tested. It leaves only when it is right.' },
] as const;

export const STATS = [
  { value: '3,600+', label: 'Designs in Archive' },
  { value: '10 Lakh+', label: 'Dies Manufactured' },
  { value: '100+', label: 'Master Karigars' },
  { value: '3', label: 'Factory Locations' },
  { value: '24/7', label: 'Machine Uptime' },
  { value: '30+', label: 'Years of Craft' },
] as const;

export const CONTACT_OPTIONS = [
  'Bangle Dies',
  'Decorative Dies',
  'Custom Dies',
  'General Inquiry',
] as const;

export const NAV_LINKS = [
  { label: 'Craft', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Legacy', href: '#legacy' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SEO = {
  title: 'Die Mart \u2014 Jewellery Die Manufacturers | Chinchani, Tarapur, Maharashtra',
  description: 'Die Mart is a jewellery die manufacturer based in Chinchani, Tarapur, Maharashtra. 3,600+ designs, 10 Lakh+ dies manufactured, 3 factories, 100+ karigars. Specialists in bangle progressive cutting dies.',
  canonical: 'https://diemart.co.in',
  foundingDate: '2022',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ManufacturingBusiness',
    name: 'Die Mart',
    url: 'https://diemart.co.in',
    foundingDate: '2022',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chinchani, Tarapur',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://wa.me/917499749770',
    },
    sameAs: ['https://instagram.com/die_mart_/'],
  },
} as const;

export const HERO_BEATS = [
  { beat: 1, scrollRange: [0, 0.15], title: 'HERO', content: '' },
  { beat: 2, scrollRange: [0.15, 0.35], title: 'ORIGIN', content: 'Elyas Nagavadria began his journey in 1980. From the slums of Kurla to the workshops of Chinchani \u2014 a man who started with nothing and built everything.' },
  { beat: 3, scrollRange: [0.35, 0.55], title: 'CRAFT', content: 'One machine. One promise. Three factories. 100+ karigars. Every die that leaves our hands carries the weight of four decades of precision.' },
  { beat: 4, scrollRange: [0.55, 0.75], title: 'THE DIE', content: 'Fully exploded. Every component visible \u2014 base plate, emboss punch, cutting punch, cavity, screws. Wirecut machining. Master embossing. Quality testing. 3,600+ designs.' },
  { beat: 5, scrollRange: [0.75, 0.90], title: 'REVOLUTION', content: 'In 2022, Hussain Nagavadria established Die Mart as a brand. AI-powered catalogs. Digital tracking. The only manufacturer in the world building this future.' },
  { beat: 6, scrollRange: [0.90, 1.0], title: 'THE WORLD', content: 'Die reassembled. Perfect. Ready. From Chinchani to the world \u2014 India, Middle East, Europe. Your next die starts here.' },
] as const;

export const ABOUT_CONTENT = {
  sectionLabel: 'OUR STORY',
  heading: 'The Man Behind the Metal',
  paragraphs: [
    'Die Mart was built by Elyas Nagavadria \u2014 a man who started with nothing. At seventeen, he left the slums of Kurla with no inheritance and no trade. He took the train to Tarapur each day, learned the secrets of jewellery die-making in the workshops of Mumbai\u2019s Zaveri Bazaar, and built his knowledge piece by piece, machine by machine.',
    'For years, he personally carried finished dies from Tarapur to Mumbai by train \u2014 parcelling them to customers across the city on his word that the work would be perfect. It always was.',
    'Thirty years later, Die Mart operates three factories, serves customers from Tarapur to Dhanau and across India, and has a design archive of over 3,600 dies.',
  ],
  founderQuote: '\u201cI started with nothing. I learned from the best. I built what I believed in. Every customer who trusts us \u2014 that trust is the only reward that matters.\u201d \u2014 Elyas Nagavadria, Founder',
  closingLine: 'His son Hussain carries the business forward \u2014 bringing 3D design, AI-powered catalog systems, and a new generation\u2019s vision to a craft his father built with his hands.',
} as const;

export const CATALOG_CONTENT = {
  sectionLabel: 'OUR ARCHIVE',
  heading: '3,600+ Designs',
  body: 'Decades of jewellery die craftsmanship \u2014 catalogued, 3D rendered, and searchable. Every category: bangle, ring, mono, flower, thappa, and more. Browse, search by photo, and order directly.',
  specialistCallout: 'Specialists in bangle progressive cutting dies \u2014 the most technically complex category in the trade.',
  ctaText: 'REQUEST CATALOG ACCESS',
} as const;
