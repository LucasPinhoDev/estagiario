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
}

function Job() {
  const router = useRouter();
  const { id } = router.query;

  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);

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
            <Stack spacing={3} pb="60px">
              <Text fontSize="sm">{vaga.desc}</Text>
            </Stack>
            <Stack spacing={3}>
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
                <strong>Benefícios</strong>
                <br></br>
                {vaga.benefits}
              </Text>
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
                <Link href={vaga.company?.website} passHref>
                  <Stack mt={8} direction={"row"} spacing={4}>
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
