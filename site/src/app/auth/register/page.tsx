"use client";

import { Form, Formik } from "formik";
import { maskCEP, maskCNPJ, maskCPF, maskPhone } from "../../../utils/mask";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, Box } from "@chakra-ui/react";
import { createUser } from "../../../requests/user.request";
import { getCEP } from "../../../requests/cep.request";
import StyleInput from "../../../components/style-input";
import { NextPage } from "next";
import { TypeFormRegister, schema } from "./util";
import CardUser from "@/components/card-user";
import { createAdmin } from "@/requests/admin.request";
import { toastAlert } from "@/utils/function";

const Register: NextPage = () => {
    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<number | null>(null);

    const titleText = ["Select user type", `${type === 1 ? "Store" : "Personal"} information`, "Address information"];

    const router = useRouter();

    const initialValues: TypeFormRegister = {
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        cpf_cnpj: "",
        phone: "",
        date_birth: "",
        cep: "",
        street: "",
        number: "",
        district: "",
        complement: "",
        city: "",
        state: ""
    };

    const onSubmit = async (values: TypeFormRegister) => {
        if (step !== 2) {
            return setStep((bef) => bef + 1);
        }

        setLoading(true);

        try {
            let response;

            if (type === 1) {
                response = await createAdmin({ ...values, type });
            } else {
                response = await createUser({ ...values, type });
            }

            const response_json = await response.json();

            if (response.status !== 200) {
                return toastAlert({ title: "Error", description: response_json.message.join(", "), status: "error" });
            }

            toastAlert({ title: "Success", description: "Successfully registered user", status: "success" });

            router.push("/");
        } catch (error: any) {
            toastAlert({ title: "Error", description: error ?? "An error has occurred", status: "error" });
        } finally {
            setLoading(false);
        }
    };

    const searchCEP = async (cep: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        const format_cep = cep.replaceAll("-", "");

        if (format_cep.length !== 8) {
            return toastAlert({ title: "Warning", description: "CEP must be 8 characters long", status: "warning" });
        }

        try {
            const response = await (await getCEP(format_cep)).json();

            if (response.erro) {
                return toastAlert({ title: "Error", description: "CEP not found", status: "error" });
            }

            setFieldValue("street", response.logradouro ?? "");
            setFieldValue("district", response.bairro ?? "");
            setFieldValue("city", response.localidade ?? "");
            setFieldValue("state", response.uf ?? "");
        } catch (error: any) {
            toastAlert({ title: "Error", description: error ?? "An error has occurred", status: "error" });
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={schema(step, type)} validateOnMount onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form method="post" onSubmit={handleSubmit} noValidate>
                        <Flex align={"center"} justify={"center"} minHeight={"calc(100vh - 64px)"}>
                            <Stack spacing={4} w={"full"} maxW={"container.md"} rounded={"xl"} boxShadow={"xl"} p={6} my={12} bg={"gray.800"}>
                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} color={"gray.50"}>
                                    {titleText[step]}
                                </Heading>

                                {step === 0 && <CardUser setType={setType} setStep={setStep} />}

                                {step === 1 && (
                                    <>
                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.name}
                                                touched={touched.name}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                name={"name"}
                                                title={"Name"}
                                                type={"text"}
                                                value={values.name}
                                                isRequired={true}
                                            />

                                            <StyleInput
                                                errors={errors.cpf_cnpj}
                                                touched={touched.cpf_cnpj}
                                                handleBlur={handleBlur}
                                                handleChange={(e) => handleChange(type === 1 ? maskCNPJ(e) : maskCPF(e))}
                                                name={"cpf_cnpj"}
                                                title={type === 1 ? "CNPJ" : "CPF"}
                                                type={"text"}
                                                value={values.cpf_cnpj}
                                                isRequired={true}
                                                max_length={type === 1 ? 18 : 14}
                                            />
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <StyleInput
                                                errors={errors.phone}
                                                touched={touched.phone}
                                                handleBlur={handleBlur}
                                                handleChange={(e) => handleChange(maskPhone(e))}
                                                name={"phone"}
                                                title={"Phone number"}
                                                type={"text"}
                                                value={values.phone}
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

                                        {type === 2 && (
                                            <Box gap={3} display={{ sm: "flex" }}>
                                                <StyleInput
                                                    errors={errors.date_birth}
                                                    touched={touched.date_birth}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                    name={"date_birth"}
                                                    title={"Date of birth"}
                                                    type={"date"}
                                                    value={values.date_birth}
                                                    isRequired={true}
                                                />
                                            </Box>
                                        )}
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"blackAlpha.900"}>CEP</FormLabel>

                                                <Input
                                                    placeholder="CEP"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="cep"
                                                    value={values.cep}
                                                    onChange={(e) => handleChange(maskCEP(e))}
                                                    onBlur={(e) => searchCEP(maskCEP(e).target.value, setFieldValue)}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.cep && touched.cep && errors.cep}
                                                </Text>
                                            </FormControl>

                                            <FormControl isRequired>
                                                <FormLabel color={"blackAlpha.900"}>Street</FormLabel>

                                                <Input
                                                    placeholder="Street"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="street"
                                                    value={values.street}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.street && touched.street && errors.street}
                                                </Text>
                                            </FormControl>
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"blackAlpha.900"}>Number</FormLabel>

                                                <Input
                                                    placeholder="Number"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="number"
                                                    value={values.number}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.number && touched.number && errors.number}
                                                </Text>
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel color={"blackAlpha.900"}>Complement</FormLabel>

                                                <Input
                                                    placeholder="Complement"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="complement"
                                                    value={values.complement}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.complement && touched.complement && errors.complement}
                                                </Text>
                                            </FormControl>
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"blackAlpha.900"}>District</FormLabel>

                                                <Input
                                                    placeholder="District"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="district"
                                                    value={values.district}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.district && touched.district && errors.district}
                                                </Text>
                                            </FormControl>

                                            <FormControl isRequired>
                                                <FormLabel color={"blackAlpha.900"}>City</FormLabel>

                                                <Input
                                                    placeholder="City"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="city"
                                                    value={values.city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.city && touched.city && errors.city}
                                                </Text>
                                            </FormControl>
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"blackAlpha.900"}>State</FormLabel>

                                                <Input
                                                    placeholder="State"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="state"
                                                    value={values.state}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.state && touched.state && errors.state}
                                                </Text>
                                            </FormControl>
                                        </Box>
                                    </>
                                )}

                                {step > 0 && (
                                    <Stack spacing={6} direction={["column", "row"]}>
                                        <Button
                                            bg={"red.500"}
                                            color={"white"}
                                            w="full"
                                            isLoading={loading}
                                            _hover={{
                                                bg: "red.600"
                                            }}
                                            onClick={() => setStep((bef) => bef - 1)}
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
                                            {step === 1 ? "Next" : "Submit"}
                                        </Button>
                                    </Stack>
                                )}
                            </Stack>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Register;
