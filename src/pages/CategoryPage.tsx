import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Pagination, Breadcrumb } from 'react-bootstrap';
import { useProducts } from '../data/products';
import { useCategories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import '../components/HomePage.css';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [productsPerPage] = useState(12);

  const { categories } = useCategories();
  
  // Mevcut kategoriyi bul
  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  
  // Alt kategorileri al
  const subCategories = currentCategory?.children || [];

  // Alt kategori ID'sini bul
  const selectedSubCategoryId = selectedSubCategory 
    ? subCategories.find(sub => sub.slug === selectedSubCategory)?.id 
    : undefined;

  const { products, loading, error, totalCount, hasNext, hasPrevious } = useProducts(
    currentPage, 
    productsPerPage,
    searchTerm || undefined,
    currentCategory?.id || undefined,
    selectedSubCategoryId || undefined
  );

  // Sayfa değiştiğinde
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Arama yapıldığında
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Alt kategori değiştiğinde
  const handleSubCategoryChange = (subCategorySlug: string) => {
    setSelectedSubCategory(subCategorySlug);
    setCurrentPage(1);
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubCategory('');
    setCurrentPage(1);
  };

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(totalCount / productsPerPage);

  // Kategori bulunamadıysa
  if (categories.length > 0 && !currentCategory) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Kategori Bulunamadı!</Alert.Heading>
          <p>Aradığınız kategori mevcut değil.</p>
          <Button variant="outline-warning" onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </Button>
        </Alert>
      </Container>
    );
  }

  if (loading && currentPage === 1) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </Spinner>
          <p className="mt-3">Ürünler yükleniyor...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Hata!</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Tekrar Dene
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="category-page py-5">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
          <Breadcrumb.Item active>{currentCategory?.name}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Kategori Başlığı */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">{currentCategory?.name}</h1>
          <p className="text-muted fs-5">
            {totalCount} ürün bulundu
          </p>
          <div className="d-flex justify-content-center">
            <div className="bg-warning" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
          </div>
        </div>

        {/* Filtreler */}
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Row>
                  {/* Arama */}
                  <Col md={6} className="mb-3">
                    <Form onSubmit={handleSearch}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Ürün Ara</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="text"
                            placeholder={`${currentCategory?.name} kategorisinde ürün ara...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <Button type="submit" variant="primary">
                            <i className="bi bi-search"></i>
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </Col>

                  {/* Alt Kategori */}
                  {subCategories.length > 0 && (
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">Alt Kategori</Form.Label>
                        <Form.Select
                          value={selectedSubCategory}
                          onChange={(e) => handleSubCategoryChange(e.target.value)}
                        >
                          <option value="">Tüm Alt Kategoriler</option>
                          {subCategories.map((subCat) => (
                            <option key={subCat.slug} value={subCat.slug}>
                              {subCat.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  )}

                  {/* Filtreleri Temizle */}
                  <Col md={2} className="mb-3 d-flex align-items-end">
                    <Button 
                      variant="outline-secondary" 
                      onClick={clearFilters}
                      className="w-100"
                    >
                      Filtreleri Temizle
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Ürün Listesi */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </Spinner>
            <p className="mt-3">Ürünler yükleniyor...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3">
              <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
            </div>
            <h4 className="text-muted mb-3">Ürün Bulunamadı</h4>
            <p className="text-muted mb-4">
              Bu kategoride henüz ürün bulunmuyor veya arama kriterlerinize uygun ürün yok.
            </p>
            <Button variant="primary" onClick={clearFilters}>
              Filtreleri Temizle
            </Button>
          </div>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
                  <ProductCard {...product} />
                </Col>
              ))}
            </Row>

            {/* Sayfalama */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                  />
                  
                  {/* Sayfa numaraları */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Pagination.Item
                        key={pageNum}
                        active={pageNum === currentPage}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Pagination.Item>
                    );
                  })}
                  
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNext}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default CategoryPage;
