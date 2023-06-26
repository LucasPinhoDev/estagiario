import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Company {
  id: string;
  name: string;
  website: string;
  location: string;
  instagram: string;
  linkedin: string;
  description: string;
  isOpen: boolean;
  isEditing: boolean;
  editFormData: {
    name: string;
    website: string;
    location: string;
    instagram: string;
    linkedin: string;
    description: string;
  };
}

const EditCompany = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.post(
        `${process.env.FETCH_URL}/company/find`,
        {
          token: localStorage.getItem("token"),
          find: "many",
        }
      );
      const companiesData = response.data;
      console.log(companiesData);

      // Atualize os dados das empresas com as novas informações
      const updatedCompanies = companiesData.map((company: Company) => ({
        ...company,
        isOpen: false,
        isEditing: false,
        editFormData: {
          name: company.name,
          website: company.website,
          location: company.location,
          instagram: company.instagram,
          linkedin: company.linkedin,
          description: company.description,
        },
      }));

      setCompanies(updatedCompanies);
    } catch (error) {
      console.error("Erro ao buscar as empresas:", error);
    }
  };

  const handleCompanyToggle = (companyId: string) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            isOpen: !company.isOpen,
          };
        }
        return company;
      })
    );
  };

  const handleCompanyEditToggle = (companyId: string) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            isEditing: !company.isEditing,
            editFormData: { ...company.editFormData },
          };
        }
        return company;
      })
    );
  };

  const handleCompanyEditFieldChange = (
    companyId: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            editFormData: {
              ...company.editFormData,
              [name]: value,
            },
          };
        }
        return company;
      })
    );
  };

  const handleCompanyEdit = async (companyId: string) => {
    const updatedCompany = companies.find(
      (company) => company.id === companyId
    );

    if (
      updatedCompany &&
      updatedCompany.editFormData &&
      Object.keys(updatedCompany.editFormData).length > 0
    ) {
      try {
        const response = await axios.post(
          `${process.env.FETCH_URL}/company/update`,
          {
            companyData: updatedCompany,
          }
        );

        console.log("Empresa atualizada com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao atualizar a empresa:", error);
      }
    }

    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            isEditing: !company.isEditing,
            name: company.editFormData.name || company.name,
            location: company.editFormData.location || company.location,
            description:
              company.editFormData.description || company.description,
          };
        }
        return company;
      })
    );
  };

  const handleCompanyDelete = async (companyId: string) => {
    try {
      await axios.post(`${process.env.FETCH_URL}/company/delete`, {
        companyId,
      });
      console.log("Empresa excluída com sucesso!");

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
    } catch (error) {
      console.error("Erro ao excluir a empresa:", error);
    }
  };

  return (
    <Box bg="white" p={4}>
      <Heading size="md" mb={4}>
        Empresas
      </Heading>
      {companies.map((company) => (
        <Box key={company.id} bg="gray.100" borderRadius="md" p={4} mb={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md">{company.name}</Heading>
            <IconButton
              aria-label={company.isOpen ? "Fechar Detalhes" : "Abrir Detalhes"}
              icon={company.isOpen ? <MinusIcon /> : <AddIcon />}
              onClick={() => handleCompanyToggle(company.id)}
            />
          </Flex>
          <Collapse in={company.isOpen} animateOpacity>
            <Box mt={4}>
              {company.isEditing ? (
                <>
                  <FormLabel>Nome:</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={company.editFormData.name || company.name}
                    onChange={(e) =>
                      handleCompanyEditFieldChange(company.id, e)
                    }
                    mb="2"
                  />
                  <FormLabel>Localização:</FormLabel>
                  <Input
                    type="text"
                    name="location"
                    value={company.editFormData.location || company.location}
                    onChange={(e) =>
                      handleCompanyEditFieldChange(company.id, e)
                    }
                    mb="2"
                  />
                  <FormLabel>Descrição:</FormLabel>
                  <Textarea
                    name="description"
                    value={
                      company.editFormData.description || company.description
                    }
                    onChange={(e) =>
                      handleCompanyEditFieldChange(company.id, e)
                    }
                    mb="2"
                  />
                  <FormLabel>Site:</FormLabel>
                  <Input
                    type="text"
                    name="website"
                    value={company.editFormData.website || company.website}
                    onChange={(e) =>
                      handleCompanyEditFieldChange(company.id, e)
                    }
                    mb="2"
                  />
                  <FormLabel>Instagram:</FormLabel>
                  <Input
                    type="text"
                    name="instagram"
                    value={company.editFormData.instagram || company.instagram}
                    onChange={(e) =>
                      handleCompanyEditFieldChange(company.id, e)
                    }
                    mb="2"
                  />
                  <FormLabel>Linkedin:</FormLabel>
                  <Input
                    type="text"
                    name="linkedin"
                    value={company.editFormData.linkedin || company.linkedin}
                    onChange={(e) =>
                      handleCompanyEditFieldChange(company.id, e)
                    }
                    mb="2"
                  />
                  <Button
                    mt="2"
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleCompanyEdit(company.id)}
                  >
                    Salvar
                  </Button>
                </>
              ) : (
                <>
                  <Text>
                    <strong>Localização:</strong> {company.location}
                  </Text>
                  <Text>
                    <strong>Descrição:</strong> {company.description}
                  </Text>
                  <Text>
                    <strong>Website:</strong> {company.website}
                  </Text>
                  <Text>
                    <strong>Localização:</strong> {company.location}
                  </Text>
                  <Text>
                    <strong>Instagram:</strong> {company.instagram}
                  </Text>
                  <Text>
                    <strong>LinkedIn:</strong> {company.linkedin}
                  </Text>
                  <Text>
                    <strong>Descrição:</strong> {company.description}
                  </Text>
                  <Button
                    mt="2"
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleCompanyEditToggle(company.id)}
                  >
                    Modificar
                  </Button>
                  <Button
                    mt="2"
                    colorScheme="red"
                    size="sm"
                    ml="1"
                    onClick={() => handleCompanyDelete(company.id)}
                  >
                    Excluir
                  </Button>
                </>
              )}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default EditCompany;
