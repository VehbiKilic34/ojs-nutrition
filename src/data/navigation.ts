export interface NavItem {
  id: string;
  label: string;
  path: string;
  isActive?: boolean;
  children?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    id: 'protein',
    label: 'PROTEİN',
    path: '/protein',
  },
  {
    id: 'sports-foods',
    label: 'SPOR GIDALARI',
    path: '/spor-gidalari',
  },
  {
    id: 'health',
    label: 'SAĞLIK',
    path: '/saglik',
  },
  {
    id: 'food',
    label: 'GIDA',
    path: '/gida',
  },
  {
    id: 'vitamin',
    label: 'VİTAMİN',
    path: '/vitamin',
  },
  {
    id: 'all-products',
    label: 'TÜM ÜRÜNLER',
    path: '/tum-urunler',
  },
];

export const siteConfig = {
  brandName: 'OJS Nutrition',
  tagline: 'Sağlıklı Yaşam İçin Kaliteli Besin Takviyeleri',
  contact: {
    phone: '+90 (212) 555 0123',
    email: 'info@ojsnutrition.com',
    address: 'İstanbul, Türkiye'
  }
}; 