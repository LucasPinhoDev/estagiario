import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const CreateCompany = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    logo: "",
    location: "",
    instagram: "",
    desc: "",
    linkedin: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("token");

    try {
      const dataToSend = {
        ...formData,
        token,
      };

      const response = await axios.post(
        `${process.env.FETCH_URL}/company/createCompany`,
        dataToSend
      );

      if (response.status === 201) {
        setFormData({
          name: "",
          website: "",
          logo: "",
          location: "",

          instagram: "",
          desc: "",
          linkedin: "",
          description: "",
        });
        setSuccessMessage("Empresa cadastrada com sucesso!");
      } else {
        setErrorMessage("Erro ao enviar os dados:" + response.status);
      }
    } catch (error) {
      setErrorMessage("Erro ao enviar os dados:" + error);
    }
  };

  return (
    <Box bg="white" p={4}>
      <h1>Editar Empresa</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Nome:</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Website:</FormLabel>
          <Input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Logo:</FormLabel>
          <Input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Localização:</FormLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Instagram:</FormLabel>
          <Input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Descrição Curta:</FormLabel>
          <Textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl>
          <FormLabel>LinkedIn:</FormLabel>
          <Input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Descrição:</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></Textarea>
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
        <Button type="submit" my="4" colorScheme="green" size="sm">
          Salvar
        </Button>
      </form>
    </Box>
  );
};

export default CreateCompany;
