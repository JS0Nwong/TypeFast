import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import useStore from "../store";

export default function PublicRoute({ Component }) {
    const { currentUser } = useAuth()
    return !currentUser ? <Component /> : <Navigate to="/boards" replace />;
}