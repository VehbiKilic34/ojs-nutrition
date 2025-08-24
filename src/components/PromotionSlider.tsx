import { Card, Container } from "react-bootstrap";
import { useBlazeSlider } from "../hooks/useBlazeSlider";
import { useState, useEffect } from "react";
import "./BlazeSlider.css";
import type { Product, BestSellerProduct } from "../services/api";

interface PromotionSliderProps {
  products: (Product | BestSellerProduct)[];
  title?: string;
}

// Fallback resim URL'i
const FALLBACK_IMAGE = '/src/assets/best-salery/11.jpg'; // Varsayılan resim - best-sellers klasöründen

const PromotionSlider = ({ 
  products, 
  title = "Öne Çıkan Ürünler"
}: PromotionSliderProps) => {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  const { sliderElRef, sliderRef } = useBlazeSlider({
    all: {
      slidesToShow: title ? 4 : 6,
      enableAutoplay: true,
      autoplayInterval: 5000,
      slideGap: "0.25rem",
      transitionDuration: 1500,
      loop: true,
    },
    '(max-width: 1200px)': {
      slidesToShow: title ? 3 : 6, // Tablet ekranında 6 kart göster
      slideGap: "0.25rem",
      transitionDuration: 1500,
      enableAutoplay: true,
      autoplayInterval: 5000,
    },
    '(max-width: 900px)': {
      slidesToShow: title ? 2 : 6, // Tablet ekranında 6 kart göster
      slideGap: "0.25rem",
      transitionDuration: 1500,
      enableAutoplay: true,
      autoplayInterval: 5000,
    },
    '(max-width: 768px)': {
      slidesToShow: title ? 2 : 6, // Mobil ekranında 6 kart göster
      slideGap: "0.25rem",
      transitionDuration: 1500,
      enableAutoplay: true,
      autoplayInterval: 5000,
    },
    '(max-width: 500px)': {
      slidesToShow: title ? 1 : 6, // Küçük mobil ekranında 6 kart göster
      slideGap: "0.25rem",
      transitionDuration: 1500,
      enableAutoplay: true,
      autoplayInterval: 5000,
    },
  });

  // Slider'ın başlatıldığını kontrol et
  useEffect(() => {
    if (sliderRef.current) {
      console.log('Slider is ready:', sliderRef.current);
    }
  }, [sliderRef]);

  // Fıstık ezmesi ve melatonin ürünlerini filtrele
  const filteredProducts = products.filter(product => 
    !product.name.toLowerCase().includes('fıstık') && 
    !product.name.toLowerCase().includes('ezme') &&
    !product.name.toLowerCase().includes('melatonin') &&
    !product.name.toLowerCase().includes('peanut') &&
    !product.name.toLowerCase().includes('butter')
  );

  // Manuel olarak günlük ve fitness kartlarını ekle
  const additionalProducts: BestSellerProduct[] = [
    {
      name: 'FITNESS PAKETİ',
      short_explanation: 'EN POPÜLER ÜRÜNLER BİR ARADA',
      average_star: 5,
      comment_count: 7650,
      photo_src: '/src/assets/section_img/TÜM ÜRÜNLER/amino-asit-paket.png',
      price_info: {
        profit: null,
        total_price: 1126,
        discounted_price: 799,
        price_per_servings: 0,
        discount_percentage: 29
      }
    },
    {
      name: 'GÜNLÜK VİTAMİN PAKETİ',
      short_explanation: 'EN SIK TÜKETİLEN TAKVİYELER',
      average_star: 4,
      comment_count: 5013,
      photo_src: '/src/assets/section_img/TÜM ÜRÜNLER/amino-asit-paket.png',
      price_info: {
        profit: null,
        total_price: 717,
        discounted_price: 549,
        price_per_servings: 0,
        discount_percentage: 23
      }
    }
  ];

  // Filtrelenmiş ürünler + ek ürünler
  const allProducts = [...filteredProducts, ...additionalProducts];

  // Debug için ürün adlarını yazdır
  useEffect(() => {
    if (products.length > 0) {
      console.log('Original products:', products.map(p => p.name));
      console.log('Filtered products:', filteredProducts.map(p => p.name));
    }
  }, [products, filteredProducts]);

  const handleImageError = (productId: string, event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const getImageSrc = (product: Product | BestSellerProduct) => {
    const productId = 'id' in product ? product.id : product.name; // BestSellerProduct'ta id yok, name kullan
    
    // Özel resim yolları - best-sellers klasöründen
    if (product.name.includes('WHEY')) {
      return '/src/assets/best-salery/66.jpg'; // WHEY PROTEIN için 66.jpg
    } else if (product.name.includes('FITNESS')) {
      return '/src/assets/best-salery/55.jpg'; // FITNESS PAKETİ için 55.jpg
    } else if (product.name.includes('GÜNLÜK') || product.name.includes('VİTAMİN')) {
      return '/src/assets/best-salery/44.jpg'; // GÜNLÜK VİTAMİN için 44.jpg
    } else if (product.name.includes('PRE-WORKOUT')) {
      return '/src/assets/best-salery/22.jpg'; // PRE-WORKOUT için 22.jpg
    } else if (product.name.includes('CREAM') || product.name.includes('RICE')) {
      return '/src/assets/best-salery/33.jpg'; // CREAM OF RICE için 33.jpg
    } else if (product.name.includes('CREATINE')) {
      return '/src/assets/best-salery/11.jpg'; // CREATINE için 11.jpg
    }
    
    // Varsayılan resim yolu
    if (imageErrors[productId]) {
      return FALLBACK_IMAGE;
    }
    return product.photo_src || FALLBACK_IMAGE;
  };

  const getProductId = (product: Product | BestSellerProduct) => {
    return 'id' in product ? product.id : product.name; // BestSellerProduct'ta id yok, name kullan
  };

  return (
    <Container>
    <section className="py-4">
      {title && <h4 className="container mb-3">{title}</h4>}
      <div className="blaze-slider" ref={sliderElRef} data-blaze="slider">
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">
              {/* Slider İçeriği */}
              {allProducts.map((product) => (
               <div className="blaze-slide d-flex justify-content-center align-items-center" key={getProductId(product)} style={{ margin: '0 2px' }}>
                 <Card style={{ 
                   width: '200px', 
                   height: '365px',
                   maxWidth: '200px', // Çok satanlar için sabit boyut
                   padding: '0', 
                   cursor: 'pointer', 
                   transition: 'transform 0.2s',
                   minWidth: '200px' // Kartların sıkışmasını önler
                 }} 
                       className="hover-lift">
                   <Card.Img
                     variant="top"
                     src={getImageSrc(product)}
                     onError={(e) => handleImageError(getProductId(product), e)}
                     style={{ 
                       height: '168px', 
                       width: '168px',
                       objectFit: 'cover',
                       marginTop: '0.02px'
                     }} // Çok satanlar için sabit boyutlar
                     alt={product.name}
                   />
                   <Card.Body style={{ padding: title ? '12px' : '16px' }}>
                     <Card.Title style={{ 
                       fontSize: title ? '1.1rem' : '1.2rem', 
                       fontWeight: '700', 
                       marginBottom: '0.5rem', 
                       lineHeight: '1.3',
                       color: '#333',
                       textAlign: 'center'
                     }}>
                       {product.name.includes('WHEY') ? 'WHEY PROTEIN' :
                        product.name.includes('FITNESS') ? 'FITNESS PAKETİ' :
                        product.name.includes('GÜNLÜK') || product.name.includes('VİTAMİN') ? 'GÜNLÜK VİTAMİN PAKETİ' :
                        product.name.includes('PRE-WORKOUT') ? 'PRE-WORKOUT SUPREME' :
                        product.name.includes('CREAM') || product.name.includes('RICE') ? 'CREAM OF RICE' :
                        product.name.includes('CREATINE') ? 'CREATINE' : product.name}
                     </Card.Title>
                     <Card.Text style={{ 
                       fontSize: title ? '0.9rem' : '1rem', 
                       color: '#666', 
                       lineHeight: '1.4', 
                       marginBottom: '1rem',
                       textAlign: 'center',
                       fontWeight: '500'
                     }}>
                       {product.name.includes('WHEY') ? 'EN ÇOK TERCİH EDİLEN PROTEİN TAKVİYESİ' :
                        product.name.includes('FITNESS') ? 'EN POPÜLER ÜRÜNLER BİR ARADA' :
                        product.name.includes('GÜNLÜK') || product.name.includes('VİTAMİN') ? 'EN SIK TÜKETİLEN TAKVİYELER' :
                        product.name.includes('PRE-WORKOUT') ? 'ANTRENMAN ÖNCESİ TAKVİYESİ' :
                        product.name.includes('CREAM') || product.name.includes('RICE') ? 'EN LEZZETLİ PİRİNÇ KREMASI' :
                        product.name.includes('CREATINE') ? 'EN POPÜLER SPORCU TAKVİYESİ' : product.short_explanation}
                     </Card.Text>
                     
                     {/* Yıldız Değerlendirmesi ve Yorum Sayısı */}
                     <div className="d-flex flex-column align-items-center mb-3">
                       <div className="d-flex align-items-center mb-2">
                         {[...Array(5)].map((_, i) => (
                           <span 
                             key={i} 
                             style={{ 
                               color: i < (product.name.includes('GÜNLÜK') || product.name.includes('VİTAMİN') || product.name.includes('PRE-WORKOUT') || product.name.includes('CREAM') || product.name.includes('RICE') ? 4 : 5) ? '#ffc107' : '#e0e0e0',
                               fontSize: '16px',
                               marginRight: '2px'
                             }}
                           >
                             ⭐
                           </span>
                         ))}
                       </div>
                       <small className="text-muted" style={{ 
                         fontSize: '0.85rem',
                         fontWeight: '500'
                       }}>
                         {product.name.includes('WHEY') ? '10869 Yorum' :
                          product.name.includes('FITNESS') ? '7650 Yorum' :
                          product.name.includes('GÜNLÜK') || product.name.includes('VİTAMİN') ? '5013 Yorum' :
                          product.name.includes('PRE-WORKOUT') ? '6738 Yorum' :
                          product.name.includes('CREAM') || product.name.includes('RICE') ? '5216 Yorum' :
                          product.name.includes('CREATINE') ? '8558 Yorum' : `${product.comment_count.toLocaleString()} Yorum`}
                       </small>
                     </div>
                     
                     {/* Fiyat Bilgisi */}
                     <div className="d-flex flex-column align-items-center">
                       {product.name.includes('FITNESS') || product.name.includes('GÜNLÜK') || product.name.includes('VİTAMİN') ? (
                         <div className="text-center">
                           <span className="fw-bold text-primary" style={{ 
                             fontSize: '1.3rem',
                             color: '#333'
                           }}>
                             {product.name.includes('FITNESS') ? '799' : '549'} ₺
                           </span>
                           <div className="mt-1">
                             <span className="text-muted text-decoration-line-through" style={{ 
                               fontSize: '1rem',
                               color: '#dc3545'
                             }}>
                               {product.name.includes('FITNESS') ? '1126' : '717'} ₺
                             </span>
                           </div>
                         </div>
                       ) : (
                         <span className="fw-bold text-primary" style={{ 
                           fontSize: '1.3rem',
                           color: '#333'
                         }}>
                           {product.name.includes('WHEY') ? '549' :
                            product.name.includes('PRE-WORKOUT') ? '399' :
                            product.name.includes('CREAM') || product.name.includes('RICE') ? '239' :
                            product.name.includes('CREATINE') ? '239' : product.price_info.total_price} ₺
                         </span>
                       )}
                     </div>
                     
                     {/* İndirim Badge'i */}
                     {(product.name.includes('FITNESS') || product.name.includes('GÜNLÜK') || product.name.includes('VİTAMİN')) && (
                       <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                         <span className="badge bg-danger" style={{ 
                           fontSize: '0.8rem', 
                           padding: '0.4rem 0.6rem', 
                           borderRadius: '4px',
                           fontWeight: '600'
                         }}>
                           %{product.name.includes('FITNESS') ? '29' : '23'} İNDİRİM
                         </span>
                       </div>
                     )}
                   </Card.Body>
                 </Card>
               </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </Container>
  );
};

export default PromotionSlider;