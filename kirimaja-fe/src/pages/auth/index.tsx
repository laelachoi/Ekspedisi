import { Navigate } from "react-router-dom";

export default function AuthPage() {
	// Redirect to login by default
	return <Navigate to="/auth/login" replace />;
}
