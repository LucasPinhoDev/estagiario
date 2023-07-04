import {
  Box,
  chakra,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

interface FeatureProps {
  heading: string;
  text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export default function gridListWithCTA() {
  return (
    <Box as={Container} maxW="7xl" my={14} p={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Bem-vindo ao <strong>Estagiar.io</strong>
            </chakra.h2>

            <Text
              color={"green.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("green.50", "green.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              <a href="https://wa.me/5547996624794">Entre em contato!</a>
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              Criado como projeto de conclusão de curso da Engenharia de
              Software do Centro Universitário Católica de Santa Catarina, em
              Joinville, nosso objetivo é ajudar empresas a divulgar suas vagas
              e estudantes a encontrarem oportunidades de estágio. Acesse agora
              e comece sua busca por um estágio ou publique uma vaga para atrair
              talentos. Junte-se a nós para impulsionar sua carreira
              profissional!
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
    </Box>
  );
}
