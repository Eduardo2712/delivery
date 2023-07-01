"use client";

import { Box, chakra, Container, Stack, Text, VisuallyHidden } from "@chakra-ui/react";
import { faYoutube, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Link from "next/link";
import { ReactNode } from "react";

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
    return (
        <chakra.button
            bg={"blue.300"}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const Footer = () => {
    return (
        <Box bg={"gray.50"} borderTopWidth={"0.1rem"} borderTopColor={"gray.200"} margin={"0 2rem 0 2rem"}>
            <Container
                as={Stack}
                maxW={"6xl"}
                py={4}
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align={{ base: "center", md: "center" }}
            >
                <Link href={"/"}>
                    <Text color={"gray.400"} fontWeight={"bold"}>{`© ${format(new Date(), "yyyy")} Delivery. All rights reserved`}</Text>
                </Link>

                <Stack direction={"row"} spacing={6}>
                    <SocialButton label={"Twitter"} href={"#"}>
                        <FontAwesomeIcon icon={faTwitter} color={"white"} />
                    </SocialButton>

                    <SocialButton label={"YouTube"} href={"#"}>
                        <FontAwesomeIcon icon={faYoutube} color={"white"} />
                    </SocialButton>

                    <SocialButton label={"Instagram"} href={"#"}>
                        <FontAwesomeIcon icon={faInstagram} color={"white"} />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
