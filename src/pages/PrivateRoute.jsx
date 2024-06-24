import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";

function PrivateRoute({ children }) {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
