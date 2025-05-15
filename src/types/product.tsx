export type ProductType = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  weight: string;
};

export type ProductInfoType = {
  _id: string | number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  categories: { _id: string; name: string }[];
  store: string;
  soldCount: number;
  soldTime: number;
  stock: number;
};
