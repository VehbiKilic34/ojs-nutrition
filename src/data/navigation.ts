export interface NavItem {
  id: string;
  label: string;
  path: string;
  isActive?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    label: 'Ana Sayfa',
    path: '/',
  },
  {
    id: 'products',
    label: 'Tüm Ürünler',
    path: '/urunler',
  },
  {
    id: 'about',
    label: 'Hakkımızda',
    path: '/hakkimizda',
  },
  {
    id: 'faq',
    label: 'S.S.S',
    path: '/sss',
  },
  {
    id: 'contact',
    label: 'İletişim',
    path: '/iletisim',
  },
  {
    id: 'test',
    label: 'Test',
    path: '/test',
  },
];

export const siteConfig = {
  brandName: 'OJS Nutrition',
}; 