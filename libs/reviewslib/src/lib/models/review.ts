import { User } from "@pranshu/users";
import { Product } from "./product";

export class Review {
  user?: User;
  product?: Product;
  date?: string;
  rating?: number;
  description?: string;
  isApproved?: boolean;
}
