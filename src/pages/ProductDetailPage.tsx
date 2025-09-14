import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import type { ProductDetail } from '../services/api';

interface LoaderData {
  product: ProductDetail;
}

const ProductDetailPage: React.FC = () => {
  const { product } = useLoaderData() as LoaderData;
  
  // Seçilen aroma ve boyut için state
  const [selectedAroma, setSelectedAroma] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Sayfa yüklenirken loading state
  if (!product) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  // Mevcut aromaları ve boyutları al
  const availableAromas = [...new Set(product.variants.map(v => v.aroma))];
  const availableSizes = [...new Set(product.variants.map(v => v.size))];

  // Seçilen variant'ı bul
  const selectedVariant = product.variants.find(v => 
    v.aroma === selectedAroma && 
    v.size.total_services === (selectedSize ? parseInt(selectedSize) : 0)
  );

  return (
    <div className="product-detail-page">
      <div className="container py-5">
        <div className="row">
          {/* Sol taraf - Ürün resmi */}
          <div className="col-lg-6 mb-4">
            <div className="product-image-container">
              <img 
                src={product.variants[0]?.photo_src || '/src/assets/best-salery/11.jpg'} 
                alt={product.name}
                className="img-fluid rounded shadow"
                style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Sağ taraf - Ürün bilgileri */}
          <div className="col-lg-6">
            <div className="product-info">
              {/* Ürün adı */}
              <h1 className="product-title mb-3">{product.name}</h1>
              
              {/* Kısa açıklama */}
              <p className="product-description text-muted mb-4">
                {product.short_explanation}
              </p>

              {/* Yıldız değerlendirmesi ve yorum sayısı */}
              <div className="rating-section mb-4">
                <div className="d-flex align-items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        color: i < product.average_star ? '#ffc107' : '#e0e0e0',
                        fontSize: '20px',
                        marginRight: '2px'
                      }}
                    >
                      ⭐
                    </span>
                  ))}
                  <span className="ms-3 text-muted">
                    {product.comment_count.toLocaleString()} Yorum
                  </span>
                </div>
              </div>

              {/* Etiketler */}
              <div className="tags-section mb-4">
                {product.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="badge bg-secondary me-2"
                    style={{ fontSize: '0.9rem', padding: '0.5rem 0.8rem' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Aroma seçimi */}
              <div className="aroma-section mb-4">
                <h6 className="fw-bold mb-3">AROMA:</h6>
                <div className="row g-2">
                  {availableAromas.map((aroma) => (
                    <div key={aroma} className="col-6 col-md-4">
                      <button
                        className={`btn w-100 ${
                          selectedAroma === aroma 
                            ? 'btn-primary' 
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setSelectedAroma(aroma)}
                        style={{ 
                          fontSize: '0.9rem',
                          padding: '0.5rem 0.3rem',
                          minHeight: '40px'
                        }}
                      >
                        {aroma}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boyut seçimi */}
              <div className="size-section mb-4">
                <h6 className="fw-bold mb-3">BOYUT:</h6>
                <div className="row g-2">
                  {availableSizes.map((size, index) => (
                    <div key={index} className="col-6 col-md-4">
                      <button
                        className={`btn w-100 position-relative ${
                          selectedSize === size.total_services.toString() 
                            ? 'btn-primary' 
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setSelectedSize(size.total_services.toString())}
                        style={{ 
                          fontSize: '0.9rem',
                          padding: '0.5rem 0.3rem',
                          minHeight: '40px'
                        }}
                      >
                        {size.total_services}G ({size.pieces} servis)
                        {index === 2 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                            İNDİRİM
                          </span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fiyat bilgisi */}
              {selectedVariant && (
                <div className="price-section mb-4">
                  <div className="d-flex align-items-center">
                    <span className="h3 fw-bold text-primary me-3">
                      {selectedVariant.price.total_price} TL
                    </span>
                    <span className="text-muted">
                      {selectedVariant.price.price_per_servings} TL/Servis
                    </span>
                  </div>
                  {selectedVariant.price.discounted_price && (
                    <div className="mt-2">
                      <span className="text-decoration-line-through text-muted me-2">
                        {selectedVariant.price.total_price} TL
                      </span>
                      <span className="badge bg-danger">
                        %{selectedVariant.price.discount_percentage} İNDİRİM
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Miktar seçici ve sepete ekle */}
              <div className="quantity-section mb-4">
                <div className="d-flex align-items-center mb-3">
                  <label className="me-3 fw-bold">Miktar:</label>
                  <div className="input-group" style={{ width: '150px' }}>
                    <button className="btn btn-outline-secondary" type="button">-</button>
                    <input 
                      type="number" 
                      className="form-control text-center" 
                      value="1" 
                      min="1"
                      readOnly
                    />
                    <button className="btn btn-outline-secondary" type="button">+</button>
                  </div>
                </div>
                <button className="btn btn-dark btn-lg w-100">
                  <i className="bi bi-cart-plus me-2"></i>
                  SEPETE EKLE
                </button>
              </div>

              {/* Kargo ve garanti bilgileri */}
              <div className="info-section mb-4">
                <div className="row text-center">
                  <div className="col-4">
                    <i className="bi bi-truck text-primary" style={{ fontSize: '1.5rem' }}></i>
                    <div className="mt-2">
                      <small className="d-block fw-bold">Aynı Gün Ücretsiz Kargo</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <i className="bi bi-check-circle text-success" style={{ fontSize: '1.5rem' }}></i>
                    <div className="mt-2">
                      <small className="d-block fw-bold">750.000+ Mutlu Müşteri</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <i className="bi bi-shield-check text-info" style={{ fontSize: '1.5rem' }}></i>
                    <div className="mt-2">
                      <small className="d-block fw-bold">Memnuniyet Garantisi</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Son kullanım tarihi */}
              <div className="expiry-section">
                <small className="text-muted">
                  Son Kullanım Tarihi: 07.2025
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Açılır bölümler */}
        <div className="row mt-5">
          <div className="col-12">
            {/* Özellikler */}
            <div className="accordion" id="productAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#featuresCollapse"
                  >
                    ÖZELLİKLER
                  </button>
                </h2>
                <div id="featuresCollapse" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
                  <div className="accordion-body">
                    {product.explanation.features}
                  </div>
                </div>
              </div>

              {/* Besin içeriği */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#nutritionCollapse"
                  >
                    BESİN İÇERİĞİ
                  </button>
                </h2>
                <div id="nutritionCollapse" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
                  <div className="accordion-body">
                    <h6>İçindekiler:</h6>
                    <ul>
                      {product.explanation.nutritional_content.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.aroma && `${ingredient.aroma}: `}{ingredient.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Kullanım şekli */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#usageCollapse"
                  >
                    KULLANIM ŞEKLİ
                  </button>
                </h2>
                <div id="usageCollapse" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
                  <div className="accordion-body">
                    {product.explanation.usage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
