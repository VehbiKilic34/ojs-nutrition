import { Card, Container } from "react-bootstrap";

type Props = {
  id?: string;
  name: string;
  image?: string;
  slug?: string;
  categoryId?: string;
  topSellers?: Array<{
    name: string;
    slug: string;
    description: string;
    picture_src: string;
  }>;
  onClick?: () => void;
  isActive?: boolean;
};

const CategoryCard = ({ name, image, topSellers, onClick, isActive }: Props) => {
  // API'den gelen top_sellers'dan resim al veya fallback kullan
  const categoryImage = topSellers && topSellers.length > 0 
    ? topSellers[0].picture_src 
    : image;

  // Photo URL'sini tam URL haline getir
  const fullImageUrl = categoryImage && categoryImage.startsWith('http') 
    ? categoryImage 
    : categoryImage && categoryImage.startsWith('/')
    ? `https://fe1111.projects.academy.onlyjs.com${categoryImage}`
    : 'https://via.placeholder.com/80x80/6c757d/ffffff?text=' + encodeURIComponent(name.charAt(0).toUpperCase()); // Fallback resim

  return (
    <Container>
      <Card 
        className={`text-center h-100 shadow-sm border-0 justify-content-center category-card ${isActive ? 'border-primary' : ''}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <Card.Img
          variant="top"
          src={fullImageUrl}
          alt={name}
          style={{ width: "80px", height: "80px", objectFit: "cover", margin: "1rem auto 0" }}
          onError={(e) => {
            // Resim yüklenemezse placeholder kullan
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/80x80/6c757d/ffffff?text=' + encodeURIComponent(name.charAt(0).toUpperCase());
          }}
        />
        <Card.Body>
          <Card.Title className="fs-6 text-dark">{name}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CategoryCard;