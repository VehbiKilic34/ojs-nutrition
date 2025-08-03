import { Container, Row, Col, Card } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { footerData } from "../data/footer";
import { useState, useEffect } from "react";
import { getAllComments, type ProductComment } from "../services/api";
import { 
  Heart, 
  Bullseye, 
  Eye, 
  Shield, 
  Award, 
  Flask, 
  People, 
  Person, 
  PersonVcard,
  Star,
  StarFill
} from "react-bootstrap-icons";

export default function AboutPage() {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const allComments = await getAllComments();
        setComments(allComments);
      } catch (error) {
        console.error('Yorumlar yüklenirken hata:', error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, []);

  const renderStars = (stars: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-warning">
        {i < stars ? <StarFill /> : <Star />}
      </span>
    ));
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Geçersiz tarih';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">Hakkımızda</h1>
              <p className="lead">
                OJS Nutrition olarak, sağlıklı yaşam ve beslenme konusunda uzman çözümler sunuyoruz.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Hikayemiz Section */}
      <Container className="py-5">
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2 className="fw-bold mb-4">Hikayemiz</h2>
            <p className="lead text-muted mb-4">
              2020 yılında kurulan OJS Nutrition, sağlıklı yaşam ve beslenme alanında 
              kaliteli ürünler sunma misyonuyla yola çıktı.
            </p>
            <p className="text-muted">
              Modern yaşamın getirdiği beslenme sorunlarına çözüm üretmek amacıyla, 
              bilimsel araştırmalar ışığında geliştirdiğimiz ürünlerimizle 
              müşterilerimizin sağlıklı yaşam hedeflerine ulaşmasına yardımcı oluyoruz.
            </p>
          </Col>
          <Col lg={6}>
            <div className="bg-light rounded-3 p-4 h-100 d-flex align-items-center justify-content-center">
                             <div className="text-center">
                 <Heart className="text-primary" style={{ fontSize: '4rem' }} />
                 <h4 className="mt-3">Sağlıklı Yaşam</h4>
                 <p className="text-muted">Her ürünümüz sağlığınız için özenle seçilmiştir</p>
               </div>
            </div>
          </Col>
        </Row>

        {/* Misyon ve Vizyon */}
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                                 <div className="text-center mb-3">
                   <Bullseye className="text-primary" style={{ fontSize: '3rem' }} />
                 </div>
                <h3 className="text-center mb-3">Misyonumuz</h3>
                <p className="text-muted text-center">
                  Kaliteli ve güvenilir beslenme ürünleri ile insanların sağlıklı yaşam 
                  hedeflerine ulaşmasına yardımcı olmak, bilimsel araştırmalar ışığında 
                  geliştirilen ürünlerimizle toplum sağlığına katkıda bulunmak.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                                 <div className="text-center mb-3">
                   <Eye className="text-primary" style={{ fontSize: '3rem' }} />
                 </div>
                <h3 className="text-center mb-3">Vizyonumuz</h3>
                <p className="text-muted text-center">
                  Türkiye'nin önde gelen beslenme ve sağlık ürünleri markası olmak, 
                  uluslararası standartlarda kaliteli ürünler üreterek global pazarda 
                  söz sahibi olmak.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Değerlerimiz */}
        <Row className="mb-5">
          <Col lg={12}>
            <h2 className="text-center fw-bold mb-5">Değerlerimiz</h2>
          </Col>
          <Col md={3} className="mb-4">
            <div className="text-center">
                             <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                    style={{ width: '80px', height: '80px' }}>
                 <Shield style={{ fontSize: '2rem' }} />
               </div>
              <h5>Güvenilirlik</h5>
              <p className="text-muted small">Her ürünümüz güvenlik testlerinden geçer</p>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="text-center">
                             <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                    style={{ width: '80px', height: '80px' }}>
                 <Award style={{ fontSize: '2rem' }} />
               </div>
              <h5>Kalite</h5>
              <p className="text-muted small">En yüksek kalite standartlarında üretim</p>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="text-center">
                             <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                    style={{ width: '80px', height: '80px' }}>
                 <Flask style={{ fontSize: '2rem' }} />
               </div>
              <h5>Bilimsellik</h5>
              <p className="text-muted small">Bilimsel araştırmalar ışığında geliştirme</p>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="text-center">
                             <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                    style={{ width: '80px', height: '80px' }}>
                 <People style={{ fontSize: '2rem' }} />
               </div>
              <h5>Müşteri Odaklılık</h5>
              <p className="text-muted small">Müşteri memnuniyeti önceliğimiz</p>
            </div>
          </Col>
        </Row>

        {/* İstatistikler */}
        <Row className="bg-light rounded-3 py-5 mb-5">
          <Col lg={12}>
            <h2 className="text-center fw-bold mb-5">Rakamlarla OJS Nutrition</h2>
          </Col>
          <Col md={3} className="text-center mb-4">
            <h3 className="fw-bold text-primary mb-2">10K+</h3>
            <p className="text-muted">Mutlu Müşteri</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <h3 className="fw-bold text-primary mb-2">50+</h3>
            <p className="text-muted">Ürün Çeşidi</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <h3 className="fw-bold text-primary mb-2">3</h3>
            <p className="text-muted">Yıllık Deneyim</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <h3 className="fw-bold text-primary mb-2">%99</h3>
            <p className="text-muted">Müşteri Memnuniyeti</p>
          </Col>
        </Row>

        {/* Ekip */}
        <Row>
          <Col lg={12}>
            <h2 className="text-center fw-bold mb-5">Ekibimiz</h2>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                                 <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                      style={{ width: '100px', height: '100px' }}>
                   <Person className="text-primary" style={{ fontSize: '3rem' }} />
                 </div>
                <h5>Ahmet Yılmaz</h5>
                <p className="text-muted">Kurucu & CEO</p>
                <p className="small text-muted">
                  10+ yıl beslenme ve sağlık sektörü deneyimi
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                                 <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                      style={{ width: '100px', height: '100px' }}>
                   <PersonVcard className="text-primary" style={{ fontSize: '3rem' }} />
                 </div>
                <h5>Dr. Ayşe Kaya</h5>
                <p className="text-muted">Beslenme Uzmanı</p>
                <p className="small text-muted">
                  Diyetisyenlik ve beslenme bilimi uzmanı
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                                 <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                      style={{ width: '100px', height: '100px' }}>
                   <Flask className="text-primary" style={{ fontSize: '3rem' }} />
                 </div>
                <h5>Mehmet Demir</h5>
                <p className="text-muted">Ar-Ge Müdürü</p>
                <p className="small text-muted">
                  Gıda teknolojisi ve ürün geliştirme uzmanı
                </p>
              </Card.Body>
            </Card>
          </Col>
                 </Row>

         {/* Kullanıcı Yorumları */}
         <Row className="mt-5">
           <Col lg={12}>
             <h2 className="text-center fw-bold mb-5">Müşterilerimizin Yorumları</h2>
             <p className="text-center text-muted mb-5">
               Müşterilerimizin deneyimleri bizim için çok değerli. İşte bazı yorumlar:
             </p>
           </Col>
         </Row>

         {loading ? (
           <Row className="justify-content-center">
             <Col md={6} className="text-center">
               <div className="spinner-border text-primary" role="status">
                 <span className="visually-hidden">Yükleniyor...</span>
               </div>
               <p className="mt-3 text-muted">Yorumlar yükleniyor...</p>
             </Col>
           </Row>
         ) : (
           <Row>
             {comments.slice(0, 6).map((comment) => (
               <Col lg={4} md={6} className="mb-4" key={comment.id}>
                 <Card className="h-100 border-0 shadow-sm">
                   <Card.Body className="p-4">
                     <div className="d-flex justify-content-between align-items-start mb-3">
                       <div>
                         <h6 className="mb-1">{comment.title}</h6>
                         <div className="mb-2">
                           {renderStars(comment.stars)}
                         </div>
                       </div>
                       <small className="text-muted">
                         {formatDate(comment.created_at)}
                       </small>
                     </div>
                     
                     <p className="text-muted mb-3">{comment.comment}</p>
                     
                     <div className="d-flex align-items-center">
                       <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                            style={{ width: '40px', height: '40px' }}>
                         <Person />
                       </div>
                       <div>
                         <small className="fw-bold">
                           {comment.user.first_name} {comment.user.last_name}
                         </small>
                         <br />
                         <small className="text-muted">Müşteri</small>
                       </div>
                     </div>
                   </Card.Body>
                 </Card>
               </Col>
             ))}
           </Row>
         )}

         {comments.length > 6 && (
           <Row className="mt-4">
             <Col lg={12} className="text-center">
               <p className="text-muted">
                 Ve daha fazlası... Toplam {comments.length} müşteri yorumu
               </p>
             </Col>
           </Row>
         )}
       </Container>

       <Footer data={footerData} />
    </>
  );
} 