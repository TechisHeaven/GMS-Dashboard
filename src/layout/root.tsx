import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../provider/auth.provider";
import { useEffect } from "react";

const Layout = () => {
  const { isAuthenticated, isUserStoreOwner, isLoading, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    if (isAuthenticated && !isLoading && !isUserStoreOwner)
      navigate("/onboarding");
  }, [isAuthenticated, isUserStoreOwner]);

  return isLoading && !user ? (
    <div>Loading</div>
  ) : (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
