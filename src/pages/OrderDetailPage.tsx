import React from 'react';
import { Container, Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, updateOrderStatus } = useOrder();
  const navigate = useNavigate();

  if (!orderId) {
    navigate('/hesabim');
    return null;
  }

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3 className="text-muted">Sipariş Bulunamadı</h3>
          <p className="text-muted mb-4">Aradığınız sipariş mevcut değil.</p>
          <Link to="/hesabim" className="btn btn-primary">
            Hesabıma Dön
          </Link>
        </div>
      </Container>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { class: string; text: string }> = {
      pending: { class: 'bg-warning', text: 'Beklemede' },
      processing: { class: 'bg-info', text: 'İşleniyor' },
      shipped: { class: 'bg-primary', text: 'Kargoda' },
      delivered: { class: 'bg-success', text: 'Teslim Edildi' },
      cancelled: { class: 'bg-danger', text: 'İptal Edildi' }
    };
    
    const config = statusConfig[status] || { class: 'bg-secondary', text: 'Bilinmiyor' };
    return <Badge className={config.class}>{config.text}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Sipariş Detayları</h2>
        <Link to="/hesabim" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Hesabıma Dön
        </Link>
      </div>

      <Row>
        <Col lg="8">
          {/* Sipariş Bilgileri */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Sipariş Bilgileri</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <p><strong>Sipariş No:</strong> {order.id}</p>
                  <p><strong>Sipariş Tarihi:</strong> {formatDate(order.date)}</p>
                  <p><strong>Durum:</strong> {getStatusBadge(order.status)}</p>
                </Col>
                <Col md="6">
                  <p><strong>Toplam Tutar:</strong> {order.total.toFixed(2)}₺</p>
                  <p><strong>Ürün Sayısı:</strong> {order.items.length}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Müşteri Bilgileri */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Teslimat Bilgileri</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <p><strong>Ad Soyad:</strong> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                  <p><strong>E-posta:</strong> {order.customerInfo.email}</p>
                  <p><strong>Telefon:</strong> {order.customerInfo.phone}</p>
                </Col>
                <Col md="6">
                  <p><strong>Adres:</strong> {order.customerInfo.address}</p>
                  <p><strong>Şehir:</strong> {order.customerInfo.city}</p>
                  <p><strong>Posta Kodu:</strong> {order.customerInfo.zipCode}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Ürün Listesi */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">Sipariş Edilen Ürünler</h5>
            </Card.Header>
            <Card.Body>
              {order.items.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3 p-3 border rounded">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="me-3" 
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted mb-0">Adet: {item.quantity}</p>
                  </div>
                  <div className="text-end">
                    <strong>{(item.price * item.quantity).toFixed(2)}₺</strong>
                    <br />
                    <small className="text-muted">{item.price.toFixed(2)}₺ / adet</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg="4">
          {/* Sipariş Özeti */}
          <Card className="sticky-top" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Sipariş Özeti</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Ara Toplam:</span>
                <span>{order.total.toFixed(2)}₺</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Kargo:</span>
                <span className="text-success">Ücretsiz</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Toplam:</strong>
                <strong className="fs-5">{order.total.toFixed(2)}₺</strong>
              </div>

              {/* Sipariş Durumu Güncelleme (Admin için) */}
              {order.status === 'pending' && (
                <Button 
                  variant="outline-primary" 
                  className="w-100 mb-2"
                  onClick={() => updateOrderStatus(order.id, 'processing')}
                >
                  İşleme Al
                </Button>
              )}
              
              {order.status === 'processing' && (
                <Button 
                  variant="outline-primary" 
                  className="w-100 mb-2"
                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                >
                  Kargoya Ver
                </Button>
              )}
              
              {order.status === 'shipped' && (
                <Button 
                  variant="outline-success" 
                  className="w-100 mb-2"
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                >
                  Teslim Edildi
                </Button>
              )}

              <Link to="/hesabim" className="btn btn-outline-secondary w-100">
                Siparişlerime Dön
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailPage; 