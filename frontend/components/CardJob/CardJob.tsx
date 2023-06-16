import { Button, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FcLock } from "react-icons/fc";

export default function SimpleCookiePreference() {
  return (
    <Link href="#">
      <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Front-end Developer</Text>
          <FcLock />
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
            We use cookies and similar technologies to help personalise content,
            tailor and measure ads, and provide a better experience.
          </Text>
        </Stack>
        <Stack direction={{ base: "column", md: "row" }}>
          <Button colorScheme="green">OK</Button>
        </Stack>
      </Stack>
    </Link>
  );
}
