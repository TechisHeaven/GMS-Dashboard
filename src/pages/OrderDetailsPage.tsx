import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, MoreVertical } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../service/order.service";
import {
  getStatusColor,
  getStatusLabel,
  orderStages,
} from "../constants/order";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: string) =>
      OrderService.updateOrderStatus(id!, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderDetails", id] });
    },
  });

  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => OrderService.fetchOrderDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading order details.</div>;
  }

  // Mock data
  // const orderDetails = {
  //   id: "SPRITE-100063",
  //   status: "Completed",
  //   items: [
  //     {
  //       id: "#658945",
  //       name: "Organic Apples",
  //       quantity: 1,
  //       price: 50.0,
  //       total: 50.0,
  //     },
  //     {
  //       id: "#658934",
  //       name: "Fresh Milk",
  //       quantity: 1,
  //       price: 60.0,
  //       total: 60.0,
  //     },
  //     {
  //       id: "#658956",
  //       name: "Whole Grain Bread",
  //       quantity: 1,
  //       price: 20.0,
  //       total: 20.0,
  //     },
  //   ],
  //   customer: {
  //     name: "John Smith",
  //     email: "john.smith@gmail.com",
  //     shippingAddress: "1600 Amphitheatre Parkway, CA, USA 94043",
  //     billingAddress: "Same as shipping address",
  //     payment: "Cash on Delivery",
  //   },
  //   timeline: [
  //     {
  //       date: "OCTOBER 20",
  //       events: [
  //         {
  //           time: "10:42 PM",
  //           description: "This order was completed",
  //         },
  //         {
  //           time: "10:42 PM",
  //           description: "Shipping confirmation email was sent to customer",
  //         },
  //       ],
  //     },
  //     {
  //       date: "OCTOBER 18",
  //       events: [
  //         {
  //           time: "09:22 PM",
  //           description: "Order confirmation email was sent to customer",
  //         },
  //         {
  //           time: "09:22 PM",
  //           description: "Payment was processed",
  //         },
  //         {
  //           time: "09:22 PM",
  //           description: "Order was placed",
  //         },
  //       ],
  //     },
  //   ],
  // };
  const currentStageIndex = orderStages.indexOf(orderDetails.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/orders")}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {orderDetails._id}
              </h1>
              <p className="text-sm text-gray-500">
                Created at 09-10-2022 09:22 PM
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {orderDetails.status}
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Download size={16} className="mr-2" />
              Download Invoice
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="col-span-2 bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Details
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">ID</th>
                    <th className="pb-4">Product name</th>
                    <th className="pb-4">Qty</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {!isLoading &&
                    orderDetails &&
                    orderDetails?.items?.map(
                      (item: typeof orderDetails.items) => (
                        <tr key={item.id} className="border-t">
                          <td className="py-4">{item._id}</td>
                          <td className="py-4">{item.name}</td>
                          <td className="py-4">x{item.quantity}</td>
                          <td className="py-4">${item.price.toFixed(2)}</td>
                          <td className="py-4">
                            ${orderDetails.totalAmount.toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Paid by Customer
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>
                      $
                      {orderDetails.items
                        .reduce(
                          (acc: number) => acc + orderDetails.totalAmount,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t">
                    <span>Total paid by customer</span>
                    <span>${(orderDetails.totalAmount + 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Timeline
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">
                    Order Timeline
                  </h4>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Update Order Status
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        className="rounded-md border-gray-300 px-3 py-2"
                        value={orderDetails.status}
                        onChange={(e) =>
                          updateStatusMutation.mutate(e.target.value)
                        }
                        disabled={updateStatusMutation.isPending}
                      >
                        {orderStages.map((stage) => (
                          <option key={stage} value={stage}>
                            {getStatusLabel(stage)}
                          </option>
                        ))}
                      </select>
                      {updateStatusMutation.isPending && (
                        <span className="text-xs text-gray-500">
                          Updating...
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {orderStages.map((stage, index) => {
                      const isCompleted = index < currentStageIndex;
                      const isCurrent = index === currentStageIndex;

                      return (
                        <div key={stage} className="flex items-start">
                          {/* Status Indicator */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-3 h-3 rounded-full mt-2 ${
                                isCurrent
                                  ? getStatusColor(stage, false) // Active stage color
                                  : isCompleted
                                  ? getStatusColor(stage, true) // Previous stage = Green
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          </div>

                          {/* Status Label */}
                          <div className="ml-4">
                            <p
                              className={`text-sm ${
                                isCurrent
                                  ? "font-semibold text-gray-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {getStatusLabel(stage)}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  orderDetails.createdAt
                                ).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Customer Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {orderDetails.customer.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {orderDetails.customer.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Shipping address
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {orderDetails.customer.shippingAddress}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Billing address
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {orderDetails.customer.billingAddress}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Payment
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {orderDetails.paymentMethod}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Tip: How to fulfill an order?
              </h3>
              <div className="aspect-video bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
