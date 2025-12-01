export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  category: 'miniatures' | 'bestsellers' | 'new' | 'deals';
}
