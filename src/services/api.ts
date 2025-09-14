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
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('Categories API Response:', rawData);
    
    // API response formatını kontrol et - 3 katmanlı: data.data.data
    if (rawData.status === 'success' && rawData.data && rawData.data.data) {
      return rawData.data.data;
    } else if (rawData.status === 'success' && rawData.data) {
      return rawData.data;
    } else {
      throw new Error('API response formatı tanınmıyor');
    }
    
  } catch (error) {
    console.error('Categories API Error:', error);
    throw error;
  }
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
  
  // Arama parametresi varsa ekle
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  // Kategori filtreleme parametreleri varsa ekle
  if (mainCategory) {
    url += `&main_category=${mainCategory}`;
  }
  
  if (subCategory) {
    url += `&sub_category=${subCategory}`;
  }

  try {
    // Timeout ile fetch işlemi
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('Products API Raw Response:', rawData);
    
    // Response formatını kontrol et
    if (!rawData || typeof rawData !== 'object') {
      throw new Error('API response geçersiz format');
    }
    
    // API'den gelen format: { status: "success", data: { data: { results: [], count: number, ... } } }
    if (rawData.status === 'success' && rawData.data && rawData.data.data && rawData.data.data.results) {
      return rawData.data.data;
    } else if (rawData.status === 'success' && rawData.data && rawData.data.results) {
      return rawData.data;
    } else {
      throw new Error('API response formatı tanınmıyor');
    }
    
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('API isteği zaman aşımına uğradı');
    }
    console.error('API Error:', error);
    throw error;
  }
};

export const getBestSellers = async (): Promise<BestSellerProduct[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/best-sellers`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('Best Sellers API Response:', rawData);
    
    // API response formatını kontrol et - 3 katmanlı: data.data.data
    if (rawData.status === 'success' && rawData.data && rawData.data.data) {
      return rawData.data.data;
    } else if (rawData.status === 'success' && rawData.data) {
      return rawData.data;
    } else {
      throw new Error('API response formatı tanınmıyor');
    }
    
  } catch (error) {
    console.error('Best Sellers API Error:', error);
    throw error;
  }
};

export const getProductDetail = async (slug: string): Promise<ProductDetail> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${slug}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('Product Detail API Response:', rawData);
    
    // API response formatını kontrol et - 3 katmanlı: data.data.data
    if (rawData.status === 'success' && rawData.data && rawData.data.data) {
      return rawData.data.data;
    } else if (rawData.status === 'success' && rawData.data) {
      return rawData.data;
    } else {
      throw new Error('API response formatı tanınmıyor');
    }
    
  } catch (error) {
    console.error('Product Detail API Error:', error);
    throw error;
  }
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
  try {
    const offset = (page - 1) * limit;
    let url = `${BASE_URL}/products/${productSlug}/comments?limit=${limit}&offset=${offset}`;
    
    if (stars) {
      url += `&stars=${stars}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('Product Comments API Response:', rawData);
    
    // API response formatını kontrol et - 3 katmanlı: data.data.data
    if (rawData.status === 'success' && rawData.data && rawData.data.data) {
      return rawData.data.data;
    } else if (rawData.status === 'success' && rawData.data) {
      return rawData.data;
    } else {
      throw new Error('API response formatı tanınmıyor');
    }
    
  } catch (error) {
    console.error('Product Comments API Error:', error);
    throw error;
  }
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
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('All Comments API Response:', rawData);
    
    // API response formatını kontrol et - 3 katmanlı: data.data.data
    if (rawData.status === 'success' && rawData.data && rawData.data.data && rawData.data.data.results) {
      return rawData.data.data.results;
    } else if (rawData.status === 'success' && rawData.data && rawData.data.results) {
      return rawData.data.results;
    } else {
      return [];
    }
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
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('Featured Products API Response:', rawData);
    
    // API response formatını kontrol et - 3 katmanlı: data.data.data
    let products: Product[] = [];
    if (rawData.status === 'success' && rawData.data && rawData.data.data && rawData.data.data.results) {
      products = rawData.data.data.results;
    } else if (rawData.status === 'success' && rawData.data && rawData.data.results) {
      products = rawData.data.results;
    } else {
      return [];
    }
    
    // Resim URL'lerini düzelt
    const productsWithFixedImages = products.map((product) => {
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
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log('Banners API Response:', rawData);
    
    // API response formatını kontrol et - 3 katmanlı: data.data.data
    let products: Product[] = [];
    if (rawData.status === 'success' && rawData.data && rawData.data.data && rawData.data.data.results) {
      products = rawData.data.data.results;
    } else if (rawData.status === 'success' && rawData.data && rawData.data.results) {
      products = rawData.data.results;
    } else {
      return [];
    }
    
    const banners: BannerSlide[] = products.map((product, index) => {
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