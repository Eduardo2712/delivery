import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import ProfileFollow from "../components/profile-follow";
import { updateStatus } from "../requests/user.request";
import { Button, Container, Flex, Text, Textarea } from "@chakra-ui/react";

const Feed = () => {
    const { user } = useAuth();

    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        if (user) {
            setStatus(user?.use_text_status ?? "");
        }
    }, [user]);

    return (
        <Container maxW="container.xl" padding={"1rem"}>
            <Flex justifyContent={"space-between"}>
                <ProfileFollow />

                <Flex direction={"column"} width={"20rem"} gap={"0.5rem"}>
                    <Text fontSize="md" color={"gray.600"}>
                        My status now...
                    </Text>

                    <Textarea
                        value={status}
                        size="sm"
                        onChange={(e) => setStatus(e.target.value)}
                        resize={"none"}
                        variant={"outline"}
                        borderRadius={"0.2rem"}
                    ></Textarea>

                    <Button
                        type="button"
                        onClick={() => updateStatus({ status })}
                        variant="solid"
                        backgroundColor={"gray.600"}
                        _hover={{ backgroundColor: "gray.500" }}
                        color={"whiteAlpha.900"}
                        width={"7rem"}
                        alignSelf={"flex-end"}
                    >
                        Submit
                    </Button>
                </Flex>
            </Flex>
        </Container>
    );
};

export default Feed;
