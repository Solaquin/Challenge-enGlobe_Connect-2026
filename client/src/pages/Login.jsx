import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { toast } from "react-hot-toast";

import AuthService from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const { login, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

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
                min-h-screen
                bg-gradient-to-br
                from-slate-50
                via-white
                to-violet-50
                flex
                items-center
                justify-center
                p-6
            "
        >

            <div
                className="
                    w-full
                    max-w-6xl
                    grid
                    lg:grid-cols-2
                    gap-10
                    items-center
                "
            >

                {/* FORM */}

                <div>

                    <div className="mb-10">

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    h-12
                                    w-12
                                    rounded-xl
                                    bg-violet-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <FaRocket />

                            </div>

                            <div>

                                <h1 className="text-2xl font-bold">

                                    LaunchFlow

                                </h1>

                                <p className="text-gray-500">

                                    Campaign Management Platform

                                </p>

                            </div>

                        </div>

                    </div>

                    <div
                        className="
                            rounded-3xl
                            bg-white
                            border
                            border-gray-200
                            shadow-sm
                            p-10
                        "
                    >

                        <h2 className="text-3xl font-bold">

                            Welcome back

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Sign in to manage your product launches.

                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >

                            <div>

                                <label className="block mb-2 font-medium">

                                    Email

                                </label>

                                <div className="relative">

                                    <FiMail
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input

                                        type="email"

                                        required

                                        value={email}

                                        onChange={(e) =>

                                            setEmail(e.target.value)

                                        }

                                        placeholder="name@company.com"

                                        className="
                                            w-full
                                            h-12
                                            rounded-xl
                                            border
                                            border-gray-300
                                            pl-11
                                            pr-4
                                            focus:ring-4
                                            focus:ring-violet-100
                                            focus:border-violet-500
                                            outline-none
                                        "

                                    />

                                </div>

                            </div>

                            <div>

                                <div
                                    className="
                                        flex
                                        justify-between
                                        mb-2
                                    "
                                >

                                    <label className="font-medium">

                                        Password

                                    </label>

                                    <button
                                        type="button"
                                        className="
                                            text-sm
                                            text-violet-600
                                        "
                                    >

                                        Forgot password?

                                    </button>

                                </div>

                                <div className="relative">

                                    <FiLock
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input

                                        type={

                                            showPassword

                                                ? "text"

                                                : "password"

                                        }

                                        required

                                        value={password}

                                        onChange={(e) =>

                                            setPassword(

                                                e.target.value

                                            )

                                        }

                                        placeholder="••••••••"

                                        className="
                                            w-full
                                            h-12
                                            rounded-xl
                                            border
                                            border-gray-300
                                            pl-11
                                            pr-12
                                            focus:ring-4
                                            focus:ring-violet-100
                                            focus:border-violet-500
                                            outline-none
                                        "

                                    />

                                    <button

                                        type="button"

                                        onClick={() =>

                                            setShowPassword(

                                                !showPassword

                                            )

                                        }

                                        className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "

                                    >

                                        {

                                            showPassword

                                                ? <FiEyeOff />

                                                : <FiEye />

                                        }

                                    </button>

                                </div>

                            </div>

                            <button

                                type="submit"

                                disabled={loading}

                                className="
                                    w-full
                                    h-12
                                    rounded-xl
                                    bg-violet-600
                                    hover:bg-violet-700
                                    text-white
                                    font-semibold
                                    transition
                                    flex
                                    justify-center
                                    items-center
                                    gap-2
                                    disabled:opacity-60
                                "

                            >

                                {

                                    loading

                                        ? "Signing in..."

                                        : <>

                                            Sign In

                                            <FiArrowRight />

                                        </>

                                }

                            </button>

                        </form>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="hidden lg:block">

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            h-[700px]
                            shadow-xl
                        "
                    >

                        <img

                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"

                            alt="Office"

                            className="
                                w-full
                                h-full
                                object-cover
                            "

                        />

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/60
                                to-transparent
                            "
                        />

                        <div
                            className="
                                absolute
                                bottom-8
                                left-8
                                right-8
                                space-y-4
                            "
                        >

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/90
                                    backdrop-blur
                                    p-6
                                "
                            >

                                <div className="text-4xl font-bold">

                                    24

                                </div>

                                <div className="text-gray-600">

                                    Active Launches

                                </div>

                            </div>

                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        rounded-2xl
                                        bg-white/90
                                        p-5
                                    "
                                >

                                    <div className="text-2xl font-bold">

                                        8

                                    </div>

                                    <div className="text-sm text-gray-500">

                                        Markets

                                    </div>

                                </div>

                                <div
                                    className="
                                        rounded-2xl
                                        bg-white/90
                                        p-5
                                    "
                                >

                                    <div className="text-2xl font-bold">

                                        96%

                                    </div>

                                    <div className="text-sm text-gray-500">

                                        Success Rate

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;