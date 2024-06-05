import React from "react";
import { Link } from "react-router-dom";
import { Container, Text, VStack, HStack, Button } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to User Management System</Text>
        <HStack spacing={4}>
          <Button as={Link} to="/user-management" colorScheme="teal">
            Go to User Management
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
