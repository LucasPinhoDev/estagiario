import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  jobLocationType: string;
  desc: string;
  desiredResponsibility: string;
  necessaryKnowledge: string;
  benefits: string;
  value: string;
  isOpen: boolean;
  isEditing: boolean;
  editFormData: {
    title: string;
    jobLocationType: string;
    desc: string;
    desiredResponsibility: string;
    necessaryKnowledge: string;
    benefits: string;
    value: string;
  };
}

const EditJob = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.post(`${process.env.FETCH_URL}/job/find`, {
        token: localStorage.getItem("token"),
        find: "many",
      });
      const jobsData = response.data;
      console.log(jobsData);

      setJobs(jobsData);
    } catch (error) {
      console.error("Erro ao buscar os trabalhos:", error);
    }
  };

  const handleToggle = (jobId: any) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            isOpen: !job.isOpen,
          };
        }
        return job;
      })
    );
  };

  const handleEditToggle = (jobId: any) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            isEditing: !job.isEditing,
            editFormData: { ...job.editFormData },
          };
        }
        return job;
      })
    );
  };

  const handleEditJobFieldChange = (jobId: any, e: any) => {
    const { name, value } = e.target;
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            editFormData: {
              ...job.editFormData,
              [name]: value,
            },
          };
        }
        return job;
      })
    );
  };

  const handleEditJob = async (jobId: any) => {
    const updatedJob = jobs.find((job) => job.id === jobId);

    if (
      updatedJob &&
      updatedJob.editFormData &&
      Object.keys(updatedJob.editFormData).length > 0
    ) {
      try {
        const response = await axios.post(
          `${process.env.FETCH_URL}/job/update`,
          {
            jobData: updatedJob,
          }
        );

        console.log("Trabalho atualizado com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao atualizar o trabalho:", error);
      }
    }

    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            isEditing: !job.isEditing,
            title: job.editFormData.title || job.title,
            jobLocationType:
              job.editFormData.jobLocationType || job.jobLocationType,
            desc: job.editFormData.desc || job.desc,
            desiredResponsibility:
              job.editFormData.desiredResponsibility ||
              job.desiredResponsibility,
            necessaryKnowledge:
              job.editFormData.necessaryKnowledge || job.necessaryKnowledge,
            benefits: job.editFormData.benefits || job.benefits,
            value: job.editFormData.value || job.value,
          };
        }
        return job;
      })
    );
  };

  const handleDelete = async (jobId: string) => {
    try {
      await axios.post(`${process.env.FETCH_URL}/job/delete`, {
        jobId,
      });
      console.log("Vaga excluída com sucesso!");

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Erro ao excluir a vaga:", error);
    }
  };

  return (
    <Box bg="white" p={4}>
      <Heading size="md" mb={4}>
        Vagas de Emprego
      </Heading>
      {jobs.map((job) => (
        <Box key={job.id} bg="gray.100" borderRadius="md" p={4} mb={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md">{job.title}</Heading>
            <IconButton
              aria-label={job.isOpen ? "Fechar Detalhes" : "Abrir Detalhes"}
              icon={job.isOpen ? <MinusIcon /> : <AddIcon />}
              onClick={() => handleToggle(job.id)}
            />
          </Flex>
          <Collapse in={job.isOpen} animateOpacity>
            <Box mt={4}>
              {job.isEditing ? (
                <>
                  <Input
                    type="text"
                    name="title"
                    value={job.editFormData.title || job.title}
                    onChange={(e) => handleEditJobFieldChange(job.id, e)}
                    mb="2"
                  />
                  <Input
                    type="text"
                    name="jobLocationType"
                    value={
                      job.editFormData.jobLocationType || job.jobLocationType
                    }
                    onChange={(e) => handleEditJobFieldChange(job.id, e)}
                    mb="2"
                  />
                  <Textarea
                    name="desc"
                    value={job.editFormData.desc || job.desc}
                    onChange={(e) => handleEditJobFieldChange(job.id, e)}
                    mb="2"
                  />
                  <Textarea
                    name="desiredResponsibility"
                    value={
                      job.editFormData.desiredResponsibility ||
                      job.desiredResponsibility
                    }
                    onChange={(e) => handleEditJobFieldChange(job.id, e)}
                    mb="2"
                  />
                  <Textarea
                    name="necessaryKnowledge"
                    value={
                      job.editFormData.necessaryKnowledge ||
                      job.necessaryKnowledge
                    }
                    onChange={(e) => handleEditJobFieldChange(job.id, e)}
                    mb="2"
                  />
                  <Textarea
                    name="benefits"
                    value={job.editFormData.benefits || job.benefits}
                    onChange={(e) => handleEditJobFieldChange(job.id, e)}
                    mb="2"
                  />
                  <Textarea
                    name="value"
                    value={job.editFormData.value || job.value}
                    onChange={(e) => handleEditJobFieldChange(job.id, e)}
                    mb="2"
                  />
                  <Button
                    mt="2"
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEditJob(job.id)}
                  >
                    Salvar
                  </Button>
                </>
              ) : (
                <>
                  <Text>
                    <strong>Localização:</strong> {job.jobLocationType}
                  </Text>
                  <Text>
                    <strong>Descrição: </strong>
                    {job.desc}
                  </Text>
                  <Text>
                    <strong>Responsabilidades: </strong>
                    {job.desiredResponsibility}
                  </Text>
                  <Text>
                    <strong>Conhecimento necessário: </strong>
                    {job.necessaryKnowledge}
                  </Text>
                  <Text>
                    <strong>Beneficios: </strong>
                    {job.benefits}
                  </Text>
                  <Text>
                    <strong>Valor da vaga: </strong>
                    {job.value}
                  </Text>
                  <Button
                    mt="2"
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEditToggle(job.id)}
                  >
                    Modificar
                  </Button>
                  <Button
                    mt="2"
                    colorScheme="red"
                    size="sm"
                    ml="1"
                    onClick={() => handleDelete(job.id)}
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

export default EditJob;
