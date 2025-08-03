import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface ErrorPageProps {
  errorCode?: string;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  image?: string;
}

export default function ErrorPage({
  errorCode = "404",
  title = "Sayfa Bulunamadı",
  message = "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
  showHomeButton = true,
  showBackButton = true,
  image = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
}: ErrorPageProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          {/* Hata Kodu */}
          <div className="mb-4">
            <h1 className="display-1 text-muted fw-bold">{errorCode}</h1>
          </div>

          {/* Hata Görseli */}
          <div className="mb-4">
            <img 
              src={image} 
              alt="Error" 
              className="img-fluid rounded"
              style={{ maxHeight: '300px' }}
            />
          </div>

          {/* Hata Başlığı */}
          <h2 className="mb-3">{title}</h2>

          {/* Hata Mesajı */}
          <p className="lead text-muted mb-4">{message}</p>

          {/* Aksiyon Butonları */}
          <div className="d-flex gap-3 justify-content-center">
            {showHomeButton && (
              <Link to="/" className="text-decoration-none">
                <Button variant="primary" size="lg">
                  Ana Sayfaya Dön
                </Button>
              </Link>
            )}
            
            {showBackButton && (
              <Button variant="outline-secondary" size="lg" onClick={handleGoBack}>
                Geri Git
              </Button>
            )}
          </div>

          {/* Yardımcı Linkler */}
          <div className="mt-5">
            <h6 className="text-muted mb-3">Popüler Sayfalar</h6>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/products" className="text-decoration-none">
                Ürünler
              </Link>
              <Link to="/hakkimizda" className="text-decoration-none">
                Hakkımızda
              </Link>
              <Link to="/iletisim" className="text-decoration-none">
                İletişim
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}