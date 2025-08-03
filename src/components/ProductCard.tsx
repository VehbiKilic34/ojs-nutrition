import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Product } from "../services/api";
import { useCart } from "../hooks/useCart";

type ProductCardProps = Product;

export const ProductCard = ({
  id,
  name,
  slug,
  short_explanation,
  price_info,
  photo_src,
  comment_count,
  average_star,
}: ProductCardProps) => {
  const { total_price, discounted_price, discount_percentage } = price_info;
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  
  const fullPhotoUrl = photo_src.startsWith('http') 
    ? photo_src 
    : `https://fe1111.projects.academy.onlyjs.com${photo_src}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    addToCart({
      id: parseInt(id.toString()),
      name,
      price: discounted_price || total_price,
      image: fullPhotoUrl,
    });
    
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };
  
  return (
    <Card className="h-100 shadow-sm product-card">
      <Link to={`/urunler/${slug}`} className="text-decoration-none">
        <Card.Img 
          variant="top" 
          src={fullPhotoUrl} 
          alt={name} 
          style={{ 
            height: '200px', 
            objectFit: 'cover',
            width: '100%'
          }} 
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-dark fs-6 fs-md-5">{name}</Card.Title>
          <Card.Text className="text-muted flex-grow-1 small">{short_explanation}</Card.Text>

          <div className="mb-2">
            <Badge bg="warning" text="dark" className="me-2">
              ⭐ {average_star.toFixed(1)}
            </Badge>
            <small className="text-muted">({comment_count} yorum)</small>
          </div>

          <div className="fw-bold fs-6 fs-md-5 mb-3">
            {discounted_price ? (
              <>
                <span className="text-danger me-2">
                  {discounted_price.toFixed(2)}₺
                </span>
                <span className="text-muted text-decoration-line-through small">
                  {total_price.toFixed(2)}₺
                </span>
                {discount_percentage && (
                  <Badge bg="danger" className="ms-2 small">
                    %{discount_percentage}
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-dark">{total_price.toFixed(2)}₺</span>
            )}
          </div>

          <div className="mt-auto">
            <Button
              variant="primary"
              size="sm"
              className="w-100"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <span className="d-none d-sm-inline">Ekleniyor...</span>
                  <span className="d-sm-none">...</span>
                </>
              ) : (
                <>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="me-2"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span className="d-none d-sm-inline">Sepete Ekle</span>
                  <span className="d-sm-none">Ekle</span>
                </>
              )}
            </Button>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};