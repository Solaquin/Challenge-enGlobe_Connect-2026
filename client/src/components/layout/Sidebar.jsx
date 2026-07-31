import { NavLink, Link } from "react-router-dom";
import {
    FiHome,
    FiFolder,
    FiCalendar,
    FiPlus
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    return (

        <aside className="w-64 bg-white border-r flex flex-col">

            {/* Logo */}

            <div className="px-6 py-6 border-b">

                <h1 className="text-2xl font-bold text-violet-600">

                    LaunchFlow

                </h1>

                <p className="text-gray-500 text-sm">

                    Campaign Management

                </p>

            </div>

            {/* Botón */}

            {
                user?.role === "creator" && (
                    <div className="p-5">

                    <Link
                        to="/dashboard/launches/new"
                        className="
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-violet-600
                            text-white
                            py-3
                            hover:bg-violet-700
                            transition
                        "
                    >

                    <FiPlus />

                        New Launch

                    </Link>

                    </div>
                )

            }

            {/* Menú */}

            <nav className="px-3 flex-1 p-5">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 mb-2
                        ${
                            isActive
                                ? "bg-violet-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                        }`
                    }
                >

                    <FiHome />

                    Dashboard

                </NavLink>

                <NavLink
                    to="/dashboard/calendar"
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 mb-2
                        ${
                            isActive
                                ? "bg-violet-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                        }`
                    }
                >

                <FiCalendar />

                    Calendar

                </NavLink>

                <NavLink
                    to="/dashboard/archive"
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3
                        ${
                            isActive
                                ? "bg-violet-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                        }`
                    }
                >

                    <FiFolder />

                    Archive

                </NavLink>

            </nav>

        </aside>

    );

}

export default Sidebar;