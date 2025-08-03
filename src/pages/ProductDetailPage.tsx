import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Badge, 
  Button, 
  Form, 
  Tabs,
  Tab,
  ListGroup
} from "react-bootstrap";
import type { ProductDetail } from "../services/api";
import ProductReviews from "../components/ProductReviews";
import { useCart } from "../hooks/useCart";

interface ProductDetailLoaderData {
  product: ProductDetail;
}

export default function ProductDetailPage() {
  const { product } = useLoaderData() as ProductDetailLoaderData;
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Product yüklenmemişse loading göster
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  if (!product) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <p>Ürün yükleniyor...</p>
        </div>
      </Container>
    );
  }

  // selectedVariant'ı product yüklendikten sonra güncelle
  if (selectedVariant === null && product.variants?.length > 0) {
    setSelectedVariant(product.variants[0].id);
  }

  const { 
    name, 
    short_explanation, 
    explanation, 
    variants, 
    comment_count, 
    average_star,
    tags,
    slug
  } = product;

  // Seçili variant'ı bul
  const currentVariant = variants?.find(v => v.id === selectedVariant) || variants?.[0];
  const { price, photo_src } = currentVariant || {};

  // Photo URL'sini tam URL haline getir
  const fullPhotoUrl = photo_src?.startsWith('http') 
    ? photo_src 
    : `https://fe1111.projects.academy.onlyjs.com${photo_src}`;

  const handleAddToCart = () => {
    if (!currentVariant) return;
    
    setIsAddingToCart(true);
    
    // Seçilen miktar kadar ürünü sepete ekle
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: parseInt(currentVariant.id.toString()),
        name: `${name} - ${currentVariant.aroma} (${currentVariant.size.pieces} adet)`,
        price: currentVariant.price.discounted_price || currentVariant.price.total_price,
        image: fullPhotoUrl,
      });
    }
    
    // Loading durumunu kaldır
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <Container className="py-4">
      <Row>
        {/* Ürün Görseli */}
        <Col lg={6} className="mb-4">
          <Card className="border-0">
            <Card.Img 
              variant="top" 
              src={fullPhotoUrl} 
              alt={name}
              className="img-fluid"
            />
          </Card>
        </Col>

        {/* Ürün Bilgileri */}
        <Col lg={6} className="mb-4">
          <h1 className="mb-3">{name}</h1>
          
          {/* Rating */}
          <div className="mb-3">
            <Badge bg="warning" text="dark" className="me-2">
              ⭐ {(average_star || 0).toFixed(1)}
            </Badge>
            <small className="text-muted">({comment_count || 0} yorum)</small>
          </div>

          {/* Kısa Açıklama */}
          <p className="text-muted mb-3">{short_explanation || 'Açıklama bulunmamaktadır.'}</p>

          {/* Etiketler */}
          {tags && tags.length > 0 && (
            <div className="mb-3">
              {tags.map((tag, index) => (
                <Badge key={index} bg="info" className="me-2">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Fiyat */}
          {currentVariant && price && (
            <div className="mb-4">
              {price.discounted_price ? (
                <div>
                  <h3 className="text-danger mb-1">
                    {price.discounted_price.toFixed(2)}₺
                  </h3>
                  <div className="d-flex align-items-center">
                    <span className="text-muted text-decoration-line-through me-2">
                      {price.total_price.toFixed(2)}₺
                    </span>
                    {price.discount_percentage && (
                      <Badge bg="danger">
                        %{price.discount_percentage} İndirim
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <h3 className="text-dark mb-1">
                  {price.total_price.toFixed(2)}₺
                </h3>
              )}
              <small className="text-muted">
                Servis başına: {price.price_per_servings.toFixed(2)}₺
              </small>
            </div>
          )}

          {/* Variant Seçimi */}
          {variants && variants.length > 0 && (
            <div className="mb-4">
              <h5>Seçenekler</h5>
              <div className="d-flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant === variant.id ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => setSelectedVariant(variant.id)}
                    disabled={!variant.is_available}
                  >
                    {variant.aroma} - {variant.size.pieces} adet
                    <br />
                    <small>{variant.price.total_price.toFixed(2)}₺</small>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Miktar Seçimi */}
          <div className="mb-4">
            <h5>Miktar</h5>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              style={{ width: "100px" }}
            />
          </div>

          {/* Sepete Ekle Butonu */}
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleAddToCart}
            className="w-100 mb-3"
            disabled={!currentVariant?.is_available || isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sepete Ekleniyor...
              </>
            ) : (
              currentVariant?.is_available ? 'Sepete Ekle' : 'Stokta Yok'
            )}
          </Button>
        </Col>
      </Row>

      {/* Detay Sekmeleri */}
      <Row className="mt-5">
        <Col>
          <Tabs
            activeKey={selectedTab}
            onSelect={(k) => setSelectedTab(k || "description")}
            className="mb-4"
          >
            <Tab eventKey="description" title="Açıklama">
              <Card>
                <Card.Body>
                  <h5>Ürün Açıklaması</h5>
                  <p>{explanation?.description || 'Açıklama bulunmamaktadır.'}</p>
                  
                  <h5>Özellikler</h5>
                  <p>{explanation?.features || 'Özellik bilgisi bulunmamaktadır.'}</p>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="usage" title="Kullanım">
              <Card>
                <Card.Body>
                  <h5>Kullanım Şekli</h5>
                  <p style={{ whiteSpace: 'pre-line' }}>{explanation?.usage || 'Kullanım bilgisi bulunmamaktadır.'}</p>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="nutrition" title="Besin Değerleri">
              <Card>
                <Card.Body>
                  <h5>Besin Değerleri</h5>
                  {explanation.nutritional_content?.nutritional_facts?.ingredients?.length > 0 ? (
                    <ListGroup>
                      {explanation.nutritional_content.nutritional_facts.ingredients.map((item, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between">
                          <span>{item.name}</span>
                          <span>{item.amounts.join(', ')}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">Besin değeri bilgisi bulunmamaktadır.</p>
                  )}
                  
                  {explanation.nutritional_content?.amino_acid_facts && (
                    <>
                      <h5 className="mt-4">Amino Asit Profili</h5>
                      <ListGroup>
                        {explanation.nutritional_content.amino_acid_facts.ingredients?.map((item, index) => (
                          <ListGroup.Item key={index} className="d-flex justify-content-between">
                            <span>{item.name}</span>
                            <span>{item.amounts.join(', ')}</span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="ingredients" title="İçindekiler">
              <Card>
                <Card.Body>
                  <h5>İçindekiler</h5>
                  {explanation.nutritional_content?.ingredients?.length > 0 ? (
                    explanation.nutritional_content.ingredients.map((ingredient, index) => (
                      <div key={index} className="mb-3">
                        {ingredient.aroma && <h6>{ingredient.aroma}</h6>}
                        <p className="text-muted">{ingredient.value}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">İçindekiler bilgisi bulunmamaktadır.</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="reviews" title={`Yorumlar (${comment_count || 0})`}>
              <ProductReviews 
                productSlug={slug}
                averageStar={average_star || 0}
                commentCount={comment_count || 0}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}