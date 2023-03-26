import { Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Index = () => {
    return (
        <Container maxW="container.xl" padding={"1.2rem"} display={"flex"} justifyContent={"center"}>
            <Flex justifyContent={"center"} gap={"1rem"} width={"container.md"} minHeight={"calc(100vh - 291px)"}>
                <Link href={"/search?type=restaurant"}>
                    <Flex
                        w={"64"}
                        borderRadius={"0.3rem"}
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                        backgroundColor={"gray.50"}
                        height={"12rem"}
                        cursor={"pointer"}
                    >
                        <Text
                            bg={"blue.400"}
                            color={"gray.50"}
                            borderRadius={"0.3rem 0.3rem 0 0"}
                            padding={"0.5rem"}
                            fontSize={"1.1rem"}
                            fontWeight={"bold"}
                            fontStyle={"oblique"}
                        >
                            Restaurant
                        </Text>

                        <Text color={"green.400"} padding={"0.5rem"} fontSize={"1.1rem"} fontWeight={"extrabold"} textAlign={"end"}>
                            Restaurant
                        </Text>
                    </Flex>
                </Link>
            </Flex>
        </Container>
    );
};

export default Index;
