"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { categories } from "./util";
import { IoArrowForward } from "react-icons/io5";

const Card = () => {
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
            ></Flex>
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

    return (
        <>
            <Header />

            <Flex>
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

                        <Flex justifyContent={"flex-start"} alignItems={"center"} gap={"2rem"}>
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

                        <Card />
                    </Flex>
                </Container>

                <MyOrder />
            </Flex>

            <Footer />
        </>
    );
};

export default Page;
