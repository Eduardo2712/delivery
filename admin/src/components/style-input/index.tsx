"use client";

import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

type Props = {
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
    name: string;
    type?: string;
    title: string;
    errors: string | undefined;
    touched: boolean | undefined;
    value: string | number | undefined;
    isRequired: boolean;
    max_length?: number;
};

const StyleInput = (props: Props) => {
    return (
        <FormControl id={props.name} isRequired={props.isRequired}>
            <FormLabel color={"gray.500"}>{props.title}</FormLabel>

            <Input
                type={props.type ?? "text"}
                name={props.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.value}
                placeholder={props.title}
                color={"gray.500"}
                _placeholder={{
                    color: "gray.400"
                }}
                maxLength={props.max_length ?? undefined}
            />

            <Text fontSize={"0.9rem"} color={"red.500"} fontWeight={"normal"} mt={2}>
                {props.errors && props.touched && props.errors}
            </Text>
        </FormControl>
    );
};

export default StyleInput;
