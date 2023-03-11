import { Formik } from "formik";
import * as Yup from "yup";
import { getCEP, maskCEP, maskPhone } from "../../utils/utils";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Text,
    Box,
    useToast
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { createUser } from "../../requests/user.request";

const Register = () => {
    type Form = {
        email: string;
        password: string;
        password_confirmation: string;
        use_name: string;
        use_username: string;
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

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const refFile = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const toast = useToast();

    const initialValues = {
        email: "",
        password: "",
        password_confirmation: "",
        use_name: "",
        use_username: "",
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

    const schema =
        step === 0
            ? Yup.object().shape({
                  email: Yup.string()
                      .email("Fill in with a valid e-mail!")
                      .required("Fill in this field!"),
                  password: Yup.string()
                      .min(8, "Password must be at least 8 characters long!")
                      .required("Fill in this field!"),
                  password_confirmation: Yup.string()
                      .min(8, "Password must be at least 8 characters long!")
                      .oneOf(
                          [Yup.ref("password"), null],
                          "Passwords must be the same!"
                      )
                      .required("Fill in this field!"),
                  use_name: Yup.string().required("Fill in this field!"),
                  use_username: Yup.string().required("Fill in this field!"),
                  use_phone: Yup.string().required("Fill in this field!"),
                  use_date_birth: Yup.date().required("Fill in this field!")
              })
            : Yup.object().shape({
                  add_cep: Yup.string().required("Fill in this field!"),
                  add_street: Yup.string().required("Fill in this field!"),
                  add_number: Yup.string().required("Fill in this field!"),
                  add_district: Yup.string().required("Fill in this field!"),
                  add_complement: Yup.string(),
                  add_city: Yup.string().required("Fill in this field!"),
                  add_state: Yup.string().required("Fill in this field!")
              });

    const onSubmit = async (values: Form | any) => {
        if (step === 0) {
            return setStep((bef) => bef + 1);
        }

        const form_data = new FormData();

        for (const key in values) {
            form_data.append(key, values[key]);
        }

        setLoading(true);

        try {
            const response = await createUser(form_data);
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
                    description:
                        error?.response?.data?.message[0] ??
                        "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const searchCEP = async (
        cep: string,
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => void
    ) => {
        const format_cep = cep.replaceAll("-", "");

        if (format_cep.length !== 8) {
            return toast({
                title: "Warning.",
                description: "CEP must be 8 characters long",
                status: "warning",
                duration: 5000,
                isClosable: true
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
                    isClosable: true
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
                    isClosable: true
                });
            } else {
                toast({
                    title: "Error.",
                    description:
                        error?.response?.data?.message[0] ??
                        "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            }
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            validateOnMount
            onSubmit={onSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>
                    <Flex minH={"100vh"} align={"center"} justify={"center"}>
                        <Stack
                            spacing={4}
                            w={"full"}
                            maxW={"container.md"}
                            rounded={"xl"}
                            boxShadow={"lg"}
                            p={6}
                            my={12}
                        >
                            <Heading
                                lineHeight={1.1}
                                fontSize={{ base: "2xl", sm: "3xl" }}
                            >
                                {step === 0
                                    ? "Personal information"
                                    : "Address information"}
                            </Heading>

                            {step === 0 ? (
                                <>
                                    <FormControl id="userName">
                                        <FormLabel>User image</FormLabel>
                                        <Stack
                                            direction={["column", "row"]}
                                            spacing={6}
                                        >
                                            <Center>
                                                <Avatar
                                                    size="xl"
                                                    src={
                                                        image
                                                            ? URL.createObjectURL(
                                                                  image
                                                              )
                                                            : ""
                                                    }
                                                >
                                                    <AvatarBadge
                                                        as={IconButton}
                                                        size="sm"
                                                        rounded="full"
                                                        top="-10px"
                                                        colorScheme="red"
                                                        aria-label="remove image"
                                                        icon={
                                                            <SmallCloseIcon />
                                                        }
                                                        onClick={() =>
                                                            setImage(null)
                                                        }
                                                    />
                                                </Avatar>
                                            </Center>
                                            <Center
                                                w="full"
                                                justifyContent={"flex-start"}
                                            >
                                                <Input
                                                    type={"file"}
                                                    name="file"
                                                    hidden={true}
                                                    ref={refFile}
                                                    onChange={(e: any) =>
                                                        setImage(
                                                            e?.target?.files[0]
                                                        )
                                                    }
                                                    accept="image/png, image/jpeg"
                                                />

                                                <Button
                                                    w="full"
                                                    maxW={"sm"}
                                                    onClick={() =>
                                                        refFile?.current?.click()
                                                    }
                                                >
                                                    Change image
                                                </Button>
                                            </Center>
                                        </Stack>
                                    </FormControl>

                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>Name</FormLabel>

                                            <Input
                                                placeholder="Name"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="text"
                                                name="use_name"
                                                value={values.use_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.use_name &&
                                                    touched.use_name &&
                                                    errors.use_name}
                                            </Text>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Username</FormLabel>

                                            <Input
                                                placeholder="Username"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="text"
                                                name="use_username"
                                                value={values.use_username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.use_username &&
                                                    touched.use_username &&
                                                    errors.use_username}
                                            </Text>
                                        </FormControl>
                                    </Box>

                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>Phone number</FormLabel>

                                            <Input
                                                placeholder="Phone number"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="text"
                                                name="use_phone"
                                                value={values.use_phone}
                                                onChange={(e) =>
                                                    handleChange(maskPhone(e))
                                                }
                                                onBlur={(e) =>
                                                    handleBlur(maskPhone(e))
                                                }
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.use_phone &&
                                                    touched.use_phone &&
                                                    errors.use_phone}
                                            </Text>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>E-mail</FormLabel>

                                            <Input
                                                placeholder="E-mail"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="text"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.email &&
                                                    touched.email &&
                                                    errors.email}
                                            </Text>
                                        </FormControl>
                                    </Box>

                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>Password</FormLabel>

                                            <Input
                                                placeholder="Password"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.password &&
                                                    touched.password &&
                                                    errors.password}
                                            </Text>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>
                                                Password confirmation
                                            </FormLabel>

                                            <Input
                                                placeholder="Password confirmation"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="password"
                                                name="password_confirmation"
                                                value={
                                                    values.password_confirmation
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.password_confirmation &&
                                                    touched.password_confirmation &&
                                                    errors.password_confirmation}
                                            </Text>
                                        </FormControl>
                                    </Box>

                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>Date of birth</FormLabel>

                                            <Input
                                                placeholder="Date of birth"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="date"
                                                name="use_date_birth"
                                                value={values.use_date_birth}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.use_date_birth &&
                                                    touched.use_date_birth &&
                                                    errors.use_date_birth}
                                            </Text>
                                        </FormControl>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>CEP</FormLabel>

                                            <Input
                                                placeholder="CEP"
                                                _placeholder={{
                                                    color: "gray.500"
                                                }}
                                                type="text"
                                                name="add_cep"
                                                value={values.add_cep}
                                                onChange={(e) =>
                                                    handleChange(maskCEP(e))
                                                }
                                                onBlur={(e) =>
                                                    searchCEP(
                                                        maskCEP(e).target.value,
                                                        setFieldValue
                                                    )
                                                }
                                            />

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.add_cep &&
                                                    touched.add_cep &&
                                                    errors.add_cep}
                                            </Text>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Street</FormLabel>

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

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.add_street &&
                                                    touched.add_street &&
                                                    errors.add_street}
                                            </Text>
                                        </FormControl>
                                    </Box>

                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>Number</FormLabel>

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

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.add_number &&
                                                    touched.add_number &&
                                                    errors.add_number}
                                            </Text>
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Complement</FormLabel>

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

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.add_complement &&
                                                    touched.add_complement &&
                                                    errors.add_complement}
                                            </Text>
                                        </FormControl>
                                    </Box>

                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>District</FormLabel>

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

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.add_district &&
                                                    touched.add_district &&
                                                    errors.add_district}
                                            </Text>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>City</FormLabel>

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

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.add_city &&
                                                    touched.add_city &&
                                                    errors.add_city}
                                            </Text>
                                        </FormControl>
                                    </Box>

                                    <Box gap={3} display={{ sm: "flex" }}>
                                        <FormControl isRequired>
                                            <FormLabel>State</FormLabel>

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

                                            <Text
                                                fontSize="sm"
                                                color={"red.500"}
                                                fontWeight={"semibold"}
                                                mt={1}
                                            >
                                                {errors.add_state &&
                                                    touched.add_state &&
                                                    errors.add_state}
                                            </Text>
                                        </FormControl>
                                    </Box>
                                </>
                            )}

                            <Stack spacing={6} direction={["column", "row"]}>
                                <Button
                                    bg={"red.400"}
                                    color={"white"}
                                    w="full"
                                    isLoading={loading}
                                    _hover={{
                                        bg: "red.500"
                                    }}
                                    onClick={() => {
                                        step === 0
                                            ? router.push("/login")
                                            : setStep((bef) => bef - 1);
                                    }}
                                >
                                    {step === 0 ? "Cancel" : "Return"}
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
                                    {step === 0 ? "Next" : "Submit"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </form>
            )}
        </Formik>
    );
};

export default Register;
