import Cookies from "js-cookie";
import api from "../utils/api.utils";
export const OrderService = {
  fetchDashboardOrders: async () => {
    const token = Cookies.get("token");
    const { data } = await api.get("/api/orders/all/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  fetchOrderDetails: async (id: string) => {
    const token = Cookies.get("token");
    const { data } = await api.get(`/api/orders/${id}/id/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
