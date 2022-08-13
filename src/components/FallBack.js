import React from "react";
import { Button, Container, Paper, Text } from "@mantine/core";

const FallBack = ({ error, resetErrorBoundary }) => {
  return (
    <div className="Error">
      <Container> 
      <Paper my={40} shadow="sm" radius="md" p="xl">
        <h1>😖 Something went wrong:</h1>
        <p>The error is: {error.message}</p>
        <Text mt={50}>
          Click the button below to reload the data...
        </Text>
        <Button mt={40} onClick={resetErrorBoundary}>Reload</Button>
        </Paper>
        </Container>
    </div>
  );
};

export default FallBack;
