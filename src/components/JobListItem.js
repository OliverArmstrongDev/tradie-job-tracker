import { UnstyledButton, Group, Button, HoverCard, Text } from "@mantine/core";

import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const JobListItem = ({ status, colour, JID, title, CUID }) => {
  const {getClientDataByClientID, dispatch} = useContext(MainContext);

  const handleJobItemClick = async () => {
    const selectedJob = await getClientDataByClientID(CUID);
    if(selectedJob) {dispatch({type: "CURRENTLY_SELECTED_CLIENT_DATA", payload: selectedJob });}
    
  }
  return (
    <UnstyledButton onClick={handleJobItemClick} mb={10}>
      <Group position="right">
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Button color={colour} size="xs" >{status[0]}</Button>
          </HoverCard.Target>
          <div>
            <Text>{JID}</Text>                      
            <Text size="xs" color="dimmed">
              {title}
            </Text>
          </div>
          <HoverCard.Dropdown>
            <Text size="sm">
             Job Status: {status}
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </UnstyledButton>
  );
};

export default JobListItem;
