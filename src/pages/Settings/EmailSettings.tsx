import { useState } from "react";

const EmailSettings = () => {
  const [emailSettings, setEmailSettings] = useState({
    senderName: "GroceryDash",
    senderEmail: "notifications@grocerydash.com",
    orderConfirmation: true,
    shipmentUpdates: true,
    deliveryConfirmation: true,
    marketingEmails: false,
  });

  const [templates, setTemplates] = useState({
    orderConfirmation:
      "Thank you for your order! Your order #{{order_number}} has been confirmed.",
    shipmentUpdate:
      "Your order #{{order_number}} has been shipped and is on its way!",
    deliveryConfirmation:
      "Your order #{{order_number}} has been delivered. Enjoy!",
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Email Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure your email notifications and templates.
        </p>
      </div>

      {/* Sender Information */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">
          Sender Information
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sender Name
            </label>
            <input
              type="text"
              value={emailSettings.senderName}
              onChange={(e) =>
                setEmailSettings({
                  ...emailSettings,
                  senderName: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sender Email
            </label>
            <input
              type="email"
              value={emailSettings.senderEmail}
              onChange={(e) =>
                setEmailSettings({
                  ...emailSettings,
                  senderEmail: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            />
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">
          Email Notifications
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="orderConfirmation"
                type="checkbox"
                checked={emailSettings.orderConfirmation}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    orderConfirmation: e.target.checked,
                  })
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="orderConfirmation"
                className="text-sm font-medium text-gray-700"
              >
                Order Confirmation Emails
              </label>
              <p className="text-sm text-gray-500">
                Send confirmation emails when orders are placed.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="shipmentUpdates"
                type="checkbox"
                checked={emailSettings.shipmentUpdates}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    shipmentUpdates: e.target.checked,
                  })
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="shipmentUpdates"
                className="text-sm font-medium text-gray-700"
              >
                Shipment Update Emails
              </label>
              <p className="text-sm text-gray-500">
                Send emails when order status changes.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="deliveryConfirmation"
                type="checkbox"
                checked={emailSettings.deliveryConfirmation}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    deliveryConfirmation: e.target.checked,
                  })
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="deliveryConfirmation"
                className="text-sm font-medium text-gray-700"
              >
                Delivery Confirmation Emails
              </label>
              <p className="text-sm text-gray-500">
                Send emails when orders are delivered.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">Email Templates</h3>
        <div className="mt-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Confirmation Template
            </label>
            <textarea
              rows={3}
              value={templates.orderConfirmation}
              onChange={(e) =>
                setTemplates({
                  ...templates,
                  orderConfirmation: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shipment Update Template
            </label>
            <textarea
              rows={3}
              value={templates.shipmentUpdate}
              onChange={(e) =>
                setTemplates({ ...templates, shipmentUpdate: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Confirmation Template
            </label>
            <textarea
              rows={3}
              value={templates.deliveryConfirmation}
              onChange={(e) =>
                setTemplates({
                  ...templates,
                  deliveryConfirmation: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-main-text text-white rounded-md hover:bg-main-text/90">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EmailSettings;
