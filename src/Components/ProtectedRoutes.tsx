import { Navigate, Outlet } from "react-router";
import AuthStore from "../store/AuthStore.js";

function ProtectedRoutes() {
  const isAuthentic = AuthStore((state) => state.isAuthentic);
  return (
    isAuthentic ? <Outlet/> : <Navigate to="/login" replace/>
  );
}

export default ProtectedRoutes;