import { Flex, Text, Link as LinkChakra } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/auth";

const ProfileFollow = () => {
    const { user } = useAuth();

    return (
        <Flex
            direction={"column"}
            width={"12rem"}
            backgroundColor={"gray.50"}
            padding={"1rem"}
            borderRadius={"0.3rem"}
        >
            <Image
                src={user?.photo?.fil_path ?? ""}
                width={120}
                height={120}
                alt="User photo"
            />

            <Text
                fontSize="lg"
                fontWeight={"bold"}
                color={"gray.600"}
                marginTop={"1rem"}
                marginBottom={"0.5rem"}
                textAlign={"center"}
            >
                {user?.use_name}
            </Text>

            <Flex direction={"column"} alignItems={"center"}>
                <Text fontSize="md" color={"gray.700"}>
                    Followers
                </Text>

                <Text fontSize="md" fontWeight={"bold"} color={"gray.700"}>
                    {0}
                </Text>
            </Flex>

            <Flex direction={"column"} alignItems={"center"}>
                <Text fontSize="md" color={"gray.700"}>
                    Following
                </Text>

                <Text fontSize="md" fontWeight={"bold"} color={"gray.700"}>
                    {0}
                </Text>
            </Flex>

            <Link href={"/profile"}>
                <LinkChakra
                    marginTop={"1.5rem"}
                    color={"blue.400"}
                    textAlign={"center"}
                >
                    My profile
                </LinkChakra>
            </Link>
        </Flex>
    );
};

export default ProfileFollow;
