import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Persista</Heading>
          <Text textAlign="center">
            As oportunidades são como o pôr do sol. Se você esperar demais,
            acaba perdendo. Há três coisas na vida que nunca voltam atrás: a
            flecha lançada, a palavra pronunciada e oportunidade perdida. As
            oportunidades não voltam só porque você se arrependeu.
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Confiança e Trabalho</TestimonialHeading>
              <TestimonialText>
                "Só existe um jeito de vencer: dedicação, confiança e trabalho"
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOf8vtK416eLDoSyq--ySZj3UsH3QohOD67v28rgazpA&s&w=100&q=80"
              }
              name={"Bernadinho"}
              title={"Técnico de vôlei"}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Não Desista</TestimonialHeading>
              <TestimonialText>
                "Sejamos incontroláveis, então... e que a gente não desista
                porque ninguém acredita"
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                "https://aventurasnahistoria.uol.com.br/media/uploads/machadao229301031.jpg"
              }
              name={"Machado de Assis"}
              title={"Escritor"}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Sem Meio-Termo</TestimonialHeading>
              <TestimonialText>
                "No que diz respeito ao empenho, <br></br>ao compromisso, ao
                esforço, à dedicação, não existe meio-termo.<br></br> Ou você
                faz uma coisa bem-feita ou não faz"
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                "data:image/jpeg;base64,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"
              }
              name={"Ayrton Senna"}
              title={"Piloto"}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
