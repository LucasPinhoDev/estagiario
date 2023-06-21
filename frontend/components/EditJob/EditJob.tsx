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
import React, { useState } from "react";

const EditJob = () => {
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "Job 1",
      jobLocationType: "Location 1",
      desc: "Description 1",
      desiredResponsibility: "Responsibility 1",
      necessaryKnowledge: "Knowledge 1",
      benefits: "Benefits 1",
      value: "Value 1",
      isOpen: false,
      isEditing: false,
      editFormData: {
        title: "",
        jobLocationType: "",
        desc: "",
        desiredResponsibility: "",
        necessaryKnowledge: "",
        benefits: "",
        value: "",
      },
    },
  ]);

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

  const handleEditJob = (jobId: any) => {
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
                  <Text>{job.jobLocationType}</Text>
                  <Text>{job.desc}</Text>
                  <Text>{job.desiredResponsibility}</Text>
                  <Text>{job.necessaryKnowledge}</Text>
                  <Text>{job.benefits}</Text>
                  <Text>{job.value}</Text>
                  <Button
                    mt="2"
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEditToggle(job.id)}
                  >
                    Modificar
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
