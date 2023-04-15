"use client";

import { Formik, Form } from "formik";
import { NextPage } from "next";
import { User } from "../../../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Flex, Box, Stack, Button, Heading, useToast, Text } from "@chakra-ui/react";
import StyleInput from "../../../components/style-input";
import { schema } from "./util";
import { useAuth } from "@/context/auth";

const Login: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { login } = useAuth();

    const router = useRouter();
    const toast = useToast();

    const onSubmit = async (values: Pick<User, "email" | "password">) => {
        setLoading(true);

        try {
            await login(values.email, values.password);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error ?? "An error has occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            onSubmit={onSubmit}
            validateOnMount
            validationSchema={schema}
            initialValues={{
                email: "",
                password: ""
            }}
        >
            {({ handleChange, handleBlur, values, errors, touched }) => (
                <Form method="post" noValidate>
                    <Flex minH={"calc(100vh - 168px)"} align={"center"} justify={"center"}>
                        <Stack spacing={8} mx={"auto"} w={"lg"} py={12} px={6}>
                            <Stack align={"center"}>
                                <Heading fontSize={"4xl"} color={"gray.50"}>
                                    Login
                                </Heading>
                            </Stack>
                            <Box rounded={"xl"} p={12} bg={"black"}>
                                <Stack spacing={4}>
                                    <StyleInput
                                        errors={errors.email}
                                        touched={touched.email}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"email"}
                                        title={"Email address"}
                                        type={"email"}
                                        value={values.email}
                                        isRequired={true}
                                    />

                                    <StyleInput
                                        errors={errors.password}
                                        touched={touched.password}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"password"}
                                        title={"Password"}
                                        type={"password"}
                                        value={values.password}
                                        isRequired={true}
                                    />

                                    <Stack spacing={6}>
                                        <Stack
                                            direction={{
                                                base: "column",
                                                sm: "row"
                                            }}
                                            align={"start"}
                                            justify={"space-between"}
                                        >
                                            <Link href="/auth/register">
                                                <Text color={"gray.50"}>{"I don't have an account"}</Text>
                                            </Link>
                                        </Stack>

                                        <Flex gap={"0.5rem"}>
                                            <Button
                                                flex={"1"}
                                                bg={"red.400"}
                                                color={"white"}
                                                isLoading={loading}
                                                _hover={{
                                                    bg: "red.500"
                                                }}
                                                onClick={() => {
                                                    router.push("/");
                                                }}
                                            >
                                                Return
                                            </Button>

                                            <Button
                                                flex={"1"}
                                                type="submit"
                                                bg={"green.500"}
                                                color={"white"}
                                                _hover={{
                                                    bg: "green.600"
                                                }}
                                                isLoading={loading}
                                            >
                                                Sign in
                                            </Button>
                                        </Flex>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
