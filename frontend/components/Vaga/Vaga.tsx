import { Center, Flex, Stack, Text } from "@chakra-ui/react";

import { CardCompany } from "../../components";

export default function SimpleCard() {
  return (
    <Center>
      <Flex gap="40px" maxW="1000px" direction={{ base: "column", lg: "row" }}>
        <Flex bg="" my="30px" maxW="800px" direction="column" p="30px">
          <Stack spacing={3} py="30px">
            <Text as="b" fontSize="4xl">
              Título da vaga
            </Text>
            <Text fontSize="sm">Tipo de estágio: remoto</Text>
          </Stack>
          <Stack spacing={3} pb="60px">
            <Text fontSize="sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </Stack>
          <Stack spacing={3}>
            <Text fontSize="md" mb="30px">
              <strong>Responsabilidade desejada</strong>
              <br></br>Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <Text fontSize="md" mb="30px">
              <strong>Conhecimento necessário</strong>
              <br></br>Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <Text fontSize="md" mb="30px">
              <strong>Benefícios</strong>
              <br></br>Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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
          <CardCompany />
        </Flex>
      </Flex>
    </Center>
  );
}
