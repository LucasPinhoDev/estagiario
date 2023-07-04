import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { AlertBrief, Footer, NavBar } from "../../components";

interface Vaga {
  id: string;
  title: string;
  jobLocationType: string;
  desc: string;
  desiredResponsibility: string;
  necessaryKnowledge: string;
  benefits: string;
  value: number;
  company: {
    name: string;
    website: string;
    logo: string;
    desc: string;
    description: string;
  };
  applyLink: string;
}

function Job() {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchVagaDetalhes() {
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.FETCH_URL}/job/findById?id=${id}`
          );

          setVaga(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar os detalhes da vaga:", error);
        setLoading(false);
      }
    }

    setIsUserLoggedIn(localStorage.getItem("token") !== null);

    fetchVagaDetalhes();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!vaga) {
    return <AlertBrief />;
  }

  return (
    <>
      <NavBar />
      <Center>
        <Flex
          gap="40px"
          maxW="1000px"
          direction={{ base: "column", lg: "row" }}
        >
          <Flex bg="" my="30px" maxW="800px" direction="column" p="30px">
            <Stack spacing={3} py="30px">
              <Text as="b" fontSize="4xl">
                {vaga.title}
              </Text>
              <Text fontSize="sm">Tipo de estágio: {vaga.jobLocationType}</Text>
            </Stack>
            <Stack pb="60px">
              <strong>Descrição da vaga</strong>
              <Text fontSize="sm">{vaga.desc}</Text>
            </Stack>
            <Stack>
              <Text fontSize="md" mb="30px">
                <strong>Responsabilidade desejada</strong>
                <br></br>
                {vaga.desiredResponsibility}
              </Text>
              <Text fontSize="md" mb="30px">
                <strong>Conhecimento necessário</strong>
                <br></br>
                {vaga.necessaryKnowledge}
              </Text>
              <Text fontSize="md" mb="30px">
                <br></br>
                <strong>Benefícios</strong>
                <br></br>
                {vaga.benefits}
              </Text>
              <Stack spacing={3} pb="60px">
                <br></br>
                <strong>Sobre a empresa da empresa</strong>
                <Text fontSize="md">{vaga.company.description}</Text>
              </Stack>
            </Stack>
          </Flex>
          <Flex
            bg=""
            minW="30%"
            justify="center"
            maxH="600px"
            mt={{ lg: "5px", sm: "-50px" }}
            mb="10px"
          >
            <Center pt={100}>
              <Box
                maxW={"320px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
              >
                <Avatar
                  size={"xl"}
                  src={vaga.company.logo}
                  mb={4}
                  pos={"relative"}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {vaga.company.name}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} mb={4}>
                  <a
                    href={vaga.company.website}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(vaga.company.website);
                    }}
                  >
                    Site da empresa
                  </a>
                </Text>

                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                  fontSize="sm"
                >
                  {vaga.company.desc}
                </Text>

                <Stack
                  align={"center"}
                  justify={"center"}
                  direction={"row"}
                  mt={6}
                >
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue("gray.50", "gray.800")}
                    fontWeight={"400"}
                  >
                    {`#${vaga.jobLocationType}`}
                  </Badge>
                </Stack>
                <Link
                  href={
                    isUserLoggedIn
                      ? "https://wa.me/55" +
                        vaga.applyLink +
                        "?text=Olá,%20tenho%20interesse%20nessa%20vaga%20de%20estágio. " +
                        vaga.title +
                        " - Identificador da Vaga : " +
                        vaga.id
                      : "/login" // Redirecionar para a página de login se o usuário não estiver logado
                  }
                  passHref
                >
                  <Stack mt={8} direction={"row"} spacing={4}>
                    {isUserLoggedIn ? (
                      <Button
                        flex={1}
                        fontSize={"sm"}
                        rounded={"full"}
                        bg={"blue.400"}
                        color={"white"}
                        boxShadow={
                          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                          bg: "blue.500",
                        }}
                        _focus={{
                          bg: "blue.500",
                        }}
                      >
                        Aplicar na vaga
                      </Button>
                    ) : (
                      <Button
                        flex={1}
                        fontSize={"sm"}
                        rounded={"full"}
                        bg={"blue.400"}
                        color={"white"}
                        boxShadow={
                          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                          bg: "blue.500",
                        }}
                        _focus={{
                          bg: "blue.500",
                        }}
                      >
                        <Link href="/login" passHref>
                          Entrar para aplicar
                        </Link>
                      </Button>
                    )}
                  </Stack>
                </Link>
              </Box>
            </Center>
          </Flex>
        </Flex>
      </Center>
      <Footer />
    </>
  );
}

export default Job;
