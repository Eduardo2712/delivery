"use client";

import { Form, Formik } from "formik";
import { maskCEP, maskCPF, maskPhone } from "../../../utils/mask";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Heading, Stack, Box, useToast } from "@chakra-ui/react";
import { createUser } from "../../../requests/user.request";
import { getCEP } from "../../../requests/cep.request";
import StyleInput from "../../../components/style-input";
import { NextPage } from "next";
import { TypeFormRegister, schema } from "./util";
import { toastParams } from "@/utils/function";

const Register: NextPage = () => {
    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const titleText = ["Personal information", "Address information"];

    const router = useRouter();

    const toast = useToast();

    const initialValues: TypeFormRegister = {
        email: "",
        password: "",
        password_confirmation: "",
        use_name: "",
        use_cpf: "",
        use_phone: "",
        use_date_birth: "",
        usa_cep: "",
        usa_street: "",
        usa_number: "",
        usa_district: "",
        usa_complement: "",
        usa_city: "",
        usa_state: ""
    };

    const onSubmit = async (values: TypeFormRegister) => {
        if (step !== 1) {
            return setStep((bef) => bef + 1);
        }

        setLoading(true);

        try {
            const response = await createUser(values);

            if (response.status !== 200) {
                return toast({ ...toastParams, title: "Error", description: response.data.message, status: "error" });
            }

            toast({ ...toastParams, title: "Success", description: "Successfully registered user", status: "success" });

            router.push("/");
        } catch (error: any) {
            toast({ ...toastParams, title: "Error", description: error ?? "An error has occurred", status: "error" });
        } finally {
            setLoading(false);
        }
    };

    const searchCEP = async (cep: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        const format_cep = cep.replaceAll("-", "");

        if (format_cep.length !== 8) {
            return toast({ ...toastParams, title: "Warning", description: "CEP must be 8 characters long", status: "warning" });
        }

        try {
            const response = await getCEP(format_cep);

            if (response.data.erro) {
                return toast({ ...toastParams, title: "Error", description: "CEP not found", status: "error" });
            }

            setFieldValue("usa_street", response.data.logradouro ?? "");
            setFieldValue("usa_district", response.data.bairro ?? "");
            setFieldValue("usa_city", response.data.localidade ?? "");
            setFieldValue("usa_state", response.data.uf ?? "");
        } catch (error: any) {
            toast({ ...toastParams, title: "Error", description: error ?? "An error has occurred", status: "error" });
        }
    };

    const returnButton = () => {
        if (step === 0) {
            return router.push("/auth/login");
        }

        setStep((bef) => bef - 1);
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={schema(step)} validateOnMount onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form method="post" onSubmit={handleSubmit} noValidate>
                        <Flex align={"center"} justify={"center"} minHeight={"calc(100vh - 64px)"}>
                            <Stack spacing={4} w={"full"} maxW={"container.md"} rounded={"xl"} boxShadow={"xl"} p={6} my={12} bg={"gray.50"}>
                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} color={"gray.500"}>
                                    {titleText[step]}
                                </Heading>

                                {step === 0 && (
                                    <>
                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.use_name}
                                                touched={touched.use_name}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"use_name"}
                                                title={"Name"}
                                                type={"text"}
                                                value={values.use_name}
                                                isRequired={true}
                                            />

                                            <StyleInput
                                                errors={errors.use_cpf}
                                                touched={touched.use_cpf}
                                                handleBlur={handleBlur}
                                                handleChange={(e) => handleChange(maskCPF(e))}
                                                name={"use_cpf"}
                                                title={"CPF"}
                                                type={"text"}
                                                value={values.use_cpf}
                                                isRequired={true}
                                                max_length={14}
                                            />
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.use_phone}
                                                touched={touched.use_phone}
                                                handleBlur={handleBlur}
                                                handleChange={(e) => handleChange(maskPhone(e))}
                                                name={"use_phone"}
                                                title={"Phone number"}
                                                type={"text"}
                                                value={values.use_phone}
                                                isRequired={true}
                                            />

                                            <StyleInput
                                                errors={errors.email}
                                                touched={touched.email}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"email"}
                                                title={"E-mail"}
                                                type={"email"}
                                                value={values.email}
                                                isRequired={true}
                                            />
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
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

                                            <StyleInput
                                                errors={errors.password_confirmation}
                                                touched={touched.password_confirmation}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"password_confirmation"}
                                                title={"Password confirmation"}
                                                type={"password"}
                                                value={values.password_confirmation}
                                                isRequired={true}
                                            />
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.use_date_birth}
                                                touched={touched.use_date_birth}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"use_date_birth"}
                                                title={"Date of birth"}
                                                type={"date"}
                                                value={values.use_date_birth}
                                                isRequired={true}
                                            />
                                        </Box>
                                    </>
                                )}

                                {step === 1 && (
                                    <>
                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.usa_cep}
                                                touched={touched.usa_cep}
                                                handleBlur={(e) => searchCEP(maskCEP(e).target.value, setFieldValue)}
                                                handleChange={(e) => handleChange(maskCEP(e))}
                                                name={"usa_cep"}
                                                title={"CEP"}
                                                value={values.usa_cep}
                                                isRequired={true}
                                            />

                                            <StyleInput
                                                errors={errors.usa_street}
                                                touched={touched.usa_street}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"usa_street"}
                                                title={"Street"}
                                                value={values.usa_street}
                                                isRequired={true}
                                            />
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.usa_number}
                                                touched={touched.usa_number}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"usa_number"}
                                                title={"Number"}
                                                value={values.usa_number}
                                                isRequired={true}
                                            />

                                            <StyleInput
                                                errors={errors.usa_complement}
                                                touched={touched.usa_complement}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"usa_complement"}
                                                title={"Complement"}
                                                value={values.usa_complement}
                                                isRequired={false}
                                            />
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.usa_district}
                                                touched={touched.usa_district}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"usa_district"}
                                                title={"District"}
                                                value={values.usa_district}
                                                isRequired={true}
                                            />

                                            <StyleInput
                                                errors={errors.usa_city}
                                                touched={touched.usa_city}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"usa_city"}
                                                title={"City"}
                                                value={values.usa_city}
                                                isRequired={true}
                                            />
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.usa_state}
                                                touched={touched.usa_state}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"usa_state"}
                                                title={"State"}
                                                value={values.usa_state}
                                                isRequired={true}
                                            />
                                        </Box>
                                    </>
                                )}

                                <Stack spacing={6} direction={["column", "row"]}>
                                    <Button
                                        bg={"red.500"}
                                        color={"white"}
                                        w="full"
                                        isLoading={loading}
                                        _hover={{
                                            bg: "red.600"
                                        }}
                                        onClick={() => returnButton()}
                                    >
                                        Return
                                    </Button>

                                    <Button
                                        type="submit"
                                        bg={"green.500"}
                                        color={"white"}
                                        w="full"
                                        isLoading={loading}
                                        _hover={{
                                            bg: "green.600"
                                        }}
                                    >
                                        {step === 0 ? "Next" : "Submit"}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Register;
