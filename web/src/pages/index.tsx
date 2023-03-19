import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const BlockHighlights = () => {
    return (
        <Flex justifyContent={"center"} gap={"1rem"} width={"container.md"} minHeight={"calc(100vh - 291px)"}>
            <Flex flex={1} borderRadius={"0.3rem"} flexDirection={"column"} backgroundColor={"gray.50"} height={"20rem"}>
                <Text
                    bg={"blue.400"}
                    color={"gray.50"}
                    borderRadius={"0.3rem 0.3rem 0 0"}
                    padding={"0.5rem 1rem"}
                    fontSize={"2rem"}
                    fontWeight={"extrabold"}
                    fontStyle={"oblique"}
                >
                    Restaurant
                </Text>

                <Flex justifyContent={"flex-end"} padding={"1rem"} flex={"1"} alignItems={"flex-end"}>
                    <Link href={"/search?type=restaurant"}>
                        <Button
                            color={"gray.50"}
                            backgroundColor={"green.400"}
                            _hover={{ backgroundColor: "green.500" }}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={"0.5rem"}
                            fontSize={"1.1rem"}
                            fontWeight={"bold"}
                        >
                            Go to <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </Link>
                </Flex>
            </Flex>

            <Flex flex={1} borderRadius={"0.3rem"} flexDirection={"column"} backgroundColor={"gray.50"} height={"20rem"}>
                <Text
                    bg={"blue.400"}
                    color={"gray.50"}
                    borderRadius={"0.3rem 0.3rem 0 0"}
                    padding={"0.5rem 1rem"}
                    fontSize={"2rem"}
                    fontWeight={"extrabold"}
                    fontStyle={"oblique"}
                >
                    Market
                </Text>

                <Flex justifyContent={"flex-end"} padding={"1rem"} flex={"1"} alignItems={"flex-end"}>
                    <Link href={"/search?type=market"}>
                        <Button
                            color={"gray.50"}
                            backgroundColor={"green.400"}
                            _hover={{ backgroundColor: "green.500" }}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={"0.5rem"}
                            fontSize={"1.1rem"}
                            fontWeight={"bold"}
                        >
                            Go to <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </Link>
                </Flex>
            </Flex>
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
