"use client";

import { faBell, faGear, faRightFromBracket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Box, Button, Container, Flex, Hide, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import Link from "next/link";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "@/store/auth/auth.slice";

const Header = () => {
    const [search, setSearch] = useState<string>("");

    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            dispatch(setUser({ user: JSON.parse(user) }));
        }
    }, []);

    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Flex bg={"gray.50"} alignItems={"center"} borderBottomWidth={"0.1rem"} borderBottomColor={"gray.200"} margin={"0 2rem 0 2rem"}>
            <Container maxW={"6xl"} padding={"2.5rem"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Hide below="md">
                        <Flex flex={"1"} gap={"1"}>
                            <Text textTransform={"uppercase"} color={"gray.900"} fontWeight={"bold"} fontSize={"1.5rem"} fontStyle={"oblique"}>
                                My
                            </Text>
                            <Text color={"blue.300"} fontWeight={"bold"} fontSize={"1.5rem"} fontStyle={"oblique"}>
                                Food
                            </Text>
                        </Flex>
                    </Hide>

                    <Box flex={"2"}>
                        <Flex gap={"0.5rem"} justifyContent={"center"} alignItems={"center"}>
                            <InputGroup maxW={{ base: "30rem", md: "25rem" }}>
                                <InputRightElement
                                    marginRight={"0.4rem"}
                                    width={"5rem"}
                                    children={
                                        <Button
                                            backgroundColor={"blue.300"}
                                            color={"gray.50"}
                                            h={"8"}
                                            rounded={"xl"}
                                            _hover={{
                                                backgroundColor: "blue.400"
                                            }}
                                        >
                                            Search
                                        </Button>
                                    }
                                />

                                <Input
                                    type={"text"}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    variant="solid"
                                    color={"gray.500"}
                                    _placeholder={{
                                        color: "gray.400"
                                    }}
                                    bg={"gray.200"}
                                    borderRadius={"0.7rem"}
                                ></Input>

                                <InputLeftElement children={<FontAwesomeIcon icon={faSearch} style={{ color: "gray" }} />} />
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
                                            onClick={() => dispatch(logout())}
                                        />

                                        <Text fontSize="md" as={"b"}>{`Hello, ${user?.use_name?.split(" ")[0]}`}</Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Flex justifyContent={"flex-end"} gap={"0.3rem"} fontSize={"1rem"} color={"gray.400"}>
                                    <Link href={"/auth/register"}>
                                        <Text fontWeight={"bold"}>Register</Text>
                                    </Link>
                                    /
                                    <Link href={"/auth/login"}>
                                        <Text fontWeight={"bold"}>Login</Text>
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
