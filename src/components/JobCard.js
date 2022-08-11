import { Group, Skeleton, Paper, Container, Button } from "@mantine/core";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import ClientDetails from "./ClientDetails";
import JobNotes from "./JobNotes";
import { IconPencilPlus, IconPencilOff } from "@tabler/icons";
import { useState } from "react";
import StatusButton from "./StatusButton";

const JobCard = () => {
  const { state } = useContext(MainContext);
  const [showNewNote, setShowNewNote] = useState(false);

  return (
    <div className="jobcard-container">
      {!state.dataIsLoaded ? (
        <Paper shadow="sm" radius="md" p="xl">
          <Group position="left" spacing="md">
            <h3>
              Job Status:
              <Skeleton mt={9} height={20} width="100%" radius="xl" />
            </h3>
            <Skeleton height={20} width="90%" radius="xl" />
            <Skeleton height={20} width="90%" radius="xl" />
            <Skeleton height={200} width="90%" radius="xl" />
          </Group>
        </Paper>
      ) : (
        <>
          <Group position="left">
            <h3>Job Status:</h3>
            <StatusButton />
          </Group>
          <Container size="sm" px="xs">
            <h1>{`${state.jobID} - ${state.jobTitle}`}</h1>
            <h4>Job Created: {state.jobCreatedDate}</h4>
            <ClientDetails />
            <h3>Job Notes:</h3>
            <Button
              onClick={() => setShowNewNote(!showNewNote)}
              leftIcon={!showNewNote ? <IconPencilPlus /> : <IconPencilOff />}
              variant="white"
              color="violet"
            >
              {!showNewNote ? "New Note" : "Cancel"}
            </Button>
            {showNewNote && (
              <JobNotes
                isNewNote={true}
                setShowNewNote={setShowNewNote}
                noteData={null}
              />
            )}
            {Object.entries(state.jobNotes).map((_noteData) => {
              const [noteKey, noteText] = _noteData;
              return (
                <JobNotes key={noteKey} noteKey={noteKey} noteData={noteText} />
              );
            })}
          </Container>
        </>
      )}
    </div>
  );
};

export default JobCard;
