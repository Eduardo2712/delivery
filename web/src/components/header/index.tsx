import {
    faBell,
    faGear,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import {
    Box,
    Button,
    Container,
    Flex,
    Hide,
    Input,
    Text
} from "@chakra-ui/react";

const Header = () => {
    const { logout, user } = useAuth();
    const [search, setSearch] = useState("");

    return (
        <Container
            maxW="container.xl"
            backgroundColor={"blue.400"}
            color={"whiteAlpha.900"}
            padding={"0.9rem"}
        >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Hide below="md">
                    <Box flex={"1"}></Box>
                </Hide>

                <Box flex={"2"}>
                    <Flex gap={"0.5rem"} justifyContent={"center"}>
                        <Input
                            type={"text"}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            variant="solid"
                            color={"gray.500"}
                            maxW={{ base: "30rem", md: "25rem" }}
                        ></Input>

                        <Button
                            type="button"
                            variant="solid"
                            backgroundColor={"gray.600"}
                            _hover={{ backgroundColor: "gray.500" }}
                        >
                            Search
                        </Button>
                    </Flex>
                </Box>

                <Hide below="md">
                    <Box flex={"1"}>
                        <Flex
                            justifyContent={"center"}
                            alignItems={"flex-end"}
                            flexDirection={"column"}
                            gap={"1rem"}
                        >
                            <Flex gap={"1rem"}>
                                <FontAwesomeIcon
                                    fontSize={"1.2rem"}
                                    cursor={"pointer"}
                                    title="Notifications"
                                    icon={faBell}
                                />

                                <FontAwesomeIcon
                                    fontSize={"1.2rem"}
                                    cursor={"pointer"}
                                    title="Options"
                                    icon={faGear}
                                />

                                <FontAwesomeIcon
                                    fontSize={"1.2rem"}
                                    cursor={"pointer"}
                                    title="Logout"
                                    icon={faRightFromBracket}
                                    onClick={logout}
                                />
                            </Flex>

                            {user && (
                                <Text fontSize="md" as={"b"}>{`Hello, ${
                                    user.use_name.split(" ")[0]
                                }`}</Text>
                            )}
                        </Flex>
                    </Box>
                </Hide>
            </Flex>
        </Container>
    );
};

export default Header;
