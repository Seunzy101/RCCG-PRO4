import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const branchInfo = JSON.parse(
    localStorage.getItem("branchInfo")
  );



  // NOT LOGGED IN
  if (!branchInfo?.token) {

    return <Navigate to="/login" replace />;
  }



  // LOGGED IN
  return children;
};

export default ProtectedRoute;
