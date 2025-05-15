export type User = {
  _id?: string;
  id?: string;
  email: string;
  fullName: string;
  role: "user" | "store-owner";
  phoneNumber: string;
  address: {
    address?: string;
    city: string;
    state: string;
    pin: string;
    country: string;
  };
};
export type UpdateUserProps = {
  email?: string;
  fullName?: string;
  role: "user" | "store-owner";
  phoneNumber?: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    pin?: string;
    country?: string;
  };
};
