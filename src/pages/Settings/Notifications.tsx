import { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    productAlerts: true,
    securityAlerts: true,
    newsletter: false,
    marketing: false,
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Notification Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose what notifications you want to receive.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700">
            Order Notifications
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="orderUpdates"
                  type="checkbox"
                  checked={notifications.orderUpdates}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      orderUpdates: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="orderUpdates"
                  className="text-sm font-medium text-gray-700"
                >
                  Order status updates
                </label>
                <p className="text-sm text-gray-500">
                  Receive notifications about your order status changes.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="productAlerts"
                  type="checkbox"
                  checked={notifications.productAlerts}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      productAlerts: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="productAlerts"
                  className="text-sm font-medium text-gray-700"
                >
                  Product alerts
                </label>
                <p className="text-sm text-gray-500">
                  Get notified when products are low in stock or back in stock.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">
            Security Notifications
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="securityAlerts"
                  type="checkbox"
                  checked={notifications.securityAlerts}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      securityAlerts: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="securityAlerts"
                  className="text-sm font-medium text-gray-700"
                >
                  Security alerts
                </label>
                <p className="text-sm text-gray-500">
                  Get important notifications about your account security.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">
            Marketing Preferences
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  type="checkbox"
                  checked={notifications.newsletter}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      newsletter: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="newsletter"
                  className="text-sm font-medium text-gray-700"
                >
                  Newsletter
                </label>
                <p className="text-sm text-gray-500">
                  Receive our weekly newsletter with updates and tips.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketing"
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      marketing: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="marketing"
                  className="text-sm font-medium text-gray-700"
                >
                  Marketing emails
                </label>
                <p className="text-sm text-gray-500">
                  Receive marketing emails about our products and services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-main-text text-white rounded-md hover:bg-main-text/90">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Notifications;
