export const orderStages = [
  "pending",
  "order_confirmed",
  "being_packed",
  "ready_for_pickup",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: "Order Pending",
    order_confirmed: "Order Confirmed",
    being_packed: "Being Packed",
    ready_for_pickup: "Ready for Pickup",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] || "Unknown Status";
};

export const getStatusColor = (status: string, isCompleted: boolean) => {
  if (isCompleted) return "bg-green-500";
  const colors: Record<string, string> = {
    pending: "bg-yellow-500",
    order_confirmed: "bg-blue-500",
    being_packed: "bg-purple-500",
    ready_for_pickup: "bg-indigo-500",
    out_for_delivery: "bg-orange-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };
  return colors[status] || "bg-gray-400";
};
