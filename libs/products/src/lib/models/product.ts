import { Category } from './category';

export class Product {
  id?: string;
  code?:string;
  name?: string;
  description?: string;
  image?: string;
  images: string[] = [];
  brand?: string;
  price?: number;
  category?: Category;
  isFeatured?: boolean;
  dateCreated?: string;
  forReview?: boolean;
}
