import { logout } from "@/store/auth/auth.slice";
import { RootState } from "@/store/store";
import { AdminStoreType } from "@/types/store/auth.type";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { FaBars, FaCirclePlus, FaGauge, FaPlateWheat, FaUser, FaUsers, FaUtensils, FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

const Sidebar = ({ children }: { children: ReactNode }) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    const dispatch = useDispatch();

    const router = useRouter();

    const pathname = usePathname();

    const user = useSelector<RootState, AdminStoreType | null>((state) => state.auth.user);

    const logoutSystem = () => {
        dispatch(logout());

        router.push("/auth/login");
    };

    return (
        <>
            <Head>
                <title>Test</title>
            </Head>

            <div className="min-h-screen bg-gray-700">
                <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-3 py-3 lg:px-5 lg:pl-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start">
                                <button
                                    type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                >
                                    <FaBars className="text-white cursor-pointer" size={22} onClick={() => setOpenSidebar((previous) => !previous)} />
                                </button>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center ml-3">
                                    <div>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 h-7 w-7"
                                            onClick={() => setOpenMenu((previous) => !previous)}
                                        >
                                            {user?.picture ? (
                                                <div
                                                    className="bg-cover bg-no-repeat bg-center w-7 h-7 rounded-full"
                                                    style={{ backgroundImage: `url(${user.picture.url})` }}
                                                />
                                            ) : (
                                                <FaUser className="text-white" size={16} />
                                            )}
                                        </button>
                                    </div>

                                    {openMenu && (
                                        <div className="z-50 text-base absolute right-2 top-14 list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                            <div className="px-4 py-3">
                                                <p className="text-sm text-gray-900 dark:text-white">{user?.adm_name}</p>

                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">{user?.email}</p>
                                            </div>
                                            <ul className="py-1">
                                                <li>
                                                    <button
                                                        onClick={logoutSystem}
                                                        className={
                                                            "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                                        }
                                                    >
                                                        Sign out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <aside
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                        openSidebar ? "-translate-x-full" : ""
                    } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                >
                    <FaX className="text-white text-xl mt-2 ml-3 cursor-pointer sm:hidden" onClick={() => setOpenSidebar((previous) => !previous)} />

                    <Link href="/">
                        <p className="mx-0 text-white font-extrabold italic text-2xl pt-4 text-center">Delivery</p>
                    </Link>

                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 pt-14">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link
                                    href="/"
                                    className={`${
                                        pathname === "/" ? "bg-gray-700" : ""
                                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                                >
                                    <FaGauge className="text-white" />

                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/admin"
                                    className={`${
                                        pathname.includes("admin") ? "bg-gray-700" : ""
                                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                                >
                                    <FaUser className="text-white" />

                                    <span className="ml-3">Admins</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/user"
                                    className={`${
                                        pathname.includes("user") ? "bg-gray-700" : ""
                                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                                >
                                    <FaUsers className="text-white" />

                                    <span className="ml-3">Users</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/product"
                                    className={`${
                                        pathname.includes("product") ? "bg-gray-700" : ""
                                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                                >
                                    <FaPlateWheat className="text-white" />

                                    <span className="ml-3">Products</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/extra"
                                    className={`${
                                        pathname.includes("extra") ? "bg-gray-700" : ""
                                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                                >
                                    <FaCirclePlus className="text-white" />

                                    <span className="ml-3">Product extras</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/order"
                                    className={`${
                                        pathname.includes("order") ? "bg-gray-700" : ""
                                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                                >
                                    <FaUtensils className="text-white" />

                                    <span className="ml-3">Orders</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="p-4 sm:ml-64">{children}</div>
            </div>
        </>
    );
};

export default Sidebar;
