import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    jobLocationType: "",
    desc: "",
    desiredResponsibility: "",
    necessaryKnowledge: "",
    benefits: "",
    value: "",
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
      title: "",
      jobLocationType: "",
      desc: "",
      desiredResponsibility: "",
      necessaryKnowledge: "",
      benefits: "",
      value: "",
    });
  };

  return (
    <Box bg="white" p={4}>
      <h1>Criar Vaga</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Título:</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tipo de Localização:</FormLabel>
          <Input
            type="text"
            name="jobLocationType"
            value={formData.jobLocationType}
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
          <FormLabel>Responsabilidades Desejadas:</FormLabel>
          <Textarea
            name="desiredResponsibility"
            value={formData.desiredResponsibility}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl>
          <FormLabel>Conhecimentos Necessários:</FormLabel>
          <Textarea
            name="necessaryKnowledge"
            value={formData.necessaryKnowledge}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl>
          <FormLabel>Benefícios:</FormLabel>
          <Textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
          ></Textarea>
        </FormControl>

        <FormControl>
          <FormLabel>Valor:</FormLabel>
          <Input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit" my="4" bg="green.400">
          Criar
        </Button>
      </form>
    </Box>
  );
};

export default CreateJob;
