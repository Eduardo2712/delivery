"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Container, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "./util";
import { IoArrowForward } from "react-icons/io5";
import { listProducts } from "@/requests/product.request";
import { toastParams } from "@/utils/function";
import { Product } from "@/types";
import Image from "next/image";

const Card = (props: { product: Product }) => {
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
            </Flex>
        </Link>
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
    const [selected, setSelected] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    const toast = useToast();

    useEffect(() => {
        searchProducts();
    }, [selected]);

    const searchProducts = async () => {
        setLoading(true);

        try {
            const response = await listProducts({ id_type: selected });

            const response_json = await response.json();

            if (response.status !== 201) {
                return toast({ ...toastParams, title: "Error", description: response_json.message, status: "error" });
            }

            setProducts(response_json);
        } catch (error: any) {
            toast({ ...toastParams, title: "Error", description: error ?? "An error has occurred", status: "error" });
        } finally {
            setLoading(false);
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
                        <Flex justifyContent={"space-between"} alignItems={"center"}></Flex>

                        <Text fontSize={"lg"} color={"gray.500"}>
                            Category
                        </Text>

                        <Flex justifyContent={"space-between"} alignItems={"center"} gap={"2rem"}>
                            {categories.map((category) => {
                                return (
                                    <Flex
                                        key={category.id}
                                        backgroundColor={selected === category.id ? "blue.300" : "gray.50"}
                                        padding={"1rem 2rem"}
                                        width={"9rem"}
                                        borderRadius={"2.3rem"}
                                        boxShadow={"lg"}
                                        flexDirection={"column"}
                                        gap={"0.4rem"}
                                        cursor={"pointer"}
                                        onClick={() => setSelected(category.id)}
                                    >
                                        <Flex
                                            backgroundColor={"gray.50"}
                                            padding={"1rem"}
                                            rounded={"xl"}
                                            boxShadow={"lg"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                        >
                                            <category.icon fontSize={"2.1rem"} color={selected === category.id ? "#63b3ed" : "#2d3748"} />
                                        </Flex>

                                        <Text textAlign={"center"} color={selected === category.id ? "gray.50" : "gray.700"} fontWeight={"medium"}>
                                            {category.title}
                                        </Text>
                                    </Flex>
                                );
                            })}
                        </Flex>

                        {!loading ? (
                            <>
                                <Flex wrap={"wrap"} gap={"2rem"} justifyContent={"space-between"} marginTop={"1.5rem"} marginBottom={"2.5rem"}>
                                    {products.map((product) => {
                                        return <Card key={product.id} product={product} />;
                                    })}
                                </Flex>
                            </>
                        ) : (
                            <Flex justifyContent={"center"} marginTop={"4rem"}>
                                <Spinner size="xl" color="blue.300" thickness="0.3rem" />
                            </Flex>
                        )}
                    </Flex>
                </Container>

                <MyOrder />
            </Flex>

            <Footer />
        </>
    );
};

export default Page;
