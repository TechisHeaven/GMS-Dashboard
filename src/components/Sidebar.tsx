import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Store,
  Package,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  PanelRightClose,
  ReceiptText,
} from "lucide-react";
import Dropdown from "../components/Dropdown";
import { useAuth } from "../provider/auth.provider";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Store, label: "Dashboard", path: "/" },
    { icon: Package, label: "Products", path: "/products" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: ReceiptText, label: "Earning", path: "/earning" },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help Center", path: "/help" },
  ];
  return (
    <div
      className={`bg-white h-full shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
        >
          <Store className="h-8 w-8 text-main-bg" />
          {/* {!isCollapsed && <Dropdown />} */}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          <PanelRightClose
            className={`${
              isCollapsed ? "rotate-180" : "rotate-0"
            } transition-all`}
            size={20}
          />
        </button>
      </div>

      <nav className="p-4 flex flex-col justify-between h-[calc(100%-65px)]">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-main-bg text-main-text"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>

        <ul className="space-y-2 mt-8 items-end">
          {bottomMenuItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              >
                <item.icon size={20} />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
