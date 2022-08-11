import { Group } from "@mantine/core";
import JobListItem from "./JobListItem";
import { MainContext } from "../contexts/MainContext";
import { useContext } from "react";
import SortAndFilter from "./SortAndFilter";

const JobList = () => {
  const { state } = useContext(MainContext);

  const sortJobs = () => {
    if (state.JobListSortFilter.filterBy) {
      return state.JobListItems?.filter((job) =>
        state.JobListSortFilter.filterBy
          ? job.data.JobInfo.Status === state.JobListSortFilter.filterBy
          : job
      );
    }

    if (state.JobListSortFilter.sortBy === "Newest") {
      const sortedByDateList = [...state.JobListItems];
      return sortedByDateList.sort(
        (a, b) =>
          b.data.JobInfo.CreatedDate.toDate() -
          a.data.JobInfo.CreatedDate.toDate()
      );
    } else {
      return state.JobListItems;
    }
  };
  return (
    <div>
      <Group position="left">
        <h4>Filters:</h4>
        <SortAndFilter />
        {sortJobs().map((job) => {
          return (
            <JobListItem
              key={job.data.JobInfo.JUID}
              CUID={job.CUID}
              JID={job.data.JobInfo.JUID}
              title={job.data.JobInfo.Title}
              colour={state.statuses
                .filter((status) => status.status === job.data.JobInfo.Status)
                .map((res) => res.colour)
                .toString()}
              status={job.data.JobInfo.Status}
            />
          );
        })}
      </Group>
    </div>
  );
};

export default JobList;
