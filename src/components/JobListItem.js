import { UnstyledButton, Group, HoverCard, Text, Badge } from "@mantine/core";
import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";

const JobListItem = ({ status, colour, JID, title, CUID }) => {
  const { getClientDataByClientID, dispatch, state } = useContext(MainContext);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleJobItemClick = async () => {
    const selectedJob = await getClientDataByClientID(CUID);
    if (selectedJob) {
      dispatch({
        type: "CURRENTLY_SELECTED_CLIENT_DATA",
        payload: selectedJob,
      });
    }
  };

  return (
    <UnstyledButton
      onClick={handleJobItemClick}
      mb={10}
      style={{
        backgroundColor: isHovering
          ? "#a3a3a37a"
          : state.CurrentlyViewedRecordUID === CUID
          ? "#a3a3a37a"
          : "",
        padding: "0 10px",
        borderRadius: "5px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Group position="right">
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Badge color={colour} size="xl" radius="sm" variant="filled">
              {status[0]}
            </Badge>
          </HoverCard.Target>
          <div>
            <Text>{JID}</Text>
            <Text size="xs">{title}</Text>
          </div>
          <HoverCard.Dropdown>
            <Text size="sm">Job Status: {status}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </UnstyledButton>
  );
};

export default JobListItem;
