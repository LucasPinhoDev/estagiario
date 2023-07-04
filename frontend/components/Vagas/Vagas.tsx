import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 5; // Defina o número de itens por página

interface Job {
  id: string;
  title: string;
  desc: string;
  company: {
    logo: string;
  };
}

function HitCard({ job }: { job: Job }) {
  return (
    <NextLink href={`/vaga/${job.id}`} passHref>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        {job.company?.logo ? ( // Verificar se job.company.logo existe
          <Image
            objectFit="cover"
            boxSize={{ base: "60%", sm: "150px" }}
            maxWidth={{ base: "100%", sm: "150px" }}
            maxHeight={{ base: "150px", sm: "150px" }}
            src={job.company.logo}
            alt={job.title}
            pl="2"
            margin="auto" // Adiciona essa propriedade para centralizar a imagem
          />
        ) : (
          <Box w={{ base: "60%", sm: "150px" }} />
        )}

        <Stack>
          <CardBody>
            <Heading size="md">{job.title}</Heading>
            <Text py="2">{job.desc}</Text>
          </CardBody>
        </Stack>
      </Card>
    </NextLink>
  );
}

export default function SearchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.FETCH_URL}/job/findAll`,
          {
            params: { params: searchValue }, // Enviar o parâmetro como 'params'
          }
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Erro ao buscar as vagas", error);
      }
    };

    fetchJobs();
  }, [searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Função para avançar para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Função para voltar para a página anterior
  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Filtrar os itens com base na página atual e no limite de itens por página
  const filteredJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Center className="center">
      <Flex gap="40px" maxW="1000px" direction={{ base: "column", lg: "row" }}>
        <Box boxShadow="md" p="4" m="30">
          <Flex justify="flex-end" mb={2}>
            <Input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Pesquise sua vaga"
              w="400"
            />
            <IconButton
              ml={1}
              variant="outline"
              colorScheme="teal"
              icon={<SearchIcon />}
              aria-label="Pesquisar"
            />
          </Flex>
          <Stack spacing="4">
            {filteredJobs.map((job) => (
              <HitCard key={job.id} job={job} />
            ))}
          </Stack>
          <Flex justify="center" mt="4">
            {/* Exibir botão de página anterior apenas se não estiver na primeira página */}
            {currentPage > 1 && (
              <button onClick={previousPage} style={{ margin: "0 4px" }}>
                Voltar
              </button>
            )}
            {/* Exibir botão de próxima página apenas se houver mais itens para exibir */}
            {jobs.length > currentPage * ITEMS_PER_PAGE && (
              <button onClick={nextPage} style={{ margin: "0 4px" }}>
                Avançar
              </button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
}
