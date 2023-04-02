import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

type Props = {
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
    name: string;
    type: string;
    title: string;
    errors: string | undefined;
    touched: boolean | undefined;
    value: string | number | undefined;
    isRequired: boolean;
};

const StyleInput = (props: Props) => {
    return (
        <FormControl id={props.name} isRequired={props.isRequired}>
            <FormLabel>{props.title}</FormLabel>

            <Input
                type={props.type}
                name={props.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.value}
                placeholder={props.title}
                _placeholder={{
                    color: "gray.500"
                }}
            />

            <Text fontSize="md" color={"red.500"} fontWeight={"semibold"} mt={2}>
                {props.errors && props.touched && props.errors}
            </Text>
        </FormControl>
    );
};

export default StyleInput;
