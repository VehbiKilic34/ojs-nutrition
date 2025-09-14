import type { LoaderFunctionArgs } from 'react-router-dom';
import { getBestSellers, getAllProducts, getProductDetail } from './services/api';

// Ana sayfa için çok satanlar loader'ı
export const homeLoader = async () => {
  try {
    const bestSellers = await getBestSellers();
    return { bestSellers };
  } catch (error) {
    console.error('Home loader error:', error);
    return { bestSellers: [] };
  }
};

// Tüm ürünler sayfası için loader
export const allProductsLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = 12;
    
    const productsData = await getAllProducts(page, limit);
    return { 
      products: productsData.results, 
      totalCount: productsData.count,
      currentPage: page,
      totalPages: Math.ceil(productsData.count / limit),
      hasNext: !!productsData.next,
      hasPrevious: !!productsData.previous
    };
  } catch (error) {
    console.error('All products loader error:', error);
    return { 
      products: [], 
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false
    };
  }
};

// Ürün detay sayfası için loader
export const productDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const slug = params.slug;
    if (!slug) {
      throw new Error('Ürün slug\'ı bulunamadı');
    }
    
    const product = await getProductDetail(slug);
    return { product };
  } catch (error) {
    console.error('Product detail loader error:', error);
    throw new Error('Ürün bulunamadı');
  }
}; 