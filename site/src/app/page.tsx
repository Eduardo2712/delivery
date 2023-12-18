"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Header from "@/components/header";
import CardCategory from "@/components/card-category";
import { list } from "@/requests/category.request";
import { list as listProducts } from "@/requests/product.request";
import toast from "react-hot-toast";
import axios, { HttpStatusCode } from "axios";
import { CategoryType, ProductType } from "@/types/entity/entity.type";
import LoadingSpinner from "@/components/loading-spinner";
import CardProduct from "@/components/card-product";

const Page: NextPage = () => {
    const [filter, setFilter] = useState<{ search: string; id_category: number | null }>({
        search: "",
        id_category: null
    });
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
    }, []);

    return (
        <>
            <Header />

            <div className="w-full h-48 bg-[url('/images/meal.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="container mx-auto h-screen">
                    <div className="pt-12 flex justify-center items-center gap-3 p-3">
                        <input
                            className="rounded-md border-none text-gray-800 w-96 bg-white h-10 pl-2 pr-2"
                            type="text"
                            placeholder="Search..."
                            value={filter.search}
                            onChange={(e) => setFilter((ant) => ({ ...ant, search: e.target.value }))}
                        />

                        <button type="submit" className="bg-white p-1 rounded-md h-10 w-10 flex justify-center items-center hover:bg-gray-200">
                            <FaMagnifyingGlass size={20} className="text-gray-800" />
                        </button>
                    </div>
                </div>
            </div>

            <LoadingSpinner loading={loading}>
                <div className="container mx-auto mt-4 flex justify-center gap-6 px-4">
                    {categories.map((category) => (
                        <CardCategory
                            key={category.id}
                            category={category}
                            filter_category={filter.id_category}
                            setFilterCategory={(e) => setFilter((ant) => ({ ...ant, category: e }))}
                        />
                    ))}
                </div>

                <div className="container mx-auto mt-8 grid grid-cols-1 gap-4 px-4 lg:grid-cols-2">
                    {products.length > 0 ? (
                        products.map((product) => <CardProduct key={product.id} product={product} />)
                    ) : (
                        <p className="text-gray-50">No products</p>
                    )}
                </div>
            </LoadingSpinner>
        </>
    );
};

export default Page;
