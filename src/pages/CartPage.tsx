import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, cartCount, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cartCount === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-muted mb-3"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h3 className="text-muted">Sepetiniz Boş</h3>
          <p className="text-muted mb-4">Sepetinizde henüz ürün bulunmuyor.</p>
          <Link to="/urunler" className="btn btn-primary">
            Alışverişe Başla
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Sepetim ({cartCount} ürün)</h2>
        <Button variant="outline-danger" size="sm" onClick={clearCart}>
          Sepeti Temizle
        </Button>
      </div>

      <Row>
        <Col lg="8">
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md="2">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="img-fluid rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col md="4">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted mb-0">Birim Fiyat: {item.price.toFixed(2)}₺</p>
                  </Col>
                  <Col md="3">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col md="2">
                    <div className="text-end">
                      <h6 className="mb-0">{(item.price * item.quantity).toFixed(2)}₺</h6>
                    </div>
                  </Col>
                  <Col md="1">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      </svg>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg="4">
          <Card className="sticky-top" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Sipariş Özeti</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Ara Toplam:</span>
                <span>{getTotalPrice().toFixed(2)}₺</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Kargo:</span>
                <span className="text-success">Ücretsiz</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Toplam:</strong>
                <strong className="fs-5">{getTotalPrice().toFixed(2)}₺</strong>
              </div>
                             <Link to="/odeme" className="btn btn-success w-100 mb-2">
                 Siparişi Tamamla
               </Link>
              <Link to="/urunler" className="btn btn-outline-primary w-100">
                Alışverişe Devam Et
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage; 