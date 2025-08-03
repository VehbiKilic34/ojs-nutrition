import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  searchPlaceholder?: string;
  features?: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

export const Header = ({
  heroTitle = "Sağlıklı Yaşam İçin En Kaliteli Supplementler",
  heroSubtitle = "Kas gelişimi, performans artışı ve genel sağlık için özel olarak seçilmiş ürünler",
  heroImage = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
  searchPlaceholder = "Ürün ara...",
  features = [
    {
      id: "quality",
      title: "Kalite Garantisi",
      description: "Tüm ürünlerimiz orijinal ve garantili",
      icon: "🏆"
    },
    {
      id: "shipping",
      title: "Hızlı Teslimat",
      description: "24 saat içinde kargoya teslim",
      icon: "🚚"
    },
    {
      id: "support",
      title: "7/24 Destek",
      description: "Uzman ekibimiz her zaman yanınızda",
      icon: "💬"
    }
  ]
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/urunler?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-primary text-white">
      {/* Hero Section */}
      <div 
        className="hero-section py-5"
        style={{
          background: `linear-gradient(rgba(0, 123, 255, 0.8), rgba(0, 123, 255, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">{heroTitle}</h1>
              <p className="lead mb-4">{heroSubtitle}</p>
              
              {/* Arama Çubuğu */}
              <Form className="d-flex mb-4 flex-column flex-sm-row" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder={searchPlaceholder}
                  className="me-sm-2 mb-2 mb-sm-0"
                  size="lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="warning" size="lg" type="submit" className="flex-shrink-0">
                  Ara
                </Button>
              </Form>
              
              {/* CTA Butonları */}
              <div className="d-flex gap-3 flex-column flex-sm-row">
                <Button variant="warning" size="lg" onClick={() => navigate('/urunler')}>
                  Ürünleri Keşfet
                </Button>
                <Button variant="outline-light" size="lg">
                  Hakkımızda
                </Button>
              </div>
            </Col>
            <Col lg={6} md={12} className="text-center">
              <img 
                src={heroImage} 
                alt="Hero" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Özellikler */}
      <div className="py-4 bg-white">
        <Container>
          <Row>
            {features.map((feature) => (
              <Col key={feature.id} lg={4} md={6} sm={12} className="text-center mb-4 mb-lg-0">
                <div className="p-3">
                  <div className="fs-1 mb-2">{feature.icon}</div>
                  <h5 className="text-dark mb-2">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </header>
  );
};


