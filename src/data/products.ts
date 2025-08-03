import type { Product, BestSellerProduct } from '../services/api';
import { useState, useEffect } from 'react';
import { getAllProducts, getBestSellers } from '../services/api';

// API'den ürün verilerini almak için hook
export const useProducts = (page: number = 1, limit: number = 12) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(page, limit);
        setProducts(data.results);
        setTotalCount(data.count);
        setHasNext(!!data.next);
        setHasPrevious(!!data.previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ürünler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return { products, loading, error, totalCount, hasNext, hasPrevious };
};

// Çok satanlar için hook
export const useBestSellers = () => {
  const [bestSellers, setBestSellers] = useState<BestSellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const data = await getBestSellers();
        setBestSellers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Çok satanlar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return { bestSellers, loading, error };
}; 