import { Form, Formik } from "formik";
import * as Yup from "yup";
import { maskCEP, maskCPF, maskPhone } from "../../utils/mask";
import { useState } from "react";
import { useRouter } from "next/router";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Box,
    useToast,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "@chakra-ui/react";
import { createUser } from "../../requests/user.request";
import { getCEP } from "../../requests/cep.request";
import { firstCapital, typeUser } from "../../utils/function";
import StyleInput from "../../components/style-input";

type Props = {
    setType: (i: number) => void;
    setStep: (i: number) => void;
};

const CardUser = (props: Props) => {
    return (
        <Flex gap={"1rem"} flexWrap={"wrap"}>
            {typeUser.map((type) => {
                return (
                    <Card key={type.id} flex={"1"} minWidth={"18rem"}>
                        <CardHeader>
                            <Heading size="md" color={"gray.700"}>
                                {firstCapital(type.type)}
                            </Heading>
                        </CardHeader>

                        <CardBody>
                            <Text color={"gray.700"}>{type.text}</Text>
                        </CardBody>

                        <CardFooter display={"flex"} justifyContent={"flex-end"}>
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
                                width={"8rem"}
                                onClick={() => {
                                    props.setType(type.id);
                                    props.setStep(1);
                                }}
                            >
                                Select
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </Flex>
    );
};

const Register = () => {
    type Form = {
        email: string;
        password: string;
        password_confirmation: string;
        use_name: string;
        use_cpf: string;
        use_phone: string;
        use_date_birth: string;
        add_cep: string;
        add_street: string;
        add_number: string;
        add_district: string;
        add_complement: string;
        add_city: string;
        add_state: string;
    };

    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<number | null>(null);

    const titleText = ["Select user type", "Personal information", "Address information"];

    const router = useRouter();
    const toast = useToast();

    const initialValues: Form = {
        email: "",
        password: "",
        password_confirmation: "",
        use_name: "",
        use_cpf: "",
        use_phone: "",
        use_date_birth: "",
        add_cep: "",
        add_street: "",
        add_number: "",
        add_district: "",
        add_complement: "",
        add_city: "",
        add_state: ""
    };

    const schema = () => {
        if (step === 1) {
            return Yup.object().shape({
                email: Yup.string().email("Fill in with a valid e-mail!").required("Fill in this field!"),
                password: Yup.string().min(8, "Password must be at least 8 characters long!").required("Fill in this field!"),
                password_confirmation: Yup.string()
                    .min(8, "Password must be at least 8 characters long!")
                    .oneOf([Yup.ref("password"), null], "Passwords must be the same!")
                    .required("Fill in this field!"),
                use_name: Yup.string().required("Fill in this field!"),
                use_cpf: Yup.string().length(14).required("Fill in this field!"),
                use_phone: Yup.string().required("Fill in this field!"),
                use_date_birth: Yup.date().required("Fill in this field!")
            });
        } else if (step === 2) {
            return Yup.object().shape({
                add_cep: Yup.string().required("Fill in this field!"),
                add_street: Yup.string().required("Fill in this field!"),
                add_number: Yup.string().required("Fill in this field!"),
                add_district: Yup.string().required("Fill in this field!"),
                add_complement: Yup.string(),
                add_city: Yup.string().required("Fill in this field!"),
                add_state: Yup.string().required("Fill in this field!")
            });
        } else {
            return Yup.object().shape({});
        }
    };

    const onSubmit = async (values: Form | any) => {
        if (step !== 2) {
            return setStep((bef) => bef + 1);
        }

        const form_data = new FormData();

        for (const key in values) {
            form_data.append(key, values[key]);
        }

        setLoading(true);

        try {
            await createUser(values);

            toast({
                title: "Success.",
                description: "Successfully registered user",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });

            router.push("/");
        } catch (error: any) {
            if (typeof error === "string") {
                toast({
                    title: "Error.",
                    description: error ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
            } else {
                toast({
                    title: "Error.",
                    description: error?.response?.data?.message ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const searchCEP = async (cep: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        const format_cep = cep.replaceAll("-", "");

        if (format_cep.length !== 8) {
            return toast({
                title: "Warning.",
                description: "CEP must be 8 characters long",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        }

        try {
            const response = await getCEP(format_cep);

            if (response.data.erro) {
                return toast({
                    title: "Error.",
                    description: response.data.erro ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
            }

            setFieldValue("add_street", response.data.logradouro ?? "");
            setFieldValue("add_district", response.data.bairro ?? "");
            setFieldValue("add_city", response.data.localidade ?? "");
            setFieldValue("add_state", response.data.uf ?? "");
        } catch (error: any) {
            if (typeof error === "string") {
                toast({
                    title: "Error.",
                    description: error ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
            } else {
                toast({
                    title: "Error.",
                    description: error?.response?.data?.message[0] ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
            }
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={schema} validateOnMount onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form method="post" onSubmit={handleSubmit} noValidate>
                        <Flex align={"center"} justify={"center"} minHeight={"calc(100vh - 64px)"}>
                            <Stack spacing={4} w={"full"} maxW={"container.md"} rounded={"xl"} boxShadow={"lg"} p={6} my={12}>
                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} color={"gray.700"}>
                                    {titleText[step]}
                                </Heading>

                                {step === 0 && <CardUser setType={setType} setStep={setStep} />}

                                {step === 1 && (
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

                                {step === 2 && (
                                    <>
                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"gray.700"}>CEP</FormLabel>

                                                <Input
                                                    placeholder="CEP"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="add_cep"
                                                    value={values.add_cep}
                                                    onChange={(e) => handleChange(maskCEP(e))}
                                                    onBlur={(e) => searchCEP(maskCEP(e).target.value, setFieldValue)}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.add_cep && touched.add_cep && errors.add_cep}
                                                </Text>
                                            </FormControl>

                                            <FormControl isRequired>
                                                <FormLabel color={"gray.700"}>Street</FormLabel>

                                                <Input
                                                    placeholder="Street"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="add_street"
                                                    value={values.add_street}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.add_street && touched.add_street && errors.add_street}
                                                </Text>
                                            </FormControl>
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"gray.700"}>Number</FormLabel>

                                                <Input
                                                    placeholder="Number"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="add_number"
                                                    value={values.add_number}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.add_number && touched.add_number && errors.add_number}
                                                </Text>
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel color={"gray.700"}>Complement</FormLabel>

                                                <Input
                                                    placeholder="Complement"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="add_complement"
                                                    value={values.add_complement}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.add_complement && touched.add_complement && errors.add_complement}
                                                </Text>
                                            </FormControl>
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"gray.700"}>District</FormLabel>

                                                <Input
                                                    placeholder="District"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="add_district"
                                                    value={values.add_district}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.add_district && touched.add_district && errors.add_district}
                                                </Text>
                                            </FormControl>

                                            <FormControl isRequired>
                                                <FormLabel color={"gray.700"}>City</FormLabel>

                                                <Input
                                                    placeholder="City"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="add_city"
                                                    value={values.add_city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.add_city && touched.add_city && errors.add_city}
                                                </Text>
                                            </FormControl>
                                        </Box>

                                        <Box gap={3} display={{ sm: "flex" }}>
                                            <FormControl isRequired>
                                                <FormLabel color={"gray.700"}>State</FormLabel>

                                                <Input
                                                    placeholder="State"
                                                    _placeholder={{
                                                        color: "gray.500"
                                                    }}
                                                    type="text"
                                                    name="add_state"
                                                    value={values.add_state}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Text fontSize="sm" color={"red.500"} fontWeight={"semibold"} mt={1}>
                                                    {errors.add_state && touched.add_state && errors.add_state}
                                                </Text>
                                            </FormControl>
                                        </Box>
                                    </>
                                )}

                                {step > 0 && (
                                    <Stack spacing={6} direction={["column", "row"]}>
                                        <Button
                                            bg={"red.400"}
                                            color={"white"}
                                            w="full"
                                            isLoading={loading}
                                            _hover={{
                                                bg: "red.500"
                                            }}
                                            onClick={() => setStep((bef) => bef - 1)}
                                        >
                                            Return
                                        </Button>

                                        <Button
                                            type="submit"
                                            bg={"blue.400"}
                                            color={"white"}
                                            w="full"
                                            isLoading={loading}
                                            _hover={{
                                                bg: "blue.500"
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
