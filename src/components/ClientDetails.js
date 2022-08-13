import { Table, Paper } from "@mantine/core";
import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const ClientDetails = () => {
  const { state } = useContext(MainContext);

  return (
    <div>
      <Paper shadow="sm" radius="md" p="lg">
        <Table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "left" }}>
              <td>{`${state.clientFirstName} ${state.clientLastName}`}</td>
              <td>
                <a href={`tel:${state.clientMobile}`}>{state.clientMobile}</a>{" "}
              </td>
              <td>
                <a href={`mailto:${state.clientEmail}`}>{state.clientEmail}</a>{" "}
              </td>
              <td>{`${state.clientAddress.Street}, ${state.clientAddress.City}, ${state.clientAddress.PostCode}`}</td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    </div>
  );
};

export default ClientDetails;
