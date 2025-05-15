export type StoreType = {
  id: string | number;
  title: string;
  deliveryTime: string | number;
  image: string;
  banner: string;
};

export interface Store {
  _id?: string;
  name: string;
  type: string;
  location?: string;
  contactNumber: string;
  openingTime: string;
  closingTime: string;
  rating?: number;
  description: string;
  image?: string;
  banner?: string;
  user?: string;
  storeCode?: string; // Store Code for joining
}
