import { Card, Container } from "react-bootstrap";
import { useBlazeSlider } from "../hooks/useBlazeSlider";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./BlazeSlider.css";
import type { Product } from "../services/api";

interface PromotionSliderProps {
  products: Product[];
  title?: string;
  autoplayInterval?: number;
  transitionDuration?: number;
}

// Fallback resim URL'i
const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=Resim+Yüklenemedi";

export const PromotionSlider = ({ 
  products, 
  title = "Öne Çıkan Ürünler",
  autoplayInterval = 4000,
  transitionDuration = 1500
}: PromotionSliderProps) => {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  const { sliderElRef } = useBlazeSlider({
    all: {
      slidesToShow: 4,
      enableAutoplay: true,
      autoplayInterval,
      slideGap: "0.25rem",
      transitionDuration,
    },
    '(max-width: 900px)': {
      slidesToShow: 2,
      slideGap: "0.125rem",
      transitionDuration,
    },
    '(max-width: 500px)': {
      slidesToShow: 1,
      slideGap: "0.1rem",
      transitionDuration,
    },
  });

  const handleImageError = (productId: string, event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const getImageSrc = (product: Product) => {
    if (imageErrors[product.id]) {
      return FALLBACK_IMAGE;
    }
    return product.photo_src || FALLBACK_IMAGE;
  };

  return (
    <Container>
    <section className="py-4">
      <h4 className="container mb-3">{title}</h4>
      <div className="blaze-slider" ref={sliderElRef}>
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">
              {/* Slider İçeriği */}
              {products.map((product) => (
               <div className="blaze-slide d-flex justify-content-center align-items-center" key={product.id} style={{ margin: '0 2px' }}>
               <Link to={`/urunler/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                 <Card style={{ width: '100%', maxWidth: '16rem', padding: '0', cursor: 'pointer', transition: 'transform 0.2s' }} 
                       className="hover-lift">
                   <Card.Img
                     variant="top"
                     src={getImageSrc(product)}
                     onError={(e) => handleImageError(product.id, e)}
                     style={{ height: '180px', objectFit: 'cover' }}
                     alt={product.name}
                   />
                   <Card.Body style={{ padding: '8px' }}>
                     <Card.Title style={{ fontSize: '1.1rem' }}>{product.name}</Card.Title>
                     <Card.Text style={{ fontSize: '0.9rem' }}>{product.short_explanation}</Card.Text>
                     <div className="d-flex justify-content-between align-items-center mt-2">
                       <span className="fw-bold text-primary">
                         {product.price_info.discounted_price 
                           ? `${product.price_info.discounted_price} ₺`
                           : `${product.price_info.total_price} ₺`
                         }
                       </span>
                       {product.price_info.discount_percentage && (
                         <span className="badge bg-danger">
                           %{product.price_info.discount_percentage} İndirim
                         </span>
                       )}
                     </div>
                     <div className="d-flex align-items-center mt-2">
                       <div className="me-2">
                         {[...Array(5)].map((_, i) => (
                           <i 
                             key={i} 
                             className={`bi bi-star${i < Math.floor(product.average_star) ? '-fill' : ''}`}
                             style={{ color: i < Math.floor(product.average_star) ? '#ffc107' : '#dee2e6' }}
                           />
                         ))}
                       </div>
                       <small className="text-muted">({product.comment_count})</small>
                     </div>
                   </Card.Body>
                 </Card>
               </Link>
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