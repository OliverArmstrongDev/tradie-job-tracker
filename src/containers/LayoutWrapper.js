import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ScrollArea,
} from '@mantine/core';
import JobList from '../components/JobList';

function LayoutWrapper(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: "#fff",
        },
       
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar color={theme.colors.gray[0]} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ base: 260 }}>
            <Navbar.Section  grow component={ScrollArea} mb={10}><h3>Jobs List:</h3>
            <JobList />
            </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={60} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} p="md">
          <a href="http://https://oliverarmstrongdev.com" target="_blank" rel="noopener noreferrer"> Oliver Armstrong Dev</a>
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Tradie Job Tracker</Text>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}

export default LayoutWrapper;



