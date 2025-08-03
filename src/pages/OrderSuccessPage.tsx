import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';

const OrderSuccessPage: React.FC = () => {
  const { orders } = useOrder();
  
  // En son oluşturulan siparişi al
  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <Container className="py-5">
      <div className="text-center">
        <Card className="border-0 shadow-sm">
          <Card.Body className="py-5">
            <div className="mb-4">
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-success"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
            </div>
            
            <h2 className="text-success mb-3">Siparişiniz Başarıyla Alındı!</h2>
            <p className="text-muted mb-4">
              Siparişiniz başarıyla oluşturuldu. Sipariş numaranız: <strong>{latestOrder?.id || 'Bilinmiyor'}</strong>
            </p>
            
            <div className="row justify-content-center">
              <div className="col-md-8">
                <Card className="bg-light border-0">
                  <Card.Body>
                    <h6 className="mb-3">Sipariş Detayları</h6>
                    <div className="row text-start">
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Durum:</strong></p>
                        <p className="text-success mb-3">Ödeme Alındı</p>
                        
                        <p className="mb-1"><strong>Teslimat:</strong></p>
                        <p className="text-muted mb-3">2-3 iş günü içinde</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Ödeme Yöntemi:</strong></p>
                        <p className="text-muted mb-3">Kredi/Banka Kartı</p>
                        
                        <p className="mb-1"><strong>E-posta:</strong></p>
                        <p className="text-muted mb-3">Sipariş onayı gönderildi</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
            
            <div className="mt-4">
              {latestOrder && (
                <Link to={`/siparis/${latestOrder.id}`} className="btn btn-success me-2">
                  Sipariş Detaylarını Gör
                </Link>
              )}
              <Link to="/" className="btn btn-primary me-2">
                Ana Sayfaya Dön
              </Link>
              <Link to="/urunler" className="btn btn-outline-primary">
                Alışverişe Devam Et
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default OrderSuccessPage; 