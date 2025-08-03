export interface FooterLink {
  id: string;
  label: string;
  url: string;
}

export interface FooterSection {
  id: string;
  title: string;
  content?: string;
  links?: FooterLink[];
}

export interface FooterData {
  companyName: string;
  companyDescription: string;
  sections: FooterSection[];
  contactInfo: {
    email: string;
    phone: string;
  };
}

export const footerData: FooterData = {
  companyName: 'OJS Nutrition',
  companyDescription: 'Sağlıklı yaşam için en kaliteli supplement ürünleri.',
  sections: [
    {
      id: 'quick-menu',
      title: 'Hızlı Menü',
      links: [
        { id: 'home', label: 'Anasayfa', url: '/' },
        { id: 'products', label: 'Ürünler', url: '/products' },
        { id: 'faq', label: 'Sık Sorulan Sorular', url: '/faq' },
        { id: 'contact', label: 'İletişim', url: '/iletisim' },
      ],
    },
  ],
  contactInfo: {
    email: 'info@ojsnutrition.com',
    phone: '+90 555 123 4567',
  },
}; 