import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const BlockHighlights = () => {
    return (
        <Flex justifyContent={"center"} gap={"1rem"} width={"container.md"}>
            <Link href={"/search?type=restaurant"}>
                <Box flex={1} borderRadius={"0.3rem"} backgroundColor={"gray.50"} height={"20rem"} cursor={"pointer"}>
                    <Text
                        bg={"blue.400"}
                        color={"gray.50"}
                        borderRadius={"0.3rem 0.3rem 0 0"}
                        padding={"1rem"}
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                    >
                        Restaurant
                    </Text>
                </Box>
            </Link>

            <Link href={"/search?type=market"}>
                <Box flex={1} borderRadius={"0.3rem"} backgroundColor={"gray.50"} height={"20rem"} cursor={"pointer"}>
                    <Text
                        bg={"blue.400"}
                        color={"gray.50"}
                        borderRadius={"0.3rem 0.3rem 0 0"}
                        padding={"1rem"}
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                    >
                        Market
                    </Text>
                </Box>
            </Link>
        </Flex>
    );
};

const Index = () => {
    return (
        <Container maxW="container.xl" padding={"1.2rem"} display={"flex"} justifyContent={"center"}>
            <BlockHighlights />
        </Container>
    );
};

export default Index;
