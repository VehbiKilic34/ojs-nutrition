const BASE_URL = 'https://fe1111.projects.academy.onlyjs.com/api/v1';
const IMAGE_BASE_URL = 'https://fe1111.projects.academy.onlyjs.com'; // Resimler için base URL

// API response tipleri
export interface ApiResponse<T> {
  status: string;
  data: T;
}

// Kategori tipleri
export interface CategoryChild {
  id: string;
  name: string;
  slug: string;
  order: number;
  sub_children?: Array<{
    name: string;
    slug: string;
    order: number;
  }>;
}

export interface TopSeller {
  name: string;
  slug: string;
  description: string;
  picture_src: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  children: CategoryChild[];
  top_sellers: TopSeller[];
}

export interface CategoriesResponse {
  data: Category[];
  status: string;
}

// Ürün tipleri
export interface Product {
  id: string;
  name: string;
  slug: string;
  short_explanation: string;
  price_info: {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
  };
  photo_src: string;
  comment_count: number;
  average_star: number;
}

// Best-sellers için özel tip
export interface BestSellerProduct {
  name: string;
  short_explanation: string;
  price_info: {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
  };
  photo_src: string;
  comment_count: number;
  average_star: number;
  slug?: string; // API'den gelmeyebilir, opsiyonel
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

// Ürün detayı için variant tipleri
export interface ProductVariant {
  id: string;
  size: {
    pieces: number;
    total_services: number;
  };
  aroma: string;
  price: {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
  };
  photo_src: string;
  is_available: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  short_explanation: string;
  explanation: {
    usage: string;
    features: string;
    description: string;
    nutritional_content: {
      ingredients: Array<{
        aroma: string | null;
        value: string;
      }>;
      nutritional_facts: {
        ingredients: Array<{
          name: string;
          amounts: string[];
        }>;
        portion_sizes: string[];
      };
      amino_acid_facts: {
        ingredients: Array<{
          name: string;
          amounts: string[];
        }>;
        portion_sizes: string[];
      } | null;
    };
  };
  main_category_id: string;
  sub_category_id: string;
  tags: string[];
  variants: ProductVariant[];
  comment_count: number;
  average_star: number;
}

// API fonksiyonları
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/categories`);
  
  if (!response.ok) {
    throw new Error('Kategoriler yüklenirken bir hata oluştu');
  }
  
  const data: ApiResponse<CategoriesResponse> = await response.json();
  return data.data.data;
};

export const getAllProducts = async (
  page: number = 1, 
  limit: number = 12,
  search?: string,
  mainCategory?: string,
  subCategory?: string
): Promise<ProductsResponse> => {
  const offset = (page - 1) * limit;
  let url = `${BASE_URL}/products?limit=${limit}&offset=${offset}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (mainCategory) {
    url += `&main_category_id=${mainCategory}`;
  }
  
  if (subCategory) {
    url += `&sub_category=${subCategory}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Ürünler yüklenirken bir hata oluştu');
  }
  
  const data: ApiResponse<ProductsResponse> = await response.json();
  return data.data;
};

export const getBestSellers = async (): Promise<BestSellerProduct[]> => {
  const response = await fetch(`${BASE_URL}/products/best-sellers`);
  
  if (!response.ok) {
    throw new Error('Çok satanlar yüklenirken bir hata oluştu');
  }
  
  const data: ApiResponse<BestSellerProduct[]> = await response.json();
  return data.data;
};

export const getProductDetail = async (slug: string): Promise<ProductDetail> => {
  const response = await fetch(`${BASE_URL}/products/${slug}`);
  
  if (!response.ok) {
    throw new Error('Ürün detayı yüklenirken bir hata oluştu');
  }
  
  const data: ApiResponse<ProductDetail> = await response.json();
  return data.data;
};

// Ürün yorumları için tipler ve fonksiyonlar
export interface ProductComment {
  id: string;
  stars: number;
  title: string;
  comment: string;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

export interface ProductCommentsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductComment[];
}

export const getProductComments = async (
  productSlug: string, 
  page: number = 1, 
  limit: number = 10,
  stars?: number
): Promise<ProductCommentsResponse> => {
  const offset = (page - 1) * limit;
  let url = `${BASE_URL}/products/${productSlug}/comments?limit=${limit}&offset=${offset}`;
  
  if (stars) {
    url += `&stars=${stars}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Ürün yorumları yüklenirken bir hata oluştu');
  }
  
