import { Outlet, Navigate } from "react-router-dom";
import { useTask } from "../../taskContext";

const RequireLogin = () => {
  const { isAuthenticated } = useTask();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireLogin;
