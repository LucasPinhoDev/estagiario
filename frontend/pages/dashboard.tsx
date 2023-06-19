import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Footer, Job, NavBar } from "../components";

const userType = "company";

function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redireciona para a página de login
      return;
    }

    if (userType !== "company" || !userType) {
      router.push("/vagas"); // Redireciona para uma página de não autorizado
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Center>
        <Tabs isFitted variant="enclosed" m="30px" boxShadow="lg">
          <TabList mb="1em">
            <Tab>
              <strong>Suas Vagas</strong>
            </Tab>
            <Tab>
              <strong>Seus Candidatos</strong>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Job />
            </TabPanel>
            <TabPanel>
              <Job />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
      <Footer />
    </>
  );
}

export default Dashboard;
