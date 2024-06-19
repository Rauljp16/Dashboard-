import { useNavigate } from "react-router-dom";

function PrivateRoute({ children, auth }) {
  const navigate = useNavigate();
  return auth ? children : navigate("/login");
}

export default PrivateRoute;
