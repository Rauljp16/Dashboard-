import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error("AuthContext is undefined");
    return <Navigate to="/login" />;
  }

  const { state } = authContext;

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
