"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Container, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
    return (
        <>
            <Header />

            <Container maxW="container.xl" padding={"1.2rem"} display={"flex"} justifyContent={"center"}>
                <Flex justifyContent={"center"} gap={"1rem"} width={"container.md"} minHeight={"calc(100vh - 172px)"}>
                    <Link href={"/"}>
                        <Flex
                            w={"52"}
                            rounded={"xl"}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                            h={"56"}
                            cursor={"pointer"}
                            bg={"black"}
                            borderWidth={"0.1rem"}
                            borderColor={"blue.100"}
                        ></Flex>
                    </Link>
                </Flex>
            </Container>

            <Footer />
        </>
    );
};

export default Page;
