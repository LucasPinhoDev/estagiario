import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário já está autenticado
    if (isAuthenticated()) {
      router.push("/vagas");
    }
  }, []);

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const isValidToken = !!token;
    return isValidToken;
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3100/auth/login", {
        email,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        router.push("/companyBoard");
      } else {
        setErrorMessage("Erro ao fazer login. Tente novamente mais tarde.");
      }
    } catch (error) {
      setErrorMessage("Credenciais inválidas. Verifique seu email e senha.");
      console.error(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Center>
          <a href="/">
            <Image
              w="200px"
              h="60px"
              alt="feature image"
              src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/545/8005182545_01d7c8f6-695a-442b-89d9-5cd1f63f57f9.png?cb=1671608255"
            />
          </a>
        </Center>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" w="300px">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <Text color="red.500" mt={2} fontSize="sm">
                  {errorMessage}
                </Text>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </Stack>
            <Stack pt={3}>
              <Text align={"center"}>
                <Link href="/register" color={"blue.400"}>
                  Fazer uma Conta
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
