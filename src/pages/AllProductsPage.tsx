import React, { useState, memo } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useCategories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import '../components/HomePage.css';

interface LoaderData {
  products: any[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const AllProductsPage = memo(() => {
  const navigate = useNavigate();
  const { products, totalCount, currentPage: initialPage, totalPages, hasNext, hasPrevious } = useLoaderData() as LoaderData;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  const { categories } = useCategories();

  // Alt kategorileri bul
  const getSubCategories = (mainCategoryId: string) => {
    const mainCategory = categories.find(cat => cat.id === mainCategoryId);
    return mainCategory?.children || [];
  };

  // Sayfa değiştiğinde
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // URL'yi güncelle
    const searchParams = new URLSearchParams();
    if (page > 1) searchParams.set('page', page.toString());
    if (searchTerm) searchParams.set('search', searchTerm);
    if (selectedMainCategory) searchParams.set('main_category', selectedMainCategory);
    if (selectedSubCategory) searchParams.set('sub_category', selectedSubCategory);
    
    const queryString = searchParams.toString();
    navigate(`/urunler${queryString ? `?${queryString}` : ''}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Arama yapıldığında
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // URL'yi güncelle
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set('search', searchTerm);
    if (selectedMainCategory) searchParams.set('main_category', selectedMainCategory);
    if (selectedSubCategory) searchParams.set('sub_category', selectedSubCategory);
    
    const queryString = searchParams.toString();
    navigate(`/urunler${queryString ? `?${queryString}` : ''}`);
  };

  // Kategori değiştiğinde
  const handleCategoryChange = (mainCategoryId: string) => {
    setSelectedMainCategory(mainCategoryId);
    setSelectedSubCategory('');
    setCurrentPage(1);
    // URL'yi güncelle
    const searchParams = new URLSearchParams();
    if (mainCategoryId) searchParams.set('main_category', mainCategoryId);
    if (searchTerm) searchParams.set('search', searchTerm);
    
    const queryString = searchParams.toString();
    navigate(`/urunler${queryString ? `?${queryString}` : ''}`);
  };

  // Alt kategori değiştiğinde
  const handleSubCategoryChange = (subCategorySlug: string) => {
    setSelectedSubCategory(subCategorySlug);
    setCurrentPage(1);
    // URL'yi güncelle
    const searchParams = new URLSearchParams();
    if (selectedMainCategory) searchParams.set('main_category', selectedMainCategory);
    if (subCategorySlug) searchParams.set('sub_category', subCategorySlug);
    if (searchTerm) searchParams.set('search', searchTerm);
    
    const queryString = searchParams.toString();
    navigate(`/urunler${queryString ? `?${queryString}` : ''}`);
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMainCategory('');
    setSelectedSubCategory('');
    setCurrentPage(1);
    navigate('/urunler');
  };

  return (
    <div className="all-products-page">
      <Container className="py-5">
        {/* Sayfa Başlığı */}
        <div className="text-center mb-5">
          <h1 className="text-dark fw-bold mb-2">TÜM ÜRÜNLER</h1>
          <p className="text-muted mb-0">En kaliteli ve en uygun fiyatlı ürünlerimizi keşfedin</p>
          <div className="d-flex justify-content-center mt-3">
            <div className="bg-warning" style={{ width: '60px', height: '3px', borderRadius: '2px' }}></div>
          </div>
        </div>

        {/* Filtreler */}
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Row>
                  {/* Arama */}
                  <Col md={4} className="mb-3">
                    <Form onSubmit={handleSearch}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Ürün Ara</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="text"
                            placeholder="Ürün adı veya açıklama..."
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

                  {/* Ana Kategori */}
                  <Col md={3} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold">Ana Kategori</Form.Label>
                      <Form.Select
                        value={selectedMainCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                      >
                        <option value="">Tüm Kategoriler</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* Alt Kategori */}
                  <Col md={3} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold">Alt Kategori</Form.Label>
                      <Form.Select
                        value={selectedSubCategory}
                        onChange={(e) => handleSubCategoryChange(e.target.value)}
                        disabled={!selectedMainCategory}
                      >
                        <option value="">Tüm Alt Kategoriler</option>
                        {selectedMainCategory && getSubCategories(selectedMainCategory).map((subCat) => (
                          <option key={subCat.slug} value={subCat.slug}>
                            {subCat.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

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
        {products.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3">
              <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
            </div>
            <h4 className="text-muted mb-3">Ürün Bulunamadı</h4>
            <p className="text-muted mb-4">
              Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.
            </p>
            <Button variant="primary" onClick={clearFilters}>
              Filtreleri Temizle
            </Button>
          </div>
        ) : (
          <>
            {/* Ürün Sayısı Bilgisi */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="text-muted mb-0">
                Toplam <strong>{totalCount}</strong> ürün bulundu
              </p>
              <p className="text-center mb-0">
                Sayfa {currentPage} / {totalPages}
              </p>
            </div>

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
});

export default AllProductsPage;
