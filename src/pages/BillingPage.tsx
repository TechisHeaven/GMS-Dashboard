import HeadingContainer from "../components/HeadingContainer";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const BillingPage = () => {
  const billings = [
    {
      id: 1,
      invoice: "Invoice_01_2025",
      date: "2025-01-01",
      plan: "Basic Plan",
      users: 3,
    },
    {
      id: 2,
      invoice: "Invoice_02_2025",
      date: "2025-01-01",
      plan: "Basic Plan",
      users: 2,
    },
    {
      id: 3,
      invoice: "Invoice_03_2025",
      date: "2025-01-01",
      plan: "Basic Plan",
      users: 1,
    },
  ];
  return (
    <div className="p-6">
      <HeadingContainer
        title="Billing"
        subtitle="Here you can find all of your billing information"
        callback={() => console.log("clicked")}
      />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { members: 10, name: "Basic" },
          { members: 20, name: "Business" },
          { members: 40, name: "Enterprise" },
        ].map((plan, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg hover:shadow"
          >
            <h4 className="text-sm font-semibold">{plan.name} Plan</h4>
            <h6 className="text-xs font-semibold text-gray-500">
              Up to {plan.members} team members.
            </h6>
            <p className="text-xs font-semibold text-gray-500 flex gap-1 items-end">
              <span className="text-3xl font-bold text-black">
                ${99 + index * 100}
              </span>
              per month
            </p>
            <button
              className={`mt-2   px-4 py-2 rounded w-full ${
                index === 0
                  ? "bg-gray-200 text-main-text"
                  : "bg-main-text text-white"
              }`}
            >
              {index === 0 ? "Current Plan" : "Upgrade Plan"}
            </button>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-3">Billing History</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Invoice
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Billing Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Plan
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Users
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {billings.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap  w-full inline-flex gap-2">
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-main-bg bg-gray-100 border-gray-300 rounded-sm focus:ring-main-bg dark:focus:ring-main-bg dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {order.invoice}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.date}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{order.plan}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Array.from({ length: order.users }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-full border inline-block mr-1 p-1 border-gray-200"
                  >
                    <User className="w-4 h-4" />
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link
                  to={`/order/${order.id}`}
                  className="text-main-text hover:text-main-text/90"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingPage;
