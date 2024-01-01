"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Header from "@/components/header";
import CardCategory from "@/components/card-category";
import { list } from "@/requests/category.request";
import { list as listProducts } from "@/requests/product.request";
import toast from "react-hot-toast";
import axios, { HttpStatusCode } from "axios";
import { CategoryType, ProductType } from "@/types/entity/entity.type";
import LoadingSpinner from "@/components/loading-spinner";
import CardProduct from "@/components/card-product";
import useDebounce from "@/hooks/debounce";

const Page: NextPage = () => {
    const [filter, setFilter] = useState<{ search: string; id_category: number | null; page: number }>({
        search: "",
        id_category: null,
        page: 1
    });
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [products, setProducts] = useState<{ data: ProductType[]; count: number }>({
        data: [],
        count: 0
    });
    const [loading, setLoading] = useState<boolean>(false);

    const last_page = Math.ceil(products.count / 20);
    const array_page = Array.from({ length: last_page }, (_, index) => index + 1);

    const debounced_input_value = useDebounce(filter.search, 500);

    useEffect(() => {
        (async () => {
            try {
                const response = await list();

                if (response.status !== HttpStatusCode.Ok) {
                    return toast.error(response.data.message);
                }

                setCategories(response.data);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    return toast.error(error.response?.data?.message ?? "An error has occurred");
                } else {
                    return toast.error("An error has occurred");
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await listProducts(filter);

                if (response.status !== HttpStatusCode.Ok) {
                    return toast.error(response.data.message);
                }

                setProducts(response.data);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    return toast.error(error.response?.data?.message ?? "An error has occurred");
                } else {
                    return toast.error("An error has occurred");
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [filter.id_category, debounced_input_value, filter.page]);

    return (
        <>
            <Header />

            <div className="w-full h-40 bg-[url('/images/meal.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="container mx-auto h-screen">
                    <div className="pt-12 flex justify-center items-center gap-3 p-3">
                        <input
                            className="rounded-md border-none text-gray-800 w-96 bg-white h-10 pl-2 pr-2"
                            type="text"
                            placeholder="Search..."
                            value={filter.search}
                            onChange={(e) => setFilter((ant) => ({ ...ant, search: e.target.value }))}
                        />
                    </div>
                </div>
            </div>

            <LoadingSpinner loading={loading}>
                <div className="container mx-auto mt-6 flex justify-center gap-6 px-4">
                    {categories.map((category) => (
                        <CardCategory
                            key={category.id}
                            category={category}
                            filter_category={filter.id_category}
                            setFilterCategory={(e) => setFilter((ant) => ({ ...ant, id_category: ant.id_category === e ? null : e }))}
                        />
                    ))}
                </div>

                {products.data.length > 0 ? (
                    <>
                        <div className="container mx-auto mt-6 px-4">
                            <p className="text-gray-100 text-sm">
                                Found {products.count} {products.count === 1 ? "product" : "products"}
                            </p>
                        </div>

                        <div className="container mx-auto mt-4 grid grid-cols-1 gap-4 px-4 lg:grid-cols-2">
                            {products.data.map((product) => (
                                <CardProduct key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-3 mt-7 mb-8">
                            {filter.page > 1 && (
                                <FaAnglesLeft
                                    className="text-gray-400 cursor-pointer"
                                    size={20}
                                    onClick={() => setFilter((ant) => ({ ...ant, page: 1 }))}
                                />
                            )}

                            {array_page
                                .filter((page) => page < filter.page && page > filter.page - 3)
                                .map((page, key) => (
                                    <button
                                        type="button"
                                        key={key}
                                        className="text-gray-400 text-xl cursor-pointer"
                                        onClick={() => setFilter((ant) => ({ ...ant, page }))}
                                    >
                                        {page}
                                    </button>
                                ))}

                            <p className="text-gray-50 text-xl">{filter.page}</p>

                            {array_page
                                .filter((page) => page > filter.page && page < filter.page + 3)
                                .map((page, key) => (
                                    <button
                                        type="button"
                                        key={key}
                                        className="text-gray-400 text-xl cursor-pointer"
                                        onClick={() => setFilter((ant) => ({ ...ant, page }))}
                                    >
                                        {page}
                                    </button>
                                ))}

                            {filter.page < last_page && (
                                <FaAnglesRight
                                    className="text-gray-400 cursor-pointer"
                                    size={20}
                                    onClick={() => setFilter((ant) => ({ ...ant, page: last_page }))}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-50 text-center text-lg mt-14">No products</p>
                )}
            </LoadingSpinner>
        </>
    );
};

export default Page;
