import { Box, Center, Heading, Image, Text } from "@chakra-ui/react";

export default function Alert404() {
  return (
    <Center h="100vh" bg="gray.100">
      <Box textAlign="center" py={10} px={6} w="100vh">
        <Center>
          <Image
            w="140px"
            h="40px"
            alt="feature image"
            src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/545/8005182545_01d7c8f6-695a-442b-89d9-5cd1f63f57f9.png?cb=1671608255"
          />
        </Center>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Opa, parece que essa página não existe. 😢
        </Heading>
        <Text color={"gray.500"}>
          Fique tranquilo, nós estamos trabalhando duro para apresentar novos
          componentes.
          <br></br>
          <a href="/">
            <strong>
              Clique aqui para voltar na página principal - ESTAGIAR.IO ❤
            </strong>
          </a>
        </Text>
      </Box>
    </Center>
  );
}
