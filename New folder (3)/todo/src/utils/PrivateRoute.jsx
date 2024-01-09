import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import useStore from "../store";

export default function PrivateRoute({ Component }) {
    const { isLoggedIn } = useStore();
    const { currentUser, isLoading } = useAuth()
    return currentUser ? <Component /> : <Navigate to="/" replace/>
}   