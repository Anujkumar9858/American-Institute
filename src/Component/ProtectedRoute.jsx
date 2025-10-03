// src/Component/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { role } = useAuth();

  // agar user login nahi hai
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // agar allowedRoles pass kiya hai aur role usme nahi hai
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // agar sab ok hai
  return children;
}
