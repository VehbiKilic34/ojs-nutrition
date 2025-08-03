import { Container, Row, Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { CategorySection } from "../components/CategorySelection";
import { PromotionSlider } from "../components/PromotionSlider";
import { Footer } from "../components/Footer";
import { footerData } from "../data/footer";
import { Header } from "../components/Header";
import { HomeSlider } from "../components/HomeSlider";
import { FAQSection } from "../components/FAQSection";
import { faqData } from "../data/faq";
import type { BestSellerProduct, Product, BannerSlide } from "../services/api";

interface HomeLoaderData {
  bestSellers: BestSellerProduct[];
  featuredProducts: Product[];
  banners: BannerSlide[];
}

export default function Home() {
  const { bestSellers, featuredProducts, banners } = useLoaderData() as HomeLoaderData;

  return (
    <>
      {/* Header/Hero Section */}
      <Header />
      
      {/* Ana Banner Slider */}
      {banners.length > 0 && (
        <HomeSlider banners={banners} />
      )}
      
      {/* Kategoriler */}
      <CategorySection />
      
      {/* Öne Çıkan Ürünler Slider */}
      {featuredProducts.length > 0 && (
        <PromotionSlider products={featuredProducts} />
      )}

      {/* Çok Satanlar */}
      {bestSellers.length > 0 && (
        <Container className="py-4">
          <h4 className="mb-4 text-center text-md-start">Çok Satanlar</h4>
          <Row>
            {bestSellers.map((product, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
                <ProductCard 
                  id={index.toString()}
                  name={product.name}
                  slug={product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}
                  short_explanation={product.short_explanation}
                  price_info={product.price_info}
                  photo_src={product.photo_src}
                  comment_count={product.comment_count}
                  average_star={product.average_star}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Sık Sorulan Sorular */}
      <FAQSection faqItems={faqData} />

      {/* Footer */}
      <Footer data={footerData} />
    </>
  );
}