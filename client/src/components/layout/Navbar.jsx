import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <header className="bg-white border-b px-6 py-4 flex justify-end items-center">

            <div className="flex items-center gap-4">

                <span>

                    {user?.name}

                </span>

                <button

                    onClick={logout}

                    className="bg-red-500 text-white px-4 py-2 rounded"

                >
                    Logout
                </button>

            </div>

        </header>

    );

}

export default Navbar;