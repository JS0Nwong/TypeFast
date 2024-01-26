import { Navigate } from "react-router-dom";
import useStore from './store'
import { useAuth } from "../hooks/AuthProvider";

export default function ProtectedRoute({ Component }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Component /> : <Navigate to="/login" replace />
}
