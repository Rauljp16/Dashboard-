import { Navigate } from "react-router-dom";

function PrivateRoute({ children, auth }) {
  //   const navigate = useNavigate();
  console.log(auth);
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
