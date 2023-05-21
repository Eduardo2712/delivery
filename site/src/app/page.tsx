"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Container, Flex, Input, InputGroup, InputLeftElement, Skeleton, Text, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { categories } from "./util";
import { IoArrowForward, IoSearch } from "react-icons/io5";
import { listProducts } from "@/requests/product.request";
import { toastParams } from "@/utils/function";
import { Product } from "@/types";
import Image from "next/image";

const Card = (props: { product: Product; loading: boolean }) => {
    return (
        <Link href={"/"}>
            <Flex
                w={"52"}
                rounded={"xl"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                h={"56"}
                cursor={"pointer"}
                bg={"gray.50"}
                boxShadow={"xl"}
                padding={"0.5rem"}
            >
                <Skeleton isLoaded={!props.loading}>
                    <Flex justifyContent={"center"}>
                        <Image
                            src={props.product.photo.pho_path}
                            alt={`Image ${props.product.pro_name}`}
                            width={200}
                            height={200}
                            style={{ borderRadius: "1rem" }}
                        />
                    </Flex>

                    <Text color={"gray.600"} fontWeight={"medium"}>
                        {props.product.pro_name}
                    </Text>

                    <Text color={"blue.400"} textAlign={"center"} marginTop={"1rem"} fontWeight={"medium"}>
                        {props.product.pro_price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                    </Text>
                </Skeleton>
            </Flex>
        </Link>
    );
};

const Pagination = (props: { page: number; setPage: Dispatch<SetStateAction<number>>; products_total: number }) => {
    const products_per_page = 20;
    const number_of_pages = Math.ceil(props.products_total / products_per_page);

    const pages = () => {
        const list = [];

        for (let i = 1; i <= number_of_pages; i++) {
            list.push(
                <Text
                    key={i}
                    cursor={"pointer"}
                    onClick={() => props.setPage(i)}
                    fontSize={"2xl"}
                    color={props.page === i ? "blue.300" : "gray.500"}
                    fontWeight={props.page === i ? "extrabold" : "bold"}
                >
                    {i}
                </Text>
            );
        }

        return list;
    };

    return (
        <Flex justifyContent={"center"} gap={"1rem"}>
            {pages()}
        </Flex>
    );
};

const MyOrder = () => {
    return (
        <Flex width={"20rem"} borderLeft={"gray.200"} borderLeftWidth={"0.1rem"} padding={"2rem"} flexDirection={"column"}>
            <Flex gap={"0.3rem"}>
                <Text fontSize={"lg"} color={"gray.900"} fontWeight={"bold"} marginBottom={"3rem"}>
                    My
                </Text>

                <Text fontSize={"lg"} color={"gray.500"} fontWeight={"bold"} marginBottom={"3rem"}>
                    Order
                </Text>
            </Flex>

            <Flex justifyContent={"flex-end"}>
                <Button
                    type="button"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    rounded={"xl"}
                    display={"flex"}
                    padding={"1.5rem 2rem 1.5rem 2rem"}
                    width={"100%"}
                    fontSize={"1.1rem"}
                    bg={"green.500"}
                    color={"white"}
                    _hover={{
                        bg: "green.600"
                    }}
                >
                    Next
                    <IoArrowForward fontSize={"1.2rem"} color={"#ffffff"} />
                </Button>
            </Flex>
        </Flex>
    );
};

const Page: NextPage = () => {
    const [selected, setSelected] = useState<number[]>(() => {
        const array_categories: number[] = [];

        categories.forEach((category) => {
            array_categories.push(category.id);
        });

        return array_categories;
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<{ count: number; rows: Product[] }>({ count: 0, rows: [] });
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const toast = useToast();

    useEffect(() => {
        searchProducts();
    }, [selected, search, page]);

    const searchProducts = async () => {
        setLoading(true);

        try {
            const data = {
                id_type_array: selected,
                search,
                page
            };

            const response = await listProducts(data);

            if (response.status !== 200) {
                return toast({ ...toastParams, title: "Error", description: response.data.message, status: "error" });
            }

            setData(response.data);
        } catch (error: any) {
            toast({ ...toastParams, title: "Error", description: error ?? "An error has occurred", status: "error" });
        } finally {
            setLoading(false);
        }
    };

    const selectType = (id_type: number) => {
        if (selected.includes(id_type)) {
            setSelected((prev) => prev.filter((a) => a !== id_type));
        } else {
            setSelected((prev) => [...prev, id_type]);
        }
    };

    return (
        <>
            <Header />

            <Flex marginTop={"1rem"} marginBottom={"1rem"}>
                <Container maxW="container.xl" padding={"1.2rem"} display={"flex"} justifyContent={"center"}>
                    <Flex
                        justifyContent={"flex-start"}
                        flexDirection={"column"}
                        gap={"1rem"}
                        width={"container.xl"}
                        minHeight={"calc(100vh - 172px)"}
                        wrap={"wrap"}
                    >
                        <Flex justifyContent={"center"} marginBottom={"1.5rem"}>
                            <InputGroup maxW={"35rem"}>
                                <Input
                                    type={"text"}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    variant="solid"
                                    color={"gray.500"}
                                    _placeholder={{
                                        color: "gray.400"
                                    }}
                                    bg={"gray.200"}
                                    borderRadius={"0.7rem"}
                                ></Input>

                                <InputLeftElement children={<IoSearch color="gray" />} />
                            </InputGroup>
                        </Flex>

                        {Boolean(search.trim()) && (
                            <Flex alignItems={"center"} gap={"0.5rem"}>
                                <Text fontSize={"lg"} color={"gray.500"} fontWeight={"medium"}>
                                    {`Searching for: `}
                                </Text>

                                <Text fontSize={"lg"} color={"gray.500"} fontWeight={"bold"}>
                                    {search}
                                </Text>
                            </Flex>
                        )}

                        <Flex justifyContent={"flex-start"} alignItems={"center"} gap={"2rem"}>
                            {categories.map((category) => {
                                return (
                                    <Flex
                                        key={category.id}
                                        backgroundColor={selected.includes(category.id) ? "blue.300" : "gray.50"}
                                        padding={"1rem 0.5rem"}
                                        width={"7rem"}
                                        borderRadius={"2rem"}
                                        boxShadow={"lg"}
                                        flexDirection={"column"}
                                        gap={"0.4rem"}
                                        cursor={"pointer"}
                                        onClick={() => selectType(category.id)}
                                    >
                                        <Flex
                                            backgroundColor={"gray.50"}
                                            padding={"0.5rem"}
                                            rounded={"xl"}
                                            boxShadow={"lg"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                        >
                                            <category.icon fontSize={"2.1rem"} color={selected.includes(category.id) ? "#63b3ed" : "#2d3748"} />
                                        </Flex>

                                        <Text
                                            textAlign={"center"}
                                            color={selected.includes(category.id) ? "gray.50" : "gray.700"}
                                            fontWeight={"medium"}
                                        >
                                            {category.title}
                                        </Text>
                                    </Flex>
                                );
                            })}
                        </Flex>

                        <Flex wrap={"wrap"} gap={"2rem"} marginTop={"1.5rem"} justifyContent={"flex-start"} marginBottom={"2.5rem"}>
                            {data.rows.map((product) => {
                                return <Card key={product.id} product={product} loading={loading} />;
                            })}
                        </Flex>

                        <Pagination page={page} setPage={setPage} products_total={data.count} />
                    </Flex>
                </Container>

                <MyOrder />
            </Flex>

            <Footer />
        </>
    );
};

export default Page;
