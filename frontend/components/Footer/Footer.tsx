import {
  Box,
  Center,
  chakra,
  Container,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const Logo = (props: any) => {
  return (
    <Center>
      <Image
        w="140px"
        h="40px"
        alt="feature image"
        src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/545/8005182545_01d7c8f6-695a-442b-89d9-5cd1f63f57f9.png?cb=1671608255"
      />
    </Center>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
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
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Link href="/">
          <Logo />
        </Link>
        <Stack direction={"row"} spacing={6}>
          <Link href={"/"}>Início</Link>
          <Link href={"/about"}>Sobre</Link>
          <Link href={"/blog"}>Blog</Link>
          <Link href={"/contact"}>Contato</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            <Link href="/">Estagiar.io</Link> © 2023 - Todos os direitos
            reservados
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/estagiaario"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/estagiar.io/"}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
