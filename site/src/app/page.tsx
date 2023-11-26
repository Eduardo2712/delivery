"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Header from "@/components/header";
import CardCategory from "@/components/card-category";

const Page: NextPage = () => {
    const [filter, setFilter] = useState({
        search: "",
        category: null
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {}, []);

    return (
        <>
            <Header />

            <div
                className="w-full h-48"
                style={{ backgroundImage: "url('/images/meal.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
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

            <div className="container mx-auto mt-4">
                <CardCategory />
            </div>
        </>
    );
};

export default Page;
