// src/pages/ProductsPage.tsx

import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Pagination, Form, InputGroup, Button } from 'react-bootstrap';
import { ProductCard } from '../components/ProductCard';
import type { ProductsResponse } from '../services/api';

interface ProductsLoaderData {
  productsData: ProductsResponse;
  currentPage: number;
  search?: string;
  mainCategory?: string;
  subCategory?: string;
}

export default function ProductsPage() {
  const { productsData, currentPage, search, mainCategory, subCategory } = useLoaderData() as ProductsLoaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { results: products, count } = productsData;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(count / itemsPerPage);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const handleSearch = (searchTerm: string) => {
    const newParams = new URLSearchParams();
    if (searchTerm) {
      newParams.set('search', searchTerm);
    }
    if (mainCategory) {
      newParams.set('main_category', mainCategory);
    }
    if (subCategory) {
      newParams.set('sub_category', subCategory);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm = formData.get('search') as string;
    handleSearch(searchTerm);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Tüm Ürünler</h1>
      
      {/* Arama Formu */}
      <Row className="mb-4">
        <Col md={6}>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                name="search"
                placeholder="Ürün ara..."
                defaultValue={search || ''}
              />
              <Button variant="primary" type="submit">
                Ara
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Filtre Bilgileri */}
      {(search || mainCategory || subCategory) && (
        <Row className="mb-3">
          <Col>
            <div className="d-flex flex-wrap gap-2">
              {search && (
                <span className="badge bg-primary">
                  Arama: {search}
                </span>
              )}
              {mainCategory && (
                <span className="badge bg-secondary">
                  Ana Kategori: {mainCategory}
                </span>
              )}
              {subCategory && (
                <span className="badge bg-info">
                  Alt Kategori: {subCategory}
                </span>
              )}
            </div>
          </Col>
        </Row>
      )}
      
      {/* Ürün listesi grid yapısı */}
      {products.length > 0 ? (
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((product) => (
            <Col key={product.id} className="mb-4">
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h4>Ürün bulunamadı</h4>
          <p className="text-muted">
            Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı anahtar kelimeler deneyin.
          </p>
        </div>
      )}

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            
            <Pagination.Next 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* Toplam ürün sayısı */}
      <div className="text-center mt-3 text-muted">
        Toplam {count} ürün bulundu
      </div>
    </Container>
  );
}