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
  companyName: 'OJS NUTRITION',
  companyDescription: 'Sağlıklı yaşam için en kaliteli supplement ürünleri.',
  sections: [
    {
      id: 'company-info',
      title: 'OJS NUTRITION',
      links: [
        { id: 'contact', label: 'İletişim', url: '/iletisim' },
        { id: 'about', label: 'Hakkımızda', url: '/hakkimizda' },
        { id: 'faq', label: 'Sıkça Sorulan Sorular', url: '/faq' },
        { id: 'kvkk', label: 'KVKK', url: '/kvkk' },
        { id: 'principles', label: 'Çalışma İlkelerimiz', url: '/calisma-ilkeleri' },
        { id: 'sales-agreement', label: 'Satış Sözleşmesi', url: '/satis-sozlesmesi' },
        { id: 'warranty', label: 'Garanti ve İade Koşulları', url: '/garanti-iade' },
        { id: 'reviews', label: 'Gerçek Müşteri Yorumları', url: '/musteri-yorumlari' },
        { id: 'blog', label: 'Blog', url: '/blog' },
      ],
    },
    {
      id: 'categories',
      title: 'Kategoriler',
      links: [
        { id: 'protein', label: 'Protein', url: '/kategori/protein' },
        { id: 'sports-foods', label: 'Spor Gıdaları', url: '/kategori/spor-gidalari' },
        { id: 'health', label: 'Sağlık', url: '/kategori/saglik' },
        { id: 'food', label: 'Gıda', url: '/kategori/gida' },
        { id: 'vitamin', label: 'Vitamin', url: '/kategori/vitamin' },
        { id: 'accessory', label: 'Aksesuar', url: '/kategori/aksesuar' },
        { id: 'all-products', label: 'Tüm Ürünler', url: '/urunler' },
        { id: 'packages', label: 'Paketler', url: '/kategori/paketler' },
        { id: 'launch-offers', label: 'Lansmana Özel Fırsatlar', url: '/kategori/lansman-firsatlari' },
      ],
    },
    {
      id: 'popular-products',
      title: 'Popüler Ürünler',
      links: [
        { id: 'whey-protein', label: 'Whey Protein', url: '/urun/whey-protein' },
        { id: 'cream-of-rice', label: 'Cream of Rice', url: '/urun/cream-of-rice' },
        { id: 'creatine', label: 'Creatine', url: '/urun/creatine' },
        { id: 'bcaa-plus', label: 'BCAA+', url: '/urun/bcaa-plus' },
        { id: 'pre-workout', label: 'Pre-Workout', url: '/urun/pre-workout' },
        { id: 'fitness-package', label: 'Fitness Paketi', url: '/urun/fitness-paketi' },
        { id: 'collagen', label: 'Collagen', url: '/urun/collagen' },
        { id: 'daily-vitamin-package', label: 'Günlük Vitamin Paketi', url: '/urun/gunluk-vitamin-paketi' },
        { id: 'zma', label: 'ZMA', url: '/urun/zma' },
      ],
    },
  ],
  contactInfo: {
    email: 'info@ojsnutrition.com',
    phone: '+90 555 123 4567',
  },
}; 