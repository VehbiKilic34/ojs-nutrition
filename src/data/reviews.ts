import { useState, useEffect } from 'react';

// Müşteri yorumları için type tanımı
export interface CustomerReview {
  id: string;
  date: string;
  summary: string;
  text: string;
  rating: number;
  customerName?: string;
  productId?: string;
}

// Müşteri yorumları hook'u
export const useReviews = (page: number = 1, limit: number = 4) => {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Gerçek API endpoint'i buraya gelecek
        // const response = await fetch(`https://api.ojsnutrition.com/reviews?page=${page}&limit=${limit}`);
        // const data: ReviewsResponse = await response.json();
        
        // Şimdilik mock data kullanıyoruz
        const mockData: CustomerReview[] = [
          {
            id: '1',
            date: '03/05/24',
            summary: 'Beğendim gayet güzeldi',
            text: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayabiliyor insanı teşekkürler.',
            rating: 5
          },
          {
            id: '2',
            date: '03/05/24',
            summary: 'Beğendim gayet güzeldi',
            text: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayabiliyor insanı teşekkürler.',
            rating: 5
          },
          {
            id: '3',
            date: '03/05/24',
            summary: 'Beğendim gayet güzeldi',
            text: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayabiliyor insanı teşekkürler.',
            rating: 5
          },
          {
            id: '4',
            date: '03/05/24',
            summary: 'Beğendim gayet güzeldi',
            text: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayabiliyor insanı teşekkürler.',
            rating: 5
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setReviews(mockData);
        setTotal(198453); // Toplam yorum sayısı
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Yorumlar yüklenirken hata oluştu');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page, limit]);

  return {
    reviews,
    loading,
    error,
    total,
    refetch: () => {
      // TODO: API'den yeniden veri çekme
      console.log('Yorumlar yeniden yükleniyor...');
    }
  };
};
