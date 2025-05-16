import { Store } from "../types/store";
import api from "../utils/api.utils";
import Cookies from "js-cookie";
export const StoreService = {
  saveStore: async (storeData: Store): Promise<{ token: string }> => {
    try {
      const token = Cookies.get("store-token");
      const { data } = await api.post(
        "/api/stores",
        {
          ...storeData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
};
