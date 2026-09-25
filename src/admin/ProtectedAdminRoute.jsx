import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const isLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;