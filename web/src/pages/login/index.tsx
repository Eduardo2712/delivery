import { Formik, Form } from "formik";
import { NextPage } from "next";
import * as Yup from "yup";
import { auth } from "../../requests/auth.request";
import { User } from "../../types";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Flex, Box, FormControl, FormLabel, Input, Stack, Link as LinkChakra, Button, Heading, Text, useToast } from "@chakra-ui/react";

const Login: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const toast = useToast();

    const schema = Yup.object().shape({
        email: Yup.string().email("Fill in a valid e-mail!").required("Fill in this field!"),
        password: Yup.string().min(6, "Must contain at least 6 characters!").required("Fill in this field!")
    });

    const onSubmit = async (values: Pick<User, "email" | "password">) => {
        try {
            setLoading(true);

            const response = await auth(values);

            if (response.data.user && response.data.access_token) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        ...response.data.user,
                        token: response.data.access_token
                    })
                );

                router.push("/feed");
            }
        } catch (error: any) {
            if (typeof error === "string") {
                toast({
                    title: "Error.",
                    description: error ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            } else {
                toast({
                    title: "Error.",
                    description: error?.response?.data?.message ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            }
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
                <Form method="post">
                    <Flex minH={"calc(100vh - 168px)"} align={"center"} justify={"center"}>
                        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                            <Stack align={"center"}>
                                <Heading fontSize={"4xl"}>Login</Heading>
                            </Stack>
                            <Box rounded={"xl"} boxShadow={"xl"} p={12}>
                                <Stack spacing={4}>
                                    <FormControl id="email">
                                        <FormLabel>Email address</FormLabel>

                                        <Input name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />

                                        <Text fontSize="md" color={"red.500"} fontWeight={"semibold"} mt={2}>
                                            {errors.email && touched.email && errors.email}
                                        </Text>
                                    </FormControl>

                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>

                                        <Input
                                            type={"password"}
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />

                                        <Text fontSize="md" color={"red.500"} fontWeight={"semibold"} mt={2}>
                                            {errors.password && touched.password && errors.password}
                                        </Text>
                                    </FormControl>

                                    <Stack spacing={6}>
                                        <Stack
                                            direction={{
                                                base: "column",
                                                sm: "row"
                                            }}
                                            align={"start"}
                                            justify={"space-between"}
                                        >
                                            <Link href="/register">
                                                <LinkChakra color={"blue.400"}>{"I don't have an account"}</LinkChakra>
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
                                                    router.push("/login");
                                                }}
                                            >
                                                {"Return"}
                                            </Button>

                                            <Button
                                                flex={"1"}
                                                type="submit"
                                                bg={"blue.400"}
                                                color={"white"}
                                                _hover={{
                                                    bg: "blue.500"
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
