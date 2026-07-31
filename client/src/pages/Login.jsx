import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { toast } from "react-hot-toast";

import AuthService from "../services/authService";
import { useAuth } from "../context/AuthContext";


function Login() {

    const { login, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    if (isAuthenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const data = await AuthService.login({

                email,
                password

            });

            login({

                user: data.user,
                token: data.token

            });

            toast.success("Welcome back!");

            navigate("/dashboard");

        }
        catch (error) {

            toast.error(

                error.response?.data?.message ??
                "Invalid email or password."

            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-gray-50
                p-6
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-8
                    shadow-sm
                "
            >

                <div className="mb-8 text-center">

                    <div
                        className="
                            mx-auto
                            mb-4
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-violet-100
                            text-violet-600
                        "
                    >

                        <FaRocket className="text-3xl" />

                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        Launch Management

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Sign in to continue

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">

                            Email

                        </label>

                        <div className="relative">

                            <FiMail
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <input

                                type="email"

                                value={email}

                                onChange={(e) =>

                                    setEmail(e.target.value)

                                }

                                placeholder="Enter your email"

                                required

                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    py-3
                                    pl-10
                                    pr-4
                                    focus:border-violet-500
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-violet-100
                                "

                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">

                            Password

                        </label>

                        <div className="relative">

                            <FiLock
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <input

                                type="password"

                                value={password}

                                onChange={(e) =>

                                    setPassword(e.target.value)

                                }

                                placeholder="Enter your password"

                                required

                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    py-3
                                    pl-10
                                    pr-4
                                    focus:border-violet-500
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-violet-100
                                "

                            />

                        </div>

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="
                            w-full
                            rounded-xl
                            bg-violet-600
                            py-3
                            font-medium
                            text-white
                            transition-colors
                            hover:bg-violet-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "

                    >

                        {loading ? "Signing in..." : "Sign In"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;