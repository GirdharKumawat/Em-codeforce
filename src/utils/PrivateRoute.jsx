import { Navigate } from "react-router-dom";
import { useState } from "react";
const PrivateRoute = ({ Component }) => {
 
const  isAuthenticated = localStorage.getItem("accessToken") === null ? false : true;
  
 
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;