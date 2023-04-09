"use client";

import { firstCapital, typeUser } from "@/utils/function";
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";

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

export default CardUser;
