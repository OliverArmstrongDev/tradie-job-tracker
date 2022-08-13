import React, { useContext } from "react";
import { ActionIcon, Button, Stack, Popover } from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import { IconArrowsSort } from "@tabler/icons";
import { MainContext } from "../contexts/MainContext";

const SortAndFilter = () => {
  const { state, dispatch } = useContext(MainContext);

  const filterIcons = [
    {
      filterBy: (
        <Stack spacing="sm">
          {state.statuses.map((group, idx) => {
            return (
              <Button
                key={idx}
                onClick={() =>
                  dispatch({
                    type: "SET_JOBS_LISTSORT_FILTER",
                    payload: { filterBy: group.status },
                  })
                }
                color={group.colour}
              >
                {group.status}
              </Button>
            );
          })}
          <Button
            onClick={() =>
              dispatch({
                type: "SET_JOBS_LISTSORT_FILTER",
                payload: { filterBy: "" },
              })
            }
            color={"gray"}
            variant="outline"
          >
            No Filter
          </Button>
        </Stack>
      ),
    },
    {
      sortBy: (
        <Stack spacing="sm">
          <Button
            onClick={() =>
              dispatch({
                type: "SET_JOBS_LISTSORT_FILTER",
                payload: { sortBy: "Newest" },
              })
            }
            size="xs"
            variant="outline"
          >
            Newest On Top
          </Button>
          <Button
            onClick={() =>
              dispatch({
                type: "SET_JOBS_LISTSORT_FILTER",
                payload: { sortBy: "" },
              })
            }
            size="xs"
            variant="outline"
            color={"gray"}
          >
            No Sorting
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      {filterIcons.map((icon, idx) => (
        <Popover key={idx} width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <ActionIcon size="sm">
              {icon.sortBy ? <IconArrowsSort /> : <IconFilter />}
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            {icon.filterBy ? icon.filterBy : icon.sortBy}
            </Popover.Dropdown>
        </Popover>
      ))}
    </>
  );
};

export default SortAndFilter;
