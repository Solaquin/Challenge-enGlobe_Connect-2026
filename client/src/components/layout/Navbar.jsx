import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { getNavbarInfo } from "../../constants/navbarConfig";

function Navbar() {

    const { user, logout } = useAuth();

    const location = useLocation();

    const page = getNavbarInfo(location.pathname);

    return (

        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-2.5">

            <div>

                <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-400">

                    {page.breadcrumb.map((item, index) => (

                        <div
                            key={item}
                            className="flex items-center gap-2"
                        >

                            {index > 0 && (

                                <span>/</span>

                            )}

                            <span>

                                {item}

                            </span>

                        </div>

                    ))}

                </div>

                <h1 className="text-2xl font-bold text-gray-900">

                    {page.title}

                </h1>

                {

                    page.description && (

                        <p className="mt-1 text-sm text-gray-500">

                            {page.description}

                        </p>

                    )

                }

            </div>

            <div className="flex items-center gap-4">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-violet-100
                            text-sm
                            font-semibold
                            text-violet-700
                        "
                    >

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <p className="text-xs text-gray-500">

                            Welcome back

                        </p>

                        <p className="font-medium text-gray-900">

                            {user?.name}

                        </p>

                    </div>

                </div>

                <button

                    onClick={logout}

                    className="
                        rounded-lg
                        border
                        border-gray-200
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        transition-all
                        duration-200
                        hover:border-violet-600
                        hover:bg-violet-600
                        hover:text-white
                    "

                >

                    Logout

                </button>

            </div>

        </header>

    );

}

export default Navbar;