  const data: ApiResponse<ProductCommentsResponse> = await response.json();
  return data.data;
};

export const addProductComment = async (
  productSlug: string,
  comment: {
    stars: number;
    title: string;
    comment: string;
  }
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/products/${productSlug}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  
  if (!response.ok) {
    throw new Error('Yorum eklenirken bir hata oluştu');
  }
};

// Ürün istatistikleri için
export interface ProductStatistics {
  total_ratings: number;
  average_rating: number;
  rating_distribution: {
    [key: number]: number;
  };
}

export const getProductStatistics = async (productSlug: string): Promise<ProductStatistics> => {
  const response = await fetch(`${BASE_URL}/products/${productSlug}/rate-statistics`);
  
  if (!response.ok) {
    throw new Error('Ürün istatistikleri yüklenirken bir hata oluştu');
  }
  
  const data: ApiResponse<ProductStatistics> = await response.json();
  return data.data;
};

// Tüm yorumları getiren fonksiyon (sayfalama olmadan)
export const getAllComments = async (): Promise<ProductComment[]> => {
  try {
    // Büyük bir limit ile tüm yorumları al
    const response = await fetch(`${BASE_URL}/products/comments?limit=1000&offset=0`);
    
    if (!response.ok) {
      throw new Error('Yorumlar yüklenirken bir hata oluştu');
    }
    
    const data: ApiResponse<ProductCommentsResponse> = await response.json();
    return data.data.results || [];
  } catch (error) {
    console.error('Tüm yorumlar yüklenirken hata:', error);
    return [];
  }
};

// Öne çıkan ürünler için API fonksiyonu
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=8&offset=0`);
    
    if (!response.ok) {
      throw new Error('Öne çıkan ürünler yüklenirken bir hata oluştu');
    }
    
    const data: ApiResponse<ProductsResponse> = await response.json();
    
    // Resim URL'lerini düzelt
    const productsWithFixedImages = data.data.results.map((product) => {
      let fixedPhotoSrc = product.photo_src;
      
      // Eğer resim URL'i tam URL değilse, base URL ekle
      if (fixedPhotoSrc && !fixedPhotoSrc.startsWith('http')) {
        fixedPhotoSrc = `${IMAGE_BASE_URL}${fixedPhotoSrc.startsWith('/') ? '' : '/'}${fixedPhotoSrc}`;
      }
      
      if (!fixedPhotoSrc || fixedPhotoSrc === '' || fixedPhotoSrc === 'null') {
        fixedPhotoSrc = 'https://via.placeholder.com/300x200?text=Ürün+Resmi';
      }
      
      return {
        ...product,
        photo_src: fixedPhotoSrc
      };
    });
    
    return productsWithFixedImages;
  } catch (error) {
    console.error('Öne çıkan ürünler yüklenirken hata:', error);
    return [];
  }
};

// Banner verileri için API fonksiyonu
export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
}

export const getBanners = async (): Promise<BannerSlide[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=5&offset=0`);
    
    if (!response.ok) {
      throw new Error('Banner verileri yüklenirken bir hata oluştu');
    }
    
    const data: ApiResponse<ProductsResponse> = await response.json();
    
    const banners: BannerSlide[] = data.data.results.map((product, index) => {
      let bannerImage = product.photo_src;
      
      // Eğer resim URL'i tam URL değilse, base URL ekle
      if (bannerImage && !bannerImage.startsWith('http')) {
        bannerImage = `${IMAGE_BASE_URL}${bannerImage.startsWith('/') ? '' : '/'}${bannerImage}`;
      }
      
      if (!bannerImage || bannerImage === '' || bannerImage === 'null') {
        bannerImage = 'https://via.placeholder.com/1200x500/007bff/ffffff?text=Banner+Resmi';
      }
      
      return {
        id: product.id,
        title: product.name,
        subtitle: product.short_explanation,
        image: bannerImage,
        buttonText: 'Ürünü İncele',
        buttonLink: `/urunler/${product.slug}`,
        backgroundColor: index % 2 === 0 ? '#007bff' : '#28a745'
      };
    });
    
    return banners;
  } catch (error) {
    console.error('Banner verileri yüklenirken hata:', error);
    return [];
  }
}; 