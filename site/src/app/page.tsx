"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Category = (props: { name: string; icon: IconDefinition }) => {
    return (
        <Box bg={"gray.800"} boxShadow={"xl"} rounded={"xl"}>
            <FontAwesomeIcon icon={props.icon} size={"2x"} />

            <Text>{props.name}</Text>
        </Box>
    );
};

const Page: NextPage = () => {
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

                    <Card />
                </Flex>
            </Container>

            <Footer />
        </>
    );
};

export default Page;
