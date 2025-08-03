export interface ProductPrice {
  profit: number | null;
  total_price: number;
  discounted_price: number | null;
  price_per_servings: number;
  discount_percentage?: number | null;
}

export interface ProductVariant {
  id: string;
  size: {
    gram?: number;
    pieces: number;
    total_services?: number;
  };
  aroma: string;
  price_info: ProductPrice;
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
      ingredients: Array<{ aroma: string | null; value: string }>;
      nutritional_facts: {
        ingredients: Array<{ name: string; amounts: string[] }>;
        portion_sizes: string[];
      };
      amino_acid_facts: Record<string, unknown>; // Detaylı tip tanımı yapılabilir
    };
  };
  variants: ProductVariant[];
  comment_count: number;
  average_star: number;
}