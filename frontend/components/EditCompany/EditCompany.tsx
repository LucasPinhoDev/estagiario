import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

const EditCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    logo: "",
    location: "",
    applyLink: "",
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aqui você pode fazer o envio dos dados do formulário para a API ou fazer o tratamento necessário.

    // Resetar os campos após o envio
    setFormData({
      name: "",
      website: "",
      logo: "",
      location: "",
      applyLink: "",
      instagram: "",
      desc: "",
      linkedin: "",
      description: "",
    });
  };

  return (
    <Box bg="white" p={4}>
      <h1>Editar Empresa</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
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

        <FormControl>
          <FormLabel>Localização:</FormLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Link de Candidatura:</FormLabel>
          <Input
            type="text"
            name="applyLink"
            value={formData.applyLink}
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
          <FormLabel>Descrição:</FormLabel>
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

        <FormControl>
          <FormLabel>Descrição Completa:</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <Button type="submit" my="4" bg={"green.400"}>
          Salvar
        </Button>
      </form>
    </Box>
  );
};

export default EditCompany;
