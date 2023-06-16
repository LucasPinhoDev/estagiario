import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SocialProfileSimple() {
  return (
    <Center py={6}>
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
          src={
            "https://pbs.twimg.com/profile_images/1466443695176273924/HMwrsWjP_400x400.jpg"
          }
          mb={4}
          pos={"relative"}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Catolica SC - Joinville
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          @catolicasc
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
          fontSize="sm"
        >
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #developer
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #frontend
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #backend
          </Badge>
        </Stack>

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
      </Box>
    </Center>
  );
}
