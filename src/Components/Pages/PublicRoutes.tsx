import { Navigate, Outlet } from "react-router";
import AuthStore from "../../store/AuthStore.js";

function PublicRoutes () {
  const isAuthentic = AuthStore((state) => state.isAuthentic)
  
  return (
    isAuthentic ? <Navigate to="/dashboard" replace/> : <Outlet/>
  );
}

export default PublicRoutes;