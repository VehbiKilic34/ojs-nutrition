import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { footerData } from "../data/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi
    console.log("Form data:", formData);
    alert("Mesajınız başarıyla gönderildi!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">İletişim</h1>
              <p className="lead text-muted">
                Sorularınız için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact Form Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">Mesaj Gönder</h2>
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ad Soyad *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Adınız ve soyadınız"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>E-posta *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="ornek@email.com"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Konu *</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Mesajınızın konusu"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Mesaj *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      variant="dark" 
                      size="lg"
                      className="px-5 py-2"
                    >
                      Mesaj Gönder
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Contact Information Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <h3 className="text-center mb-5">İletişim Bilgileri</h3>
              <Row>
                <Col md={4} className="text-center mb-4">
                  <div className="p-4">
                    <div className="mb-3">
                      <i className="bi bi-geo-alt-fill fs-1 text-primary"></i>
                    </div>
                    <h5>Adres</h5>
                    <p className="text-muted">
                      Örnek Mahallesi, Örnek Sokak No:123<br />
                      Kadıköy/İstanbul, 34700
                    </p>
                  </div>
                </Col>
                <Col md={4} className="text-center mb-4">
                  <div className="p-4">
                    <div className="mb-3">
                      <i className="bi bi-telephone-fill fs-1 text-primary"></i>
                    </div>
                    <h5>Telefon</h5>
                    <p className="text-muted">
                      +90 (212) 555 0123<br />
                      +90 (212) 555 0124
                    </p>
                  </div>
                </Col>
                <Col md={4} className="text-center mb-4">
                  <div className="p-4">
                    <div className="mb-3">
                      <i className="bi bi-envelope-fill fs-1 text-primary"></i>
                    </div>
                    <h5>E-posta</h5>
                    <p className="text-muted">
                      info@ojsnutrition.com<br />
                      destek@ojsnutrition.com
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Map Section */}
      <div className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="text-center mb-4">
                <h3>Konum</h3>
                <p className="text-muted">Mağazamızı ziyaret edebilirsiniz</p>
              </div>
              <div 
                className="bg-light rounded" 
                style={{ 
                  height: "400px", 
                  background: "linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8f9fa 75%), linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                }}
              >
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="text-center">
                    <i className="bi bi-map fs-1 text-muted mb-3"></i>
                    <p className="text-muted">Harita burada görüntülenecek</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <Footer data={footerData} />
    </>
  );
} 