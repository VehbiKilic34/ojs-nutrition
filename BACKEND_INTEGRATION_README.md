# OJS Nutrition - Backend Entegrasyonu

Bu proje, OJS Nutrition e-ticaret sitesinin backend API'si ile entegrasyonunu sağlar.

## 🚀 Tamamlanan Özellikler

### 1. Ana Sayfa - Çok Satanlar Kısmı
- ✅ React Router loader kullanarak sayfa yüklenmeden önce veri çekme
- ✅ Postman collection'daki "Products → List Best Sellers" endpoint'i ile bağlantı
- ✅ Gerçek API verilerini kullanma
- ✅ Loading state'leri ve error handling

### 2. Tüm Ürünler Sayfası
- ✅ `/urunler` URL'i ile erişim
- ✅ React Router loader ile veri yükleme
- ✅ Postman collection'daki "Products → Index" endpoint'i ile bağlantı
- ✅ Sayfalama sistemi (limit=12, offset hesaplama)
- ✅ Filtreleme (arama, kategori, alt kategori)
- ✅ URL query parameter'ları ile state yönetimi

### 3. Ürün Detay Sayfası
- ✅ `/urun/:slug` URL'i ile erişim
- ✅ React Router loader ile ürün detayı yükleme
- ✅ Postman collection'daki "Products → Show" endpoint'i ile bağlantı
- ✅ Aroma ve boyut seçimi (state yönetimi)
- ✅ Conditional rendering (indirim varsa göster)
- ✅ Açılır bölümler (Özellikler, Besin İçeriği, Kullanım Şekli)

## 🔧 Teknik Detaylar

### Loader Fonksiyonları
- `homeLoader`: Ana sayfa için çok satanlar verilerini çeker
- `allProductsLoader`: Tüm ürünler için sayfalama ve filtreleme ile veri çeker
- `productDetailLoader`: Ürün detayı için slug ile veri çeker

### API Endpoint'leri
- **Base URL**: `https://fe1111.projects.academy.onlyjs.com/api/v1`
- **Çok Satanlar**: `GET /products/best-sellers`
- **Tüm Ürünler**: `GET /products?limit=12&offset={offset}`
- **Ürün Detayı**: `GET /products/{slug}`

### Sayfalama Formülü
```javascript
const offset = (page - 1) * 12;
// Sayfa 1: offset = 0, Sayfa 2: offset = 12, Sayfa 3: offset = 24
```

## 📁 Dosya Yapısı

```
src/
├── loaders.ts              # React Router loader fonksiyonları
├── services/
│   └── api.ts             # API çağrıları ve tip tanımları
├── pages/
│   ├── HomePage.tsx       # Ana sayfa (loader ile çok satanlar)
│   ├── AllProductsPage.tsx # Tüm ürünler sayfası (loader ile)
│   └── ProductDetailPage.tsx # Ürün detay sayfası (loader ile)
└── components/
    ├── ProductCard.tsx     # Ürün kartı (conditional rendering)
    └── PromotionSlider.tsx # Çok satanlar slider'ı
```

## 🎯 Kullanım

### Ana Sayfa
- Sayfa yüklendiğinde otomatik olarak çok satanlar verileri çekilir
- Loader'dan gelen veriler kullanılır

### Tüm Ürünler Sayfası
- `/urunler` URL'i ile erişim
- Sayfa yüklendiğinde ilk 12 ürün otomatik yüklenir
- Sayfalama, arama ve filtreleme çalışır

### Ürün Detayı
- `/urun/:slug` URL'i ile erişim
- Ürün detayı loader ile yüklenir
- Aroma ve boyut seçimi state ile yönetilir

## 🔄 Sonraki Adımlar

### Henüz Bağlanmayan Özellikler
- [ ] Sepete ekleme fonksiyonalitesi
- [ ] Çok satanlar kısmındaki yorumlar
- [ ] Ürün detay sayfasındaki çok satanlar bölümü
- [ ] Ürün yorumları sistemi

### Geliştirilebilecek Özellikler
- [ ] Arama sonuçları için özel sayfa
- [ ] Kategori sayfaları için loader'lar
- [ ] Favori ürünler sistemi
- [ ] Ürün karşılaştırma

## 🚀 Projeyi Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 📝 Notlar

- Tüm veriler gerçek API'den gelir (mock data kullanılmaz)
- React Router v7 loader sistemi kullanılır
- TypeScript ile tip güvenliği sağlanır
- Bootstrap ve React Bootstrap ile responsive tasarım
- Conditional rendering ile indirim bilgileri gösterilir
