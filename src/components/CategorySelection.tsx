import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { CategoryCard } from "./CategoryCard";
import { useCategories } from "../data/categories";

export const CategorySection = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <Container>
        <section className="py-4">
          <h4 className="mb-4">Kategoriler</h4>
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </Spinner>
          </div>
        </section>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <section className="py-4">
          <h4 className="mb-4">Kategoriler</h4>
          <Alert variant="danger">
            Kategoriler yüklenirken bir hata oluştu: {error}
          </Alert>
        </section>
      </Container>
    );
  }

  
  if (!categories || categories.length === 0) {
    return (
      <Container>
        <section className="py-4">
          <h4 className="mb-4">Kategoriler</h4>
          <Alert variant="info">
            Henüz kategori bulunmamaktadır.
          </Alert>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-4">
        <h4 className="mb-4">Kategoriler</h4>
        <Row>
          {categories.map((category) => (
            <Col key={category.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <CategoryCard 
                name={category.name}
                slug={category.slug}
                categoryId={category.id}
                topSellers={category.top_sellers}
              />
            </Col>
          ))}
        </Row> 
      </section>
    </Container>
  );
};