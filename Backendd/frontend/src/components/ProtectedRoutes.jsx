import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";

export default function ProtectedRoute({ component: Component, allowedRoles }) {
  const { user } = useAppContext();
  const [, navigate] = useLocation();

  useEffect(() => {
    // If no user is logged in or the user's role is not allowed, redirect.
    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
      navigate("/admin-login");
    }
  }, [user, allowedRoles, navigate]);

  // If the check fails, we return null while the useEffect redirects.
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <Component />;
}
