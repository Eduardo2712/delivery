"use client";

import { Formik, Form } from "formik";
import { NextPage } from "next";
import { User } from "../../../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Flex, Box, Stack, Button, Heading, Text, useToast } from "@chakra-ui/react";
import StyleInput from "../../../components/style-input";
import { schema } from "./util";
import { toastParams } from "@/utils/function";
import { login } from "@/store/auth/auth.slice";
import { useDispatch } from "react-redux";
import { auth } from "@/requests/auth.request";

const Login: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    const toast = useToast();

    const router = useRouter();

    const onSubmit = async (values: Pick<User, "email" | "password">) => {
        setLoading(true);

        try {
            const response = await auth({
                email: values.email,
                password: values.password
            });

            const response_json = await response.json();

            if (response.status !== 200) {
                return toast({ ...toastParams, title: "Error", description: response_json.message, status: "error" });
            }

            if (response_json.user && response_json.access_token) {
                dispatch(login({ ...response_json.user, token: response_json.access_token }));

                toast({ ...toastParams, title: "Success", description: "Successfully login", status: "success" });

                router.push("/");
            }
        } catch (error: any) {
            toast({ ...toastParams, title: "Error", description: error ?? "An error has occurred", status: "error" });
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
                                <Heading fontSize={"4xl"} color={"gray.500"}>
                                    Login
                                </Heading>
                            </Stack>
                            <Box rounded={"xl"} p={12} boxShadow={"xl"} bg={"gray.50"}>
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
                                                <Text color={"gray.500"}>{"I don't have an account"}</Text>
                                            </Link>
                                        </Stack>

                                        <Flex gap={"0.5rem"}>
                                            <Button
                                                flex={"1"}
                                                bg={"red.500"}
                                                color={"white"}
                                                isLoading={loading}
                                                _hover={{
                                                    bg: "red.600"
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
