import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import AuthService from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const { login, isAuthenticated } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const data = await AuthService.login({ email, password });

            login({
                user: data.user,
                token: data.token
            });

            navigate("/dashboard");

            console.log("Login successful:", data);    
        }
        catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>

            <h1>Launch Management</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );

}

export default Login;