import { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Button, Form, Alert, Spinner, Pagination } from 'react-bootstrap';
import { getProductComments, getProductStatistics, addProductComment, type ProductComment, type ProductStatistics } from '../services/api';


interface ProductReviewsProps {
  productSlug: string;
  averageStar: number;
  commentCount: number;
}

export default function ProductReviews({ productSlug, averageStar, commentCount }: ProductReviewsProps) {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [statistics, setStatistics] = useState<ProductStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    stars: 5,
    title: '',
    comment: ''
  });

  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const commentsData = await getProductComments(productSlug, currentPage, 5, selectedStars || undefined);
      console.log('API Comments Raw:', commentsData); // Debug için
      
      // API yanıtını kontrol et ve güvenli hale getir
      const safeComments = (commentsData?.results || []).map((comment: ProductComment) => ({
        id: comment.id || `comment-${Math.random()}`,
        title: comment.title || 'Başlıksız Yorum',
        comment: comment.comment || 'Yorum metni bulunmamaktadır.',
        stars: comment.stars || 0,
        created_at: comment.created_at || new Date().toISOString(),
        user: {
          first_name: comment.user?.first_name || 'Anonim',
          last_name: comment.user?.last_name || ''
        }
      }));
      
      console.log('Safe Comments:', safeComments); // Debug için
      setComments(safeComments);
      setTotalPages(Math.ceil((commentsData?.count || 0) / 5));
    } catch {
      console.error('Yorumlar yüklenirken hata oluştu');
      setError('Yorumlar yüklenirken bir hata oluştu');
      setComments([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [productSlug, currentPage, selectedStars]);

  const loadStatistics = useCallback(async () => {
    try {
      const stats = await getProductStatistics(productSlug);
      console.log('API Statistics:', stats); // Debug için
      setStatistics(stats);
    } catch (err) {
      console.error('İstatistikler yüklenirken hata:', err);
      // Hata durumunda varsayılan istatistikler oluştur
      setStatistics({
        total_ratings: commentCount,
        average_rating: averageStar,
        rating_distribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        }
      });
    }
  }, [productSlug, commentCount, averageStar]);

  useEffect(() => {
    loadComments();
    loadStatistics();
  }, [loadComments, loadStatistics]);

  const handleStarFilter = (stars: number | null) => {
    setSelectedStars(stars);
    setCurrentPage(1);
  };

  const handleSubmitReview = async () => {
    try {
      if (!newReview.title.trim() || !newReview.comment.trim()) {
        alert('Lütfen başlık ve yorum alanlarını doldurun');
        return;
      }
      
      await addProductComment(productSlug, newReview);
      
      alert('Yorumunuz başarıyla eklendi!');
      setShowReviewForm(false);
      setNewReview({ stars: 5, title: '', comment: '' });
      loadComments(); // Yorumları yeniden yükle
      loadStatistics(); // İstatistikleri yeniden yükle
    } catch {
      alert('Yorum eklenirken bir hata oluştu');
    }
  };

  const renderStars = (stars: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < stars ? 'text-warning' : 'text-muted'}>
        ⭐
      </span>
    ));
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'Tarih belirtilmemiş';
      return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Tarih formatlanırken hata:', error);
      return 'Geçersiz tarih';
    }
  };

  if (loading && comments.length === 0) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
             {/* Yorum İstatistikleri */}
       {statistics && statistics.rating_distribution && (
         <Card className="mb-4">
           <Card.Body>
             <Row>
               <Col md={3} className="text-center">
                 <h3 className="text-warning mb-1">{(averageStar || 0).toFixed(1)}</h3>
                 <div className="mb-2">{renderStars(Math.round(averageStar || 0))}</div>
                 <small className="text-muted">{commentCount} yorum</small>
               </Col>
               <Col md={9}>
                 <div className="d-flex flex-column gap-1">
                   {[5, 4, 3, 2, 1].map((star) => {
                     const count = statistics.rating_distribution[star] || 0;
                     const percentage = commentCount > 0 ? (count / commentCount) * 100 : 0;
                     return (
                       <div key={star} className="d-flex align-items-center">
                         <small className="me-2" style={{ width: '20px' }}>{star}⭐</small>
                         <div className="flex-grow-1 me-2">
                           <div className="progress" style={{ height: '8px' }}>
                             <div 
                               className="progress-bar bg-warning" 
                               style={{ width: `${percentage}%` }}
                             ></div>
                           </div>
                         </div>
                         <small className="text-muted" style={{ width: '40px' }}>{count}</small>
                       </div>
                     );
                   })}
                 </div>
               </Col>
             </Row>
           </Card.Body>
         </Card>
       )}

             {/* Yorum Filtreleri */}
       <div className="mb-4">
         <div className="d-flex flex-wrap gap-2 mb-3">
           <Button
             variant={selectedStars === null ? "primary" : "outline-primary"}
             size="sm"
             onClick={() => handleStarFilter(null)}
           >
             Tümü ({commentCount})
           </Button>
           {statistics?.rating_distribution && [5, 4, 3, 2, 1].map((star) => {
             const count = statistics.rating_distribution[star] || 0;
             return (
               <Button
                 key={star}
                 variant={selectedStars === star ? "primary" : "outline-primary"}
                 size="sm"
                 onClick={() => handleStarFilter(star)}
               >
                 {star}⭐ ({count})
               </Button>
             );
           })}
         </div>
        
        <Button
          variant="success"
          size="sm"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Yorum Formunu Kapat' : 'Yorum Yaz'}
        </Button>
      </div>

      {/* Yorum Formu */}
      {showReviewForm && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Yorum Yaz</h5>
            <Form>
              <div className="mb-3">
                <Form.Label>Puanınız</Form.Label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant={newReview.stars >= star ? "warning" : "outline-warning"}
                      size="sm"
                      className="me-1"
                      onClick={() => setNewReview({ ...newReview, stars: star })}
                    >
                      ⭐
                    </Button>
                  ))}
                </div>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Başlık</Form.Label>
                <Form.Control
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="Yorum başlığınız"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Yorumunuz</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Ürün hakkında düşüncelerinizi paylaşın"
                />
              </Form.Group>
              
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={handleSubmitReview}>
                  Yorumu Gönder
                </Button>
                <Button variant="secondary" onClick={() => setShowReviewForm(false)}>
                  İptal
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Hata Mesajı */}
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

             {/* Yorumlar Listesi */}
       {comments.length > 0 ? (
         <div className="mb-4">
           {comments.map((comment) => (
             <Card key={comment.id} className="mb-3">
               <Card.Body>
                 <div className="d-flex justify-content-between align-items-start mb-2">
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
                 
                 <p className="mb-2">{comment.comment}</p>
                 
                 <div className="text-muted">
                   <small>
                     {comment.user.first_name} {comment.user.last_name}
                   </small>
                 </div>
               </Card.Body>
             </Card>
           ))}
         </div>
      ) : (
        <Card className="mb-4">
          <Card.Body className="text-center text-muted">
            <p>Henüz yorum bulunmamaktadır.</p>
            <p>İlk yorumu siz yazın!</p>
          </Card.Body>
        </Card>
      )}

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev 
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              );
            })}
            
            <Pagination.Next 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}


    </div>
  );
} 