import Cookies from "js-cookie";
import api from "../utils/api.utils";
export const CustomerService = {
  fetchDashboardCustomers: async () => {
    const token = Cookies.get("token");
    const { data } = await api.get("/api/user/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
