import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/app";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  
  console.log("ProtectedRoute - Authentication status:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("ProtectedRoute - Redirecting to login");
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};