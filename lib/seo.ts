import type { Metadata } from 'next';
import { BRAND, SEO } from './brand';

export const LOCALES = ['en', 'hi', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export type PageKey =
  | 'home'
  | 'about'
  | 'products'
  | 'services'
  | 'process'
  | 'catalog'
  | 'contact'
  | 'viewer';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_IN',
  hi: 'hi_IN',
  ar: 'ar_AE',
};

const KEYWORDS: Record<Locale, string[]> = {
  en: [...SEO.keywords],
  hi: [
    'ज्वेलरी डाई',
    'डाई मोल्ड',
    'बैंगल डाई',
    'चूड़ी डाई',
    'ज्वेलरी डाई निर्माता',
    'डाई निर्माता महाराष्ट्र',
    'jewellery die',
    'die mould',
    'bangle die',
    'jewellery die manufacturer India',
  ],
  ar: [
    'قوالب المجوهرات',
    'قالب أساور',
    'مصنع قوالب المجوهرات الهند',
    'jewellery die',
    'die mould',
    'bangle die',
    'jewellery die manufacturer India',
  ],
};

type PageCopy = { title: string; description: string };

const PAGE_COPY: Record<PageKey, Record<Locale, PageCopy>> = {
  home: {
    en: {
      title:
        'Die Mart — Jewellery Die Manufacturer | Bangle Dies & Die Moulds | Chinchani, Tarapur, Maharashtra',
      description:
        'Die Mart manufactures jewellery dies (die moulds) in Chinchani, Tarapur, Dist. Palghar, Maharashtra, India. Bangle dies, flower dies, cutting & emboss dies, custom dies. 3 factories, 100+ karigars, 3,600+ designs. WhatsApp +91 7499749770.',
    },
    hi: {
      title:
        'डाई मार्ट — ज्वेलरी डाई निर्माता | बैंगल डाई व डाई मोल्ड | चिंचणी, तारापुर, महाराष्ट्र',
      description:
        'डाई मार्ट चिंचणी, तारापुर, जिला पालघर, महाराष्ट्र में ज्वेलरी डाई (डाई मोल्ड) निर्माता है। बैंगल डाई, फ्लावर डाई, कटिंग व एम्बॉस डाई, कस्टम डाई। 3 फैक्ट्रियां, 100+ कारीगर, 3,600+ डिज़ाइन। WhatsApp +91 7499749770।',
    },
    ar: {
      title:
        'داي مارت — مصنع قوالب المجوهرات | قوالب الأساور | تشينتشاني، ماهاراشترا، الهند',
      description:
        'داي مارت مصنع قوالب مجوهرات في تشينتشاني، تارابور، ماهاراشترا، الهند. قوالب أساور، قوالب زهور، قوالب قطع ونقش، وقوالب حسب الطلب. 3 مصانع، أكثر من 100 حرفي، أكثر من 3,600 تصميم. واتساب ‎+91 7499749770.',
    },
  },
  about: {
    en: {
      title: 'About Die Mart — Jewellery Die Manufacturer Since 1980s Craft | Chinchani, Maharashtra',
      description:
        'The story of Die Mart: founder Elyas Nagavadria built a jewellery die manufacturing business from nothing — today 3 factories in Chinchani, Tarapur, 100+ karigars and a 3,600+ die design archive.',
    },
    hi: {
      title: 'हमारे बारे में — डाई मार्ट | ज्वेलरी डाई निर्माता, चिंचणी, महाराष्ट्र',
      description:
        'डाई मार्ट की कहानी: संस्थापक इलियास नागवाड़िया ने शून्य से ज्वेलरी डाई निर्माण का व्यवसाय खड़ा किया — आज चिंचणी में 3 फैक्ट्रियां, 100+ कारीगर और 3,600+ डिज़ाइन का संग्रह।',
    },
    ar: {
      title: 'عن داي مارت — مصنع قوالب المجوهرات | تشينتشاني، الهند',
      description:
        'قصة داي مارت: بنى المؤسس إلياس ناجافادريا أعمال تصنيع قوالب المجوهرات من الصفر — اليوم 3 مصانع في تشينتشاني، وأكثر من 100 حرفي، وأرشيف يضم أكثر من 3,600 تصميم.',
    },
  },
  products: {
    en: {
      title: 'Jewellery Dies & Die Moulds — Bangle, Flower, Cutting, Emboss & Custom Dies | Die Mart',
      description:
        'Die Mart manufactures bangle dies, flower dies, thappad dies, cutting dies, emboss dies and custom jewellery dies in Chinchani, Tarapur, Maharashtra. Specialists in bangle progressive cutting dies. 3,600+ designs.',
    },
    hi: {
      title: 'प्रोडक्ट्स — बैंगल डाई, फ्लावर डाई, कटिंग, एम्बॉस व कस्टम ज्वेलरी डाई | डाई मार्ट',
      description:
        'डाई मार्ट बैंगल डाई, फ्लावर डाई, थप्पड़ डाई, कटिंग डाई, एम्बॉस डाई और कस्टम ज्वेलरी डाई बनाता है — चिंचणी, तारापुर, महाराष्ट्र। बैंगल प्रोग्रेसिव कटिंग डाई के विशेषज्ञ। 3,600+ डिज़ाइन।',
    },
    ar: {
      title: 'المنتجات — قوالب الأساور والزهور والقطع والنقش والقوالب المخصصة | داي مارت',
      description:
        'تصنع داي مارت قوالب الأساور وقوالب الزهور وقوالب القطع والنقش والقوالب المخصصة للمجوهرات في تشينتشاني، ماهاراشترا، الهند. متخصصون في قوالب القطع التدريجي للأساور. أكثر من 3,600 تصميم.',
    },
  },
  services: {
    en: {
      title: 'Services — CNC Wirecut Machining, Master Embossing & Quality Testing | Die Mart',
      description:
        'Die Mart jewellery die services: 24/7 CNC wirecut machining, hand / engraving-machine / laser embossing, and a three-point quality test (chaap, pisur, faat) on every die. Chinchani, Tarapur, Maharashtra.',
    },
    hi: {
      title: 'सेवाएं — CNC वायरकट मशीनिंग, एम्बॉसिंग व क्वालिटी टेस्टिंग | डाई मार्ट',
      description:
        'डाई मार्ट की ज्वेलरी डाई सेवाएं: 24/7 CNC वायरकट मशीनिंग, हैंड / इंग्रेविंग मशीन / लेज़र एम्बॉसिंग, और हर डाई पर तीन-स्तरीय क्वालिटी टेस्ट। चिंचणी, तारापुर, महाराष्ट्र।',
    },
    ar: {
      title: 'الخدمات — قطع الأسلاك CNC والنقش واختبار الجودة | داي مارت',
      description:
        'خدمات داي مارت لقوالب المجوهرات: تشغيل آلات قطع الأسلاك CNC على مدار الساعة، نقش يدوي وآلي وبالليزر، واختبار جودة ثلاثي على كل قالب. تشينتشاني، ماهاراشترا، الهند.',
    },
  },
  process: {
    en: {
      title: 'Our Process — From Order to Dispatch in 6 Steps | Die Mart Jewellery Dies',
      description:
        'How Die Mart manufactures a jewellery die: order, wastage calculation, raw material box, CNC programming, wirecut & embossing, three-point quality test and dispatch — with WhatsApp updates at every stage.',
    },
    hi: {
      title: 'हमारी प्रक्रिया — ऑर्डर से डिस्पैच तक 6 चरण | डाई मार्ट ज्वेलरी डाई',
      description:
        'डाई मार्ट में ज्वेलरी डाई कैसे बनती है: ऑर्डर, वेस्टेज गणना, रॉ मटीरियल बॉक्स, CNC प्रोग्रामिंग, वायरकट व एम्बॉसिंग, तीन-स्तरीय क्वालिटी टेस्ट और डिस्पैच — हर चरण पर WhatsApp अपडेट।',
    },
    ar: {
      title: 'عمليتنا — من الطلب إلى التسليم في 6 خطوات | داي مارت',
      description:
        'كيف تصنع داي مارت قالب المجوهرات: الطلب، حساب التفاوتات، استلام المواد، برمجة CNC، القطع والنقش، اختبار الجودة الثلاثي ثم التسليم — مع تحديثات واتساب في كل مرحلة.',
    },
  },
  catalog: {
    en: {
      title: 'Catalog — 3,600+ Jewellery Die Designs | Bangle, Ring, Flower & More | Die Mart',
      description:
        'Browse the Die Mart archive of 3,600+ jewellery die designs — bangle, ring, mono, flower, thappa and more. 3D rendered and searchable. Request catalog access on WhatsApp +91 7499749770.',
    },
    hi: {
      title: 'कैटलॉग — 3,600+ ज्वेलरी डाई डिज़ाइन | बैंगल, रिंग, फ्लावर व अधिक | डाई मार्ट',
      description:
        'डाई मार्ट का 3,600+ ज्वेलरी डाई डिज़ाइन का संग्रह देखें — बैंगल, रिंग, मोनो, फ्लावर, थप्पा और अधिक। 3D रेंडर और सर्चेबल। WhatsApp +91 7499749770 पर कैटलॉग एक्सेस मांगें।',
    },
    ar: {
      title: 'الكتالوج — أكثر من 3,600 تصميم لقوالب المجوهرات | داي مارت',
      description:
        'تصفح أرشيف داي مارت الذي يضم أكثر من 3,600 تصميم لقوالب المجوهرات — أساور وخواتم وزهور والمزيد. اطلب الوصول إلى الكتالوج عبر واتساب ‎+91 7499749770.',
    },
  },
  contact: {
    en: {
      title: 'Contact Die Mart — WhatsApp +91 7499749770 | Jewellery Die Manufacturer, Chinchani',
      description:
        'Contact Die Mart for bangle dies, decorative dies and custom jewellery dies. WhatsApp +91 7499749770. Factory in Chinchani, Tarapur, Dist. Palghar, Maharashtra, India. Open 6 AM – 10 PM IST.',
    },
    hi: {
      title: 'संपर्क करें — डाई मार्ट | WhatsApp +91 7499749770 | चिंचणी, महाराष्ट्र',
      description:
        'बैंगल डाई, डेकोरेटिव डाई और कस्टम ज्वेलरी डाई के लिए डाई मार्ट से संपर्क करें। WhatsApp +91 7499749770। फैक्ट्री: चिंचणी, तारापुर, जिला पालघर, महाराष्ट्र। समय: सुबह 6 – रात 10 IST।',
    },
    ar: {
      title: 'اتصل بداي مارت — واتساب ‎+91 7499749770 | تشينتشاني، الهند',
      description:
        'تواصل مع داي مارت لقوالب الأساور والقوالب الزخرفية والقوالب المخصصة. واتساب ‎+91 7499749770. المصنع في تشينتشاني، تارابور، ماهاراشترا، الهند. مفتوح من 6 صباحًا حتى 10 مساءً بتوقيت الهند.',
    },
  },
  viewer: {
    en: {
      title: '3D Die Viewer — Explore Jewellery Dies in 3D | Die Mart',
      description:
        'Explore real Die Mart jewellery dies in interactive 3D — bangle dies and decorative dies modelled from production pieces, manufactured in Chinchani, Tarapur, Maharashtra.',
    },
    hi: {
      title: '3D डाई व्यूअर — ज्वेलरी डाई 3D में देखें | डाई मार्ट',
      description:
        'डाई मार्ट की असली ज्वेलरी डाई इंटरैक्टिव 3D में देखें — चिंचणी, तारापुर, महाराष्ट्र में निर्मित बैंगल और डेकोरेटिव डाई।',
    },
    ar: {
      title: 'عارض القوالب ثلاثي الأبعاد — داي مارت',
      description:
        'استكشف قوالب مجوهرات داي مارت الحقيقية بتقنية ثلاثية الأبعاد تفاعلية — قوالب أساور وقوالب زخرفية مصنوعة في تشينتشاني، ماهاراشترا، الهند.',
    },
  },
};

const PAGE_PATH: Record<PageKey, string> = {
  home: '',
  about: '/about',
  products: '/products',
  services: '/services',
  process: '/process',
  catalog: '/catalog',
  contact: '/contact',
  viewer: '/viewer',
};

function toLocale(locale: string): Locale {
  return (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : 'en';
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    en: `${BRAND.url}/en${path}`,
    hi: `${BRAND.url}/hi${path}`,
    ar: `${BRAND.url}/ar${path}`,
    'x-default': `${BRAND.url}/en${path}`,
  };
}

export function pageMetadata(localeParam: string, page: PageKey): Metadata {
  const locale = toLocale(localeParam);
  const path = PAGE_PATH[page];
  const { title, description } = PAGE_COPY[page][locale];
  const url = `${BRAND.url}/${locale}${path}`;

  return {
    title,
    description,
    keywords: KEYWORDS[locale],
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Die Mart',
      type: 'website',
      locale: OG_LOCALE[locale],
      images: [
        {
          url: SEO.ogImage.url,
          width: SEO.ogImage.width,
          height: SEO.ogImage.height,
          alt: SEO.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SEO.ogImage.url],
    },
  };
}
