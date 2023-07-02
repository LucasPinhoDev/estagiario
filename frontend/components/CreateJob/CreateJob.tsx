import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateJob = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userCompanies, setUserCompanies] = useState<
    { id: string; name: string }[]
  >([]);
  const [formData, setFormData] = useState({
    title: "",
    jobLocationType: "",
    desc: "",
    desiredResponsibility: "",
    necessaryKnowledge: "",
    benefits: "",
    applyLink: "",
    value: "",
    companyId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "company") {
      const selectedCompany = userCompanies.find(
        (company) => company.id === value
      );
      if (selectedCompany) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          companyId: selectedCompany.id,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        value: parseInt(formData.value, 10),
        token: localStorage.getItem("token"),
      };

      const response = await axios.post(
        `${process.env.FETCH_URL}/job/createJob`,
        dataToSend
      );

      if (response.status === 201) {
        console.log("Dados enviados com sucesso!");

        setFormData({
          title: "",
          jobLocationType: "",
          desc: "",
          desiredResponsibility: "",
          necessaryKnowledge: "",
          benefits: "",
          applyLink: "",
          value: "",
          companyId: "",
        });
        setSuccessMessage("Vaga cadastrada com sucesso!");
      } else {
        setErrorMessage("Erro ao enviar os dados:" + response.status);
      }
    } catch (error) {
      setErrorMessage("Erro ao enviar os dados:" + error);
    }
  };

  useEffect(() => {
    const fetchUserCompanies = async () => {
      try {
        const response = await axios.post(
          `${process.env.FETCH_URL}/company/find`,
          { token: localStorage.getItem("token"), find: "byId" }
        );

        setUserCompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCompanies();
  }, []);

  return (
    <Box bg="white" p={4}>
      <h1>Criar Vaga</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Empresa:</FormLabel>
          <Select
            name="company"
            value={formData.companyId} // Atualize para formData.companyId
            onChange={handleChange}
          >
            <option value="">Selecione uma empresa</option>
            {userCompanies &&
              userCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Título:</FormLabel>
          <Input
            placeholder="Digite o título da vaga"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Formato do trabalho</FormLabel>
          <Input
            placeholder="Remoto/Presencial/Híbrido"
            type="text"
            name="jobLocationType"
            value={formData.jobLocationType}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Descrição:</FormLabel>
          <Textarea
            placeholder="Digite uma descrição sobre a vaga"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Responsabilidades Desejadas:</FormLabel>
          <Textarea
            placeholder="Digite as responsabilidades desejadas"
            name="desiredResponsibility"
            value={formData.desiredResponsibility}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Conhecimentos Necessários:</FormLabel>
          <Textarea
            placeholder="Digite os conhecimentos desejados"
            name="necessaryKnowledge"
            value={formData.necessaryKnowledge}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Benefícios:</FormLabel>
          <Textarea
            placeholder="Digite os benefícios da vaga"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>WhatsApp receber aplicantes:</FormLabel>
          <Input
            placeholder="47930003000"
            type="text"
            name="applyLink"
            value={formData.applyLink}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Valor:</FormLabel>
          <Input
            placeholder="1500"
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </FormControl>

        {errorMessage && (
          <Text color="red.500" mt={2} fontSize="sm">
            {errorMessage}
          </Text>
        )}
        {successMessage && (
          <Text color="green.500" mt={2} fontSize="sm">
            {successMessage}
          </Text>
        )}

        <Button type="submit" my="4" bg="green.400">
          Criar
        </Button>
      </form>
    </Box>
  );
};

export default CreateJob;
