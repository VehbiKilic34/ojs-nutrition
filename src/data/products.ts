import type { Product, BestSellerProduct } from '../services/api';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllProducts, getBestSellers } from '../services/api';

// API'den ürün verilerini almak için hook
export const useProducts = (
  page: number = 1, 
  limit: number = 12,
  search?: string,
  mainCategory?: string,
  subCategory?: string
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  // Parametreleri memoize et
  const params = useMemo(() => ({
    page,
    limit,
    search: search || undefined,
    mainCategory: mainCategory || undefined,
    subCategory: subCategory || undefined
  }), [page, limit, search, mainCategory, subCategory]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching products with params:', params);
      const data = await getAllProducts(params.page, params.limit, params.search, params.mainCategory, params.subCategory);
      console.log('Products API response:', data);
      setProducts(data.results);
      setTotalCount(data.count);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
    } catch (err) {
      console.error('Products fetch error:', err);
      setError(err instanceof Error ? err.message : 'Ürünler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
        console.log('Fetching best sellers...');
        const data = await getBestSellers();
        console.log('Best sellers API response:', data);
        setBestSellers(data);
      } catch (err) {
        console.error('Best sellers fetch error:', err);
        setError(err instanceof Error ? err.message : 'Çok satanlar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return { bestSellers, loading, error };
}; 