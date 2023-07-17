import { RootState } from "@/store/store";
import { AdminStoreType } from "@/types/store/auth.type";
import Link from "next/link";
import { ReactNode } from "react";
import { FaGauge, FaPlateWheat, FaRightFromBracket, FaUser, FaUsers } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Sidebar = ({ children }: { children: ReactNode }) => {
    const user = useSelector<RootState, AdminStoreType | null>((state) => state.auth.user);

    return (
        <>
            <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 h-7 w-7"
                                    >
                                        {/* <span className="sr-only">Open user menu</span> */}
                                        {user?.picture ? (
                                            <img className="w-8 h-8 rounded-full" src={user.picture.fil_url} alt="user photo" />
                                        ) : (
                                            <FaUser className="text-white" size={17} />
                                        )}
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                href="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Earnings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Sign out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaGauge className="text-white" />

                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaUser className="text-white" />

                                <span className="ml-3">Admins</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaUsers className="text-white" />

                                <span className="ml-3">Users</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaPlateWheat className="text-white" />

                                <span className="ml-3">Products</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaRightFromBracket className="text-white" />

                                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">{children}</div>
        </>
    );
};

export default Sidebar;
