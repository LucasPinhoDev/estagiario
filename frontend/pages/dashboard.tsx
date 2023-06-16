import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { Footer, Job, NavBar } from "../components";

function Login() {
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

export default Login;
