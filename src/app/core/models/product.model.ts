export interface ProductDto {
  id: number;
  title: string;
  category: string;
  mrp?: string;
  netPrice: string;
  numericPrice?: number;
  imageUrl?: string;
  description?: string;
  tag?: string;
  accent?: string;
  colors?: string[];
  materials?: string[];
  features?: string[];
  active?: boolean;
  createdAt?: string;
}

export interface CategorySummaryDto {
  model: string;
  label: string;
  subtitle: string;
  accent: string;
  count: number;
}
