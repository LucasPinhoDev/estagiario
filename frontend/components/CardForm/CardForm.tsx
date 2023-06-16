import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";

export default function SimpleCookiePreference() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="lg"
      p={4}
      color={useColorModeValue("gray.700", "whiteAlpha.900")}
      shadow="base"
      w="100%"
    >
      <Center>
        <Heading fontSize={"2xl"} mb="30px">
          Postar vagas
        </Heading>
      </Center>
      <VStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Título da vaga</FormLabel>
          <InputGroup>
            <InputLeftElement children={<MdOutlineEmail />} />
            <Input type="text" name="text" placeholder="Título da vaga" />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tipo de estágio</FormLabel>
          <Select placeholder="Selecione o tipo de estágio">
            <option value="option1">Remoto</option>
            <option value="option2">Hibrido</option>
            <option value="option3">Presencial</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Responsabilidade desejada</FormLabel>

          <Textarea
            name="message"
            placeholder="Descreva sobre sua vaga"
            rows={3}
            resize="none"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Conhecimento necessário</FormLabel>

          <Textarea
            name="message"
            placeholder="Descreva sobre sua vaga"
            rows={3}
            resize="none"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Benefícios</FormLabel>

          <Textarea
            name="message"
            placeholder="Descreva sobre sua vaga"
            rows={3}
            resize="none"
          />
        </FormControl>

        <Button
          colorScheme="blue"
          bg="green.400"
          color="white"
          _hover={{
            bg: "green",
          }}
        >
          Postar vaga
        </Button>
      </VStack>
    </Box>
  );
}
