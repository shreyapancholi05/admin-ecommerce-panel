export type Products = {
  stock?: number;
  id: string;
  brand: string;
  title: string;
  category: string;
  price?: number;
  description: string;
  rating?: number;
  images: string[];
  thumbnail: string;
  discountPercentage: number;
  reviews: reviews;
  dimensions: Dimensions;
  warrantyInformation: string;
  weight: number;
  shippingInformation: string

};
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface reviews {
  comment: string
  date: Date;
  reviewerEmail: string;
  reviewerName: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
