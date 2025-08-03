import { Container, Row, Col, Accordion, Form, InputGroup } from "react-bootstrap";
import { useState, useMemo } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { footerData } from "../data/footer";
import { faqData, type FAQItem } from "../data/faq";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");

  // Kategorileri çıkar
  const categories = useMemo(() => {
    const cats = [...new Set(faqData.map(item => item.category || "Genel"))];
    return ["Tümü", ...cats];
  }, []);

  // Filtrelenmiş FAQ'lar
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Kategori filtresi
    if (selectedCategory !== "Tümü") {
      filtered = filtered.filter(item => 
        (item.category || "Genel") === selectedCategory
      );
    }

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Kategorilere göre gruplama
  const groupedFAQs = useMemo(() => {
    return filteredFAQs.reduce((acc, item) => {
      const category = item.category || 'Genel';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, FAQItem[]>);
  }, [filteredFAQs]);

  return (
    <>
      <Header />
      
      <Container className="py-5">
        {/* Başlık Bölümü */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="display-4 mb-3">Sıkça Sorulan Sorular</h1>
            <p className="lead text-muted">
              Beslenme ve supplementler hakkında merak ettiğiniz tüm soruların cevaplarını burada bulabilirsiniz.
            </p>
          </Col>
        </Row>

        {/* Arama ve Filtreleme */}
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <Row>
              <Col md={8} className="mb-3">
                <InputGroup className="faq-search">
                  <Form.Control
                    type="text"
                    placeholder="Sorularınızı arayın..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Select
                  className="faq-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Sonuç Sayısı */}
        {filteredFAQs.length > 0 && (
          <Row className="mb-4">
            <Col lg={8} className="mx-auto">
              <p className="faq-results-counter">
                {filteredFAQs.length} soru bulundu
                {searchTerm && ` "${searchTerm}" için`}
                {selectedCategory !== "Tümü" && ` "${selectedCategory}" kategorisinde`}
              </p>
            </Col>
          </Row>
        )}

        {/* FAQ İçeriği */}
        <Row>
          <Col lg={8} className="mx-auto">
            {filteredFAQs.length > 0 ? (
              <Accordion className="faq-accordion">
                {Object.entries(groupedFAQs).map(([category, items]) => (
                  <div key={category} className="mb-4">
                    {categories.length > 2 && (
                      <h5 className="faq-category-header">{category}</h5>
                    )}
                    {items.map((item) => (
                      <Accordion.Item 
                        key={item.id} 
                        eventKey={`${category}-${item.id}`}
                        className="mb-2 border rounded"
                      >
                        <Accordion.Header className="fw-medium">
                          {item.question}
                        </Accordion.Header>
                        <Accordion.Body className="text-muted">
                          {item.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </div>
                ))}
              </Accordion>
            ) : (
              <div className="faq-empty-state">
                <i className="bi bi-search display-1 text-muted mb-3"></i>
                <h4>Aradığınız soru bulunamadı</h4>
                <p className="text-muted">
                  Farklı anahtar kelimeler deneyebilir veya kategori filtrelerini değiştirebilirsiniz.
                </p>
              </div>
            )}
          </Col>
        </Row>

        {/* İletişim Bölümü */}
        <Row className="mt-5">
          <Col lg={8} className="mx-auto text-center">
            <div className="faq-contact-section">
              <h5>Hala aradığınız cevabı bulamadınız mı?</h5>
              <p className="text-muted mb-3">
                Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
              </p>
              <a href="/iletisim" className="btn btn-primary">
                İletişime Geçin
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer data={footerData} />
    </>
  );
} 