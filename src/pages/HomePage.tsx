import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import {
  Store,
  Package,
  ShoppingCart,
  Users,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import api from "../utils/api.utils";
import { Link } from "react-router-dom";
import { OrderService } from "../service/order.service";
import { getStatusColor, getStatusIcon } from "../utils/color.utils";
import { useAuth } from "../provider/auth.provider";
import { CustomerService } from "../service/custom.service";

const data = [
  { name: "Jan", revenue: 20000 },
  { name: "Feb", revenue: 25000 },
  { name: "Mar", revenue: 22000 },
  { name: "Apr", revenue: 28000 },
  { name: "May", revenue: 32000 },
  { name: "Jun", revenue: 35000 },
];

const Dashboard = () => {
  const { token } = useAuth();
  const fetchDashboardProducts = async () => {
    const { data } = await api.get("/api/products/dashboard/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  const {
    data: products,
    isLoading: isProductLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchDashboardProducts"],
    queryFn: fetchDashboardProducts,
  });
  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["fetchDashboardOrders"],
    queryFn: OrderService.fetchDashboardOrders,
  });
  const { data: customers, isLoading: isCustomersLoading } = useQuery({
    queryKey: ["fetchDashboardCustomers"],
    queryFn: CustomerService.fetchDashboardCustomers,
    select: (data) => data?.customers,
  });

  if (isError) {
    return <div>Error loading data</div>;
  }

  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const totalCustomers = customers?.length || 0;
  const totalRevenue =
    (orders?.length > 0 &&
      orders?.reduce(
        (sum: number, order: { totalAmount: string }) =>
          sum + parseFloat(order.totalAmount),
        0
      )) ||
    0;
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Products
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {totalProducts}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUp className="h-4 w-4" />
                          <span className="sr-only">Increased by</span>
                          12%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {totalOrders}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUp className="h-4 w-4" />
                          <span className="sr-only">Increased by</span>
                          8%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Customers
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {totalCustomers}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUp className="h-4 w-4" />
                          <span className="sr-only">Increased by</span>
                          5.4%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Store className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Revenue
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          ₹{totalRevenue}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUp className="h-4 w-4" />
                          <span className="sr-only">Increased by</span>
                          10%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-900">
                  Revenue Overview
                </h2>
                <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-900">
                  View detailed report
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4F46E5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">
                  Recent Orders
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {isOrdersLoading ? (
                  <div>Loading orders</div>
                ) : orders?.length > 0 ? (
                  orders?.map(
                    (
                      order: {
                        orderNumber: string;
                        items: string[];
                        totalAmount: string;
                        status: string;
                      },
                      index: number
                    ) => (
                      <Link to={`/order/${order.orderNumber}`} key={index}>
                        <div className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {order.orderNumber}
                              </p>
                              <p className="text-sm text-gray-500">
                                {order.items?.length} items • ₹
                                {order.totalAmount}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              <span className="mr-1">
                                {getStatusIcon(order.status)}
                              </span>
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  )
                ) : (
                  <div>No Orders Exists</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
