import type { LoaderFunctionArgs } from 'react-router-dom';
import { getBestSellers, getAllProducts, getProductDetail, getFeaturedProducts, getBanners } from './services/api';

// Loader fonksiyonları
export const homeLoader = async () => {
  try {
    const [bestSellers, featuredProducts, banners] = await Promise.all([
      getBestSellers(),
      getFeaturedProducts(),
      getBanners()
    ]);
    return { bestSellers, featuredProducts, banners };
  } catch (error) {
    console.error('Ana sayfa verileri yüklenirken hata:', error);
    return { bestSellers: [], featuredProducts: [], banners: [] };
  }
};

export const productsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const search = url.searchParams.get('search') || undefined;
  const mainCategory = url.searchParams.get('main_category') || undefined;
  const subCategory = url.searchParams.get('sub_category') || undefined;
  
  try {
    const productsData = await getAllProducts(page, 12, search, mainCategory, subCategory);
    return { 
      productsData, 
      currentPage: page,
      search,
      mainCategory,
      subCategory
    };
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    return { 
      productsData: { count: 0, next: null, previous: null, results: [] }, 
      currentPage: page,
      search,
      mainCategory,
      subCategory
    };
  }
};

export const productDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug;
  if (!slug) {
    throw new Error('Ürün slug\'ı bulunamadı');
  }
  
  try {
    const product = await getProductDetail(slug);
    return { product };
  } catch (error) {
    console.error('Ürün detayı yüklenirken hata:', error);
    throw new Error('Ürün bulunamadı');
  }
}; 