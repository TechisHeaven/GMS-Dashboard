import ToggleButton from "./ToggleButton";
import { Bell, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/auth.provider";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main-bg"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ToggleButton />
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Bell size={20} />
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={20} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
