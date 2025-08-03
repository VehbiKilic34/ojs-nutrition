# OJS Nutrition - Supplement E-ticaret Sitesi

Bu proje, React ve TypeScript kullanılarak geliştirilmiş modern bir supplement e-ticaret web sitesidir.

## 🚀 Özellikler

### 🛍️ E-ticaret Fonksiyonları
- **Ürün Katalog**: Kategorilere göre ürün listesi
- **Ürün Detay**: Detaylı ürün bilgileri ve yorumlar
- **Sepet Yönetimi**: Ürün ekleme, çıkarma ve miktar güncelleme
- **Sipariş Sistemi**: Güvenli ödeme ve sipariş takibi
- **Kullanıcı Hesabı**: Profil yönetimi ve sipariş geçmişi

### 🔍 Arama ve Filtreleme
- **Gerçek Zamanlı Arama**: Header ve navbar'da anlık ürün arama
- **Kategori Filtreleme**: Ürünleri kategoriye göre filtreleme
- **Gelişmiş Arama**: Ürünler sayfasında detaylı filtreleme

### 📱 Kullanıcı Deneyimi
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Modern UI/UX**: Bootstrap 5 ile modern arayüz
- **Slider Bileşenleri**: Blaze Slider ile etkileyici görseller
- **Loading States**: Kullanıcı dostu yükleme durumları

### 🔐 Güvenlik ve Kimlik Doğrulama
- **Kullanıcı Kaydı**: Güvenli kayıt sistemi
- **Giriş/Çıkış**: JWT tabanlı kimlik doğrulama
- **E-posta Doğrulama**: Hesap aktivasyonu
- **Şifre Sıfırlama**: Güvenli şifre yenileme

## 🛠️ Teknolojiler

- **Frontend**: React 19, TypeScript
- **Styling**: Bootstrap 5, Bootstrap Icons, Tailwind CSS
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Slider**: Blaze Slider
- **Linting**: ESLint, TypeScript ESLint

## 📦 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd ojs-nutrition
```

2. **Bağımlılıkları yükleyin:**
```bash
pnpm install
```

3. **Development server'ı başlatın:**
```bash
pnpm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:5173
```

## 🏗️ Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── BlazeSlider.tsx  # Slider bileşeni
│   ├── CategoryCard.tsx # Kategori kartı
│   ├── ProductCard.tsx  # Ürün kartı
│   ├── Header.tsx       # Site başlığı
│   ├── Navbar.tsx       # Navigasyon menüsü
│   └── Footer.tsx       # Site altbilgisi
├── pages/               # Sayfa bileşenleri
│   ├── HomePage.tsx     # Ana sayfa
│   ├── ProductsPage.tsx # Ürünler sayfası
│   ├── CartPage.tsx     # Sepet sayfası
│   ├── LoginPage.tsx    # Giriş sayfası
│   └── RegisterPage.tsx # Kayıt sayfası
├── contexts/            # React Context'leri
│   ├── AuthContext.tsx  # Kimlik doğrulama durumu
│   ├── CartContext.tsx  # Sepet durumu
│   └── OrderContext.tsx # Sipariş durumu
├── hooks/               # Custom React hook'ları
│   ├── useAuth.ts       # Kimlik doğrulama hook'u
│   ├── useCart.ts       # Sepet hook'u
│   └── useOrder.ts      # Sipariş hook'u
├── services/            # API servisleri
│   └── api.ts           # API istekleri
├── data/                # Statik veriler
│   ├── products.ts      # Ürün verileri
│   ├── categories.ts    # Kategori verileri
│   └── navigation.ts    # Navigasyon verileri
└── types/               # TypeScript tip tanımları
    └── product.ts       # Ürün tipleri
```

## 🚀 Kullanılabilir Komutlar

```bash
# Development server başlatma
pnpm run dev

# Production build
pnpm run build

# Kod kalitesi kontrolü
pnpm run lint

# Build önizleme
pnpm run preview
```

## 🔧 Geliştirme

### Yeni Özellik Ekleme
1. Feature branch oluşturun: `git checkout -b feature/yeni-ozellik`
2. Geliştirmelerinizi yapın
3. Kod kalitesi kontrolü: `pnpm run lint`
4. Test edin
5. Pull request oluşturun

### Kod Standartları
- TypeScript strict mode kullanın
- ESLint kurallarına uyun
- Functional component'ler kullanın
- Props için interface tanımlayın
- Bootstrap ikonlarını tercih edin

## 📱 Responsive Tasarım

Proje, tüm cihazlarda mükemmel görünüm için responsive tasarım prensiplerini takip eder:
- **Mobil**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Masaüstü**: 1024px+

## 🔗 API Entegrasyonu

Proje aşağıdaki API endpoint'lerini kullanır:

- `GET /api/v1/products` - Ürün listesi
- `GET /api/v1/products/best-sellers` - Çok satanlar
- `GET /api/v1/products/{slug}` - Ürün detayı
- `GET /api/v1/categories` - Kategoriler
- `POST /api/v1/auth/login` - Kullanıcı girişi
- `POST /api/v1/auth/register` - Kullanıcı kaydı
- `POST /api/v1/orders` - Sipariş oluşturma

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
