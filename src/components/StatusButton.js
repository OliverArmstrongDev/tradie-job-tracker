import { Popover, Button, Stack } from "@mantine/core";
import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { IconChevronDown } from "@tabler/icons";
import { useEffect } from "react";

const StatusButton = () => {
  const { state, updateStatusInDB, dispatch } = useContext(MainContext);

  const handleStatusChange = async (color, status) => {
    await updateStatusInDB(
      {
        JobInfo: {
          Status: status,
        },
      },
      state.clientUID
    );
    dispatch({ type: "SET_CURRENT_STATUS_COLOUR", payload: color });
  };

  useEffect(() => {
    try {
      const initialButtonColour = state.statuses
        .filter((status) => status.status === state.jobStatus)
        .map((res) => res.colour)
        .toString();
      dispatch({
        type: "SET_CURRENT_STATUS_COLOUR",
        payload: initialButtonColour,
      });
    } catch (error) {
      console.log(error);
    }
  }, [state.jobStatus, state.statuses, dispatch]);

  return (
    <div>
      <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Button
            rightIcon={<IconChevronDown />}
            variant="filled"
            color={state.CurrentStatusColour}
          >
            {state.jobStatus}
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack spacing="sm">
            {state.statuses.map((group, idx) => {
              return (
                <Button
                  key={idx}
                  onClick={() => handleStatusChange(group.colour, group.status)}
                  color={group.colour}
                >
                  {group.status}
                </Button>
              );
            })}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default StatusButton;
