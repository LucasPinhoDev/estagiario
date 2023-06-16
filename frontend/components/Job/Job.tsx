import { Center, Flex, Heading } from "@chakra-ui/react";

import { CardForm, CardJob } from "../../components";

export default function SimpleCard() {
  return (
    <Center>
      <Flex
        gap="40px"
        my="30px"
        maxW="1000px"
        direction={{ base: "column", lg: "row" }}
      >
        <Flex bg="" minW="calc(50% - 40px)" boxShadow="lg" direction="column">
          <Center>
            <Heading fontSize={"2xl"} mt="30px">
              Suas vagas
            </Heading>
          </Center>
          <CardJob />
        </Flex>
        <Flex bg="" minW="50%" justify="stretch">
          <CardForm />
        </Flex>
      </Flex>
    </Center>
  );
}
