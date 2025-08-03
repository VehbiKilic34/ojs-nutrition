import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useCart } from '../hooks/useCart';
import { useOrder } from '../hooks/useOrder';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems, cartCount, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  if (cartCount === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3 className="text-muted">Sepetiniz Boş</h3>
          <p className="text-muted mb-4">Ödeme yapmak için sepetinizde ürün bulunmalıdır.</p>
          <Link to="/urunler" className="btn btn-primary">
            Alışverişe Başla
          </Link>
        </div>
      </Container>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
      // Sipariş oluştur
      addOrder({
        status: 'pending',
        total: getTotalPrice(),
        items: cartItems,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      });

      setIsProcessing(false);
      clearCart();
      navigate('/siparis-basarili');
    }, 3000);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Ödeme Bilgileri</h2>
      
      <Row>
        <Col lg="8">
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Teslimat Bilgileri</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Ad *</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Soyad *</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label>E-posta *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Telefon *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Adres *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Şehir *</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Posta Kodu *</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Ödeme Yöntemi</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="radio"
                  id="credit"
                  name="paymentMethod"
                  label="Kredi Kartı"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="debit"
                  name="paymentMethod"
                  label="Banka Kartı"
                  checked={paymentMethod === 'debit'}
                  onChange={() => setPaymentMethod('debit')}
                />
              </Form.Group>

              {paymentMethod && (
                <div className="mt-3">
                  <Row>
                    <Col md="12">
                      <Form.Group className="mb-3">
                        <Form.Label>Kart Numarası *</Form.Label>
                        <Form.Control
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <Form.Label>Kart Üzerindeki İsim *</Form.Label>
                        <Form.Control
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md="3">
                      <Form.Group className="mb-3">
                        <Form.Label>Son Kullanma Tarihi *</Form.Label>
                        <Form.Control
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md="3">
                      <Form.Group className="mb-3">
                        <Form.Label>CVV *</Form.Label>
                        <Form.Control
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg="4">
          <Card className="sticky-top" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Sipariş Özeti</h5>
            </Card.Header>
            <Card.Body>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <div>
                    <small className="fw-bold">{item.name}</small>
                    <br />
                    <small className="text-muted">Adet: {item.quantity}</small>
                  </div>
                  <small className="fw-bold">{(item.price * item.quantity).toFixed(2)}₺</small>
                </div>
              ))}
              
              <hr />
              
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
              
              <Button
                variant="success"
                size="lg"
                className="w-100 mb-2"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    İşleniyor...
                  </>
                ) : (
                  `Ödemeyi Tamamla (${getTotalPrice().toFixed(2)}₺)`
                )}
              </Button>
              
              <Link to="/sepet" className="btn btn-outline-secondary w-100">
                Sepete Dön
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage; 