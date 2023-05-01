"use client";

import { useEffect } from "react";
import { Box, Container, Flex, Hide, Text } from "@chakra-ui/react";
import Link from "next/link";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "@/store/auth/auth.slice";
import { IoLogOut, IoNotifications, IoOptions } from "react-icons/io5";

const Header = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const user_local = localStorage.getItem("user");

        if (user_local) {
            dispatch(setUser({ user: JSON.parse(user_local ?? "") }));
        }
    }, []);

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

                    <Hide below="md">
                        <Box flex={"1"}>
                            {user ? (
                                <Flex justifyContent={"center"} alignItems={"flex-end"} flexDirection={"column"} gap={"1rem"}>
                                    <Flex gap={"1rem"}>
                                        <IoNotifications fontSize={"1.5rem"} cursor={"pointer"} color={"#718096"} />

                                        <IoOptions fontSize={"1.5rem"} cursor={"pointer"} color={"#718096"} />

                                        <IoLogOut fontSize={"1.5rem"} cursor={"pointer"} color={"#718096"} onClick={() => dispatch(logout())} />

                                        <Text color={"gray.500"} fontSize="md" as={"b"}>{`Hello, ${user?.use_name?.split(" ")[0]}`}</Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Flex justifyContent={"flex-end"} gap={"0.3rem"} fontSize={"1rem"} color={"gray.500"}>
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
