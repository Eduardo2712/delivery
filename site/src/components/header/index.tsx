"use client";

import { faBell, faGear, faRightFromBracket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import { Box, Container, Flex, Hide, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
    const { logout, user } = useAuth();
    const [search, setSearch] = useState("");

    return (
        <Flex bg={"gray.900"} color={"gray.50"} alignItems={"center"} borderBottomWidth={"0.1rem"} borderBottomColor={"blue.100"}>
            <Container maxW={"6xl"} color={"gray.50"} padding={"1rem"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Hide below="md">
                        <Box flex={"1"}>
                            <Text textAlign={"center"} color={"gray.50"} fontSize={"1.3rem"} fontWeight={"extrabold"} fontStyle={"oblique"}>
                                All for your hunger
                            </Text>
                        </Box>
                    </Hide>

                    <Box flex={"2"}>
                        <Flex gap={"0.5rem"} justifyContent={"center"}>
                            <InputGroup maxW={{ base: "30rem", md: "25rem" }}>
                                <Input
                                    type={"text"}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    variant="solid"
                                    color={"gray.100"}
                                    fontWeight={"bold"}
                                    _placeholder={{
                                        color: "gray.100"
                                    }}
                                    bg={"black"}
                                    borderRadius={"0.7rem"}
                                    h={"9"}
                                    borderWidth={"0.1rem"}
                                    borderColor={"blue.100"}
                                ></Input>

                                <InputRightElement children={<FontAwesomeIcon icon={faSearch} />} />
                            </InputGroup>
                        </Flex>
                    </Box>

                    <Hide below="md">
                        <Box flex={"1"}>
                            {user ? (
                                <Flex justifyContent={"center"} alignItems={"flex-end"} flexDirection={"column"} gap={"1rem"}>
                                    <Flex gap={"1rem"}>
                                        <FontAwesomeIcon fontSize={"1.2rem"} cursor={"pointer"} title="Notifications" icon={faBell} />

                                        <FontAwesomeIcon fontSize={"1.2rem"} cursor={"pointer"} title="Options" icon={faGear} />

                                        <FontAwesomeIcon
                                            fontSize={"1.2rem"}
                                            cursor={"pointer"}
                                            title="Logout"
                                            icon={faRightFromBracket}
                                            onClick={logout}
                                        />

                                        <Text fontSize="md" as={"b"}>{`Hello, ${user.use_name.split(" ")[0]}`}</Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Flex justifyContent={"flex-end"} gap={"0.3rem"} fontSize={"1rem"}>
                                    <Link href={"/auth/register"}>
                                        <Text color={"gray.50"} fontWeight={"bold"}>
                                            Register
                                        </Text>
                                    </Link>
                                    /
                                    <Link href={"/auth/login"}>
                                        <Text color={"gray.50"} fontWeight={"bold"}>
                                            Login
                                        </Text>
                                    </Link>
                                </Flex>
                            )}
                        </Box>
                    </Hide>
                </Flex>
            </Container>
        </Flex>
    );
};

export default Header;
