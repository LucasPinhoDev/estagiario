import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import algoliasearch from "algoliasearch";
import NextLink from "next/link";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "BXCTDNLOT5",
  "26c479b16550a5f879d70dce816791e7"
);

const indexName = "dev_estagiario";

interface Hit {
  objectID: string;
  title: string;
  occupationalCategory: string[];
  desc: string;
  image: string;
  jobLocationType: string;
  datePosted: string;
  desiredResponsibility: string;
  nececessaryKnowledge: string;
  benefits: string;
  hiringOrganization: {
    name: string;
    logo: string;
    applyLink: string;
    instagram: string;
    desc: string;
    about: string;
  };
  baseSalary: {
    currency: string;
    value: string;
  };
}

function HitCard({ hit }: { hit: Hit }) {
  return (
    <NextLink href={`/vaga/${hit.objectID}`} passHref>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={hit.hiringOrganization.logo}
          alt={hit.title}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{hit.title}</Heading>
            {hit.occupationalCategory.map((category) => (
              <Badge
                key={category}
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                {`#${category}`}
              </Badge>
            ))}
            <Text py="2">{hit.desc}</Text>
          </CardBody>
        </Stack>
      </Card>
    </NextLink>
  );
}

export default function SearchPage() {
  return (
    <Center className="center">
      <Flex gap="40px" maxW="1000px" direction={{ base: "column", lg: "row" }}>
        <InstantSearch indexName={indexName} searchClient={searchClient}>
          <Configure hitsPerPage={3} />
          <Box boxShadow="md" p="4" m="30">
            <SearchBox />
            <RefinementList attribute="occupationalCategory" />
            <Hits hitComponent={HitCard} />
            <Pagination />
            <Flex justify="center" mt="4">
              <Text fontSize="sm" color="gray.500">
                Powered by Algolia
              </Text>
            </Flex>
          </Box>
        </InstantSearch>
      </Flex>
    </Center>
  );
}
