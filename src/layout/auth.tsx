import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/auth.provider";

const Auth = () => {
  const navigate = useNavigate();

  const { isAuthenticated, isUserStoreOwner, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && isUserStoreOwner) navigate("/");
  }, [isAuthenticated, isUserStoreOwner]);

  return isAuthenticated && !isLoading ? (
    <>Loading</>
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default Auth;
