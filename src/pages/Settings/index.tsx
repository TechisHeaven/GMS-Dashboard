import { useState } from "react";
import {
  Settings as SettingsIcon,
  FileText,
  Bell,
  Mail,
  ReceiptText,
} from "lucide-react";
import General from "./GeneralInformation";
import TransactionReports from "./TransactionReports";
import Notifications from "./Notifications";
import EmailSettings from "./EmailSettings";
import BillingPage from "../BillingPage";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "General", icon: SettingsIcon },
    { id: "transaction-reports", name: "Transaction Reports", icon: FileText },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "email", name: "Email Settings", icon: Mail },
    { id: "billing", name: "Billing", icon: ReceiptText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <General />;
      case "transaction-reports":
        return <TransactionReports />;
      case "notifications":
        return <Notifications />;
      case "email":
        return <EmailSettings />;
      case "billing":
        return <BillingPage />;
      default:
        return <General />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="grid grid-cols-5 min-h-[600px]">
              {/* Settings Navigation */}
              <div className="col-span-1 border-r border-gray-200 p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex whitespace-nowrap items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                        activeTab === tab.id
                          ? "bg-main-bg text-main-text"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-2" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Settings Content */}
              <div className="col-span-4 p-6">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
