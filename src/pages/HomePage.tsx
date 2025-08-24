import PromotionSlider from '../components/PromotionSlider';
import Footer from '../components/Footer';
import { useBestSellers } from '../data/products';
import { useReviews } from '../data/reviews';
import '../components/HomePage.css';

const HomePage = () => {
  const { bestSellers, loading: bestSellersLoading, error: bestSellersError } = useBestSellers();
  const { reviews, loading: reviewsLoading, total: totalReviews } = useReviews(1, 4);

  if (bestSellersLoading || reviewsLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Kategoriler - Banner resminin altında */}
      <section className="categories-section py-5">
        <div className="container-fluid px-0">
          {/* İlk satır - 3 kart */}
          <div className="d-flex justify-content-center mb-5 flex-wrap row">
            {/* PROTEİN Kartı - Baştan yapılacak */}
            <div className="category-card-wrapper col-6 col-sm-4">
              <div className="card shadow-sm border-0 category-card protein-card" onClick={() => console.log('PROTEİN kategorisi açıldı')}>
                <div className="card-body">
                  {/* Resim - Kart ile uyumlu */}
                  <img 
                    src="/src/assets/section_img/protein/1.jpg"
                    alt="Protein"
                    className="protein-image"
                  />
                  {/* PROTEİN Yazısı */}
                  <div className="protein-text">
                    <span>
                      PROTEİN
                    </span>
                  </div>
                  
                  {/* İNCELE Butonu */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('PROTEİN kategorisi açıldı');
                    }}
                    className="incele-button"
                  >
                    İNCELE
                  </button>
                </div>
              </div>
            </div>
            
            {/* VİTAMİNLER Kartı - 2. kart */}
            <div className="category-card-wrapper col-6 col-sm-4">
              <div className="card shadow-sm border-0 category-card vitaminler-card" onClick={() => console.log('VİTAMİNLER kategorisi açıldı')}>
                <div className="card-body">
                  {/* Resim - PROTEİN kartı gibi sol tarafta */}
                  <img 
                    src="/src/assets/section_img/vitaminler/2.jpg"
                    alt="Vitaminler"
                    className="vitaminler-image"
                  />
                  
                  {/* VİTA-MİNLER Yazısı */}
                  <div className="vitaminler-text">
                    <span>
                      VİTA-MİNLER
                    </span>
                  </div>
                  
                  {/* İNCELE Butonu */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('VİTAMİNLER kategorisi açıldı');
                    }}
                    className="incele-button"
                  >
                    İNCELE
                  </button>
                </div>
              </div>
            </div>
            
            {/* 3. Kategori Kartı */}
            <div className="category-card-wrapper col-6 col-sm-4">
              <div className="card shadow-sm border-0 category-card saglik-card" onClick={() => console.log('SAĞLIK kategorisi açıldı')}>
                <div className="card-body">
                  {/* Resim - Sağlık klasöründen */}
                  <img 
                    src="/src/assets/section_img/sağlık/3.jpg"
                    alt="Sağlık"
                    className="saglik-image"
                  />
                  
                  {/* SAĞLIK Yazısı */}
                  <div className="saglik-text">
                    <span>
                      SAĞLIK
                    </span>
                  </div>
                  
                  {/* İNCELE Butonu */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('SAĞLIK kategorisi açıldı');
                    }}
                    className="incele-button"
                  >
                    İNCELE
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* İkinci satır - 3 kart */}
          <div className="d-flex justify-content-center flex-wrap row">
            {/* 4. Kart - SPOR GIDALARI */}
            <div className="category-card-wrapper col-6 col-sm-4">
              <div className="card shadow-sm border-0 category-card spor-gidalari-card" onClick={() => console.log('SPOR GIDALARI kategorisi açıldı')}>
                <div className="card-body">
                  {/* Resim - Spor gıdaları klasöründen */}
                  <img 
                    src="/src/assets/section_img/spor gıdaları/5.jpg"
                    alt="Spor Gıdaları"
                    className="spor-gidalari-image"
                  />
                  
                  {/* SPOR GIDALARI Yazısı */}
                  <div className="spor-gidalari-text">
                    <span>
                      SPOR GIDALARI
                    </span>
                  </div>
                  
                  {/* İNCELE Butonu */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('SPOR GIDALARI kategorisi açıldı');
                    }}
                    className="incele-button"
                  >
                    İNCELE
                  </button>
                </div>
              </div>
            </div>
            
            {/* 5. Kategori Kartı */}
            <div className="category-card-wrapper col-6 col-sm-4">
              <div className="card shadow-sm border-0 category-card gida-card" onClick={() => console.log('GIDA kategorisi açıldı')}>
                <div className="card-body">
                  {/* Resim - Gıda klasöründen */}
                  <img 
                    src="/src/assets/section_img/gıda/7.jpg"
                    alt="Gıda"
                    className="gida-image"
                  />
                  
                  {/* GIDA Yazısı */}
                  <div className="gida-text">
                    <span>
                      GIDA
                    </span>
                  </div>
                  
                  {/* İNCELE Butonu */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('GIDA kategorisi açıldı');
                    }}
                    className="incele-button"
                  >
                    İNCELE
                  </button>
                </div>
              </div>
            </div>
            
            {/* 6. Kart - TÜM ÜRÜNLER */}
            <div className="category-card-wrapper col-6 col-sm-4">
              <div className="card shadow-sm border-0 category-card tum-urunler-card" onClick={() => console.log('TÜM ÜRÜNLER sayfası açıldı')}>
                <div className="card-body">
                  {/* Katman 1 - Tüm ürünler klasöründen */}
                  <img 
                    src="/src/assets/section_img/tüm ürünler/Katman 1.png"
                    alt="Katman 1"
                    className="katman-1-image"
                  />
                  
                  {/* Amino Asit Paket - Katmanın üzerinde */}
                  <img 
                    src="/src/assets/section_img/tüm ürünler/amino-asit-paket.png"
                    alt="Amino Asit Paket"
                    className="amino-asit-image"
                  />
                  
                  {/* TÜM ÜRÜNLER Yazısı */}
                  <div className="tum-urunler-text">
                    <span>
                      TÜM ÜRÜNLER
                    </span>
                  </div>
                  
                  {/* İNCELE Butonu */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('TÜM ÜRÜNLER sayfası açıldı');
                    }}
                    className="incele-button"
                  >
                    İNCELE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Çok Satanlar - Kategorilerin altında */}
      <section className="best-sellers-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-dark fw-bold mb-2">ÇOK SATANLAR</h2>
            <p className="text-muted mb-0">En popüler ve en çok tercih edilen ürünlerimiz</p>
            <div className="d-flex justify-content-center mt-3">
              <div className="bg-warning" style={{ width: '60px', height: '3px', borderRadius: '2px' }}></div>
            </div>
          </div>
          {bestSellers.length > 0 ? (
            <PromotionSlider 
              products={bestSellers}
              title=""
            />
          ) : bestSellersLoading ? (
            <div className="row">
              {[1, 2, 3].map((index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                  <div className="skeleton-card">
                    <div className="skeleton-image skeleton-loading"></div>
                    <div className="skeleton-title skeleton-loading"></div>
                    <div className="skeleton-text skeleton-loading"></div>
                    <div className="skeleton-text skeleton-loading"></div>
                    <div className="skeleton-price skeleton-loading"></div>
                    <div className="skeleton-button skeleton-loading"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : bestSellersError ? (
            <div className="text-center text-danger py-5">
              <div className="mb-3">
                <i className="bi bi-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="mb-2">Bir hata oluştu</h5>
              <p className="mb-3">{bestSellersError}</p>
              <button 
                className="btn btn-outline-primary"
                onClick={() => window.location.reload()}
              >
                Tekrar Dene
              </button>
            </div>
          ) : bestSellers.length === 0 && !bestSellersLoading ? (
            <div className="text-center text-muted py-5">
              <div className="mb-3">
                <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="mb-2">Henüz çok satan ürün bulunmuyor</h5>
              <p className="mb-3">Şu anda popüler ürünlerimizi keşfedin</p>
              <button 
                className="btn btn-primary"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Tüm Ürünleri Gör
              </button>
            </div>
          ) : (
            <div className="text-center text-muted py-5">
              <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Yükleniyor...</span>
              </div>
              <p className="mb-0">Çok satan ürünler yükleniyor...</p>
            </div>
          )}
        </div>
      </section>

      {/* 6527895.png Resmi */}
      <section className="promo-image-section py-5">
        <div className="container">
          <div className="text-center">
            <img 
              src="/src/assets/6527895.png" 
              alt="Promosyon Resmi" 
              className="img-fluid w-100"
              style={{ 
                height: 'auto',
                maxHeight: '480px',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section className="customer-reviews-section py-5">
        <div className="container">
          {/* Header */}
          <div className="reviews-header mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="reviews-title mb-0">GERÇEK MÜŞTERİ YORUMLARI</h2>
              <div className="d-flex align-items-center">
                <div className="stars-rating me-3">
                  <span style={{ color: '#ffc107', fontSize: '20px' }}>⭐⭐⭐⭐⭐</span>
                  <a href="#" className="rating-text ms-2" onClick={() => console.log('198453 Yorum linkine tıklandı')}>
                    {totalReviews.toLocaleString()} Yorum
                  </a>
                </div>
                <div className="navigation-arrows">
                  <button className="nav-arrow me-2">←</button>
                  <button className="nav-arrow">→</button>
                </div>
              </div>
            </div>
            <hr className="header-separator mt-3" />
          </div>

          {/* Yorum Kartları */}
          <div className="row">
            {reviews.map((review) => (
              <div key={review.id} className="col-lg-3 col-md-6 mb-4">
                <div className="review-card">
                  <div className="review-date">{review.date}</div>
                  <div className="review-summary">{review.summary}</div>
                  <div className="review-text">
                    {review.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default HomePage;
