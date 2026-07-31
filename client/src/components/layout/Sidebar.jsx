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

    const navLinkClass = ({ isActive }) =>
        `
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        mb-2
        text-sm
        font-medium
        transition-all
        duration-200
        ${
            isActive
                ? "bg-violet-50 text-violet-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1"
        }
        `;

    return (

        <aside className="flex w-72 flex-col border-r border-gray-200 bg-white">

            {/* Logo */}

            <div className="border-b border-gray-200 px-6 py-6">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-violet-600
                            text-xl
                            font-bold
                            text-white
                        "
                    >
                        L
                    </div>

                    <div>

                        <h1 className="text-xl font-bold text-gray-900">

                            LaunchFlow

                        </h1>

                        <p className="text-sm text-gray-500">

                            Campaign Management

                        </p>

                    </div>

                </div>

            </div>

            {/* Botón */}

            {

                user?.role === "creator" && (

                    <div className="p-5">

                        <Link

                            to="/dashboard/launches/new"

                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-violet-600
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition-all
                                duration-200
                                hover:bg-violet-700
                                hover:shadow-lg
                                hover:shadow-violet-200
                            "

                        >

                            <FiPlus size={18} />

                            New Launch

                        </Link>

                    </div>

                )

            }

            {/* Navigation */}

            <nav className="flex-1 px-5">

                <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">

                    Navigation

                </p>

                <NavLink

                    to="/dashboard"

                    end

                    className={navLinkClass}

                >

                    <FiHome size={18} />

                    Dashboard

                </NavLink>

                <NavLink

                    to="/dashboard/calendar"

                    className={navLinkClass}

                >

                    <FiCalendar size={18} />

                    Calendar

                </NavLink>

                <NavLink

                    to="/dashboard/archive"

                    className={navLinkClass}

                >

                    <FiFolder size={18} />

                    Archive

                </NavLink>

            </nav>

            {/* Footer */}

            <div className="border-t border-gray-200 px-6 py-5">

                <div className="text-sm">

                    <p className="font-medium text-gray-900">

                        {user?.name}

                    </p>

                    <p className="text-gray-500">

                        {user?.role}

                    </p>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;