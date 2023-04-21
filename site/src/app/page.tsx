"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { categories } from "./util";

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

const Page: NextPage = () => {
    const [selected, setSelected] = useState<number>(1);

    return (
        <>
            <Header />

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
                                    borderRadius={"2.3rem"}
                                    boxShadow={"lg"}
                                    flexDirection={"column"}
                                    gap={"0.4rem"}
                                    cursor={"pointer"}
                                    onClick={() => setSelected(category.id)}
                                >
                                    <Box backgroundColor={"gray.50"} padding={"1rem"} rounded={"xl"} boxShadow={"lg"}>
                                        <category.icon fontSize={"2.1rem"} color={selected === category.id ? "#63b3ed" : "#2d3748"} />
                                    </Box>

                                    <Text textAlign={"center"} color={selected === category.id ? "gray.50" : "gray.700"} fontWeight={"medium"}>
                                        {category.title}
                                    </Text>
                                </Flex>
                            );
                        })}
                    </Flex>

                    <Card />
                </Flex>

                <Flex width={"10rem"} borderLeft={"gray.200"} borderLeftWidth={"0.1rem"} padding={"2rem"}>
                    <Text fontSize={"xl"} color={"gray.500"} marginBottom={"3rem"}>
                        Order
                    </Text>
                </Flex>
            </Container>

            <Footer />
        </>
    );
};

export default Page;
