import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  const decoded = jwtDecode(token);

  if (decoded.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;