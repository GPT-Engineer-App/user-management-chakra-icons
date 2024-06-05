import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Text, VStack, HStack, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { FaUserPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

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

const UserManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "", role: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      id: users.length + 1,
      username: formData.username,
      password: formData.password,
      role: formData.role,
      createdAt: new Date().toLocaleString(),
    };

    setUsers([...users, newUser]);
    setFormData({ username: "", password: "", confirmPassword: "", role: "" });
    onClose();
  };

  return (
    <Container maxW="container.lg" py={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">User Management</Text>
        <Button leftIcon={<FaUserPlus />} colorScheme="teal" onClick={onOpen}>
          Create User
        </Button>
      </HStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Username</Th>
            <Th>Password</Th>
            <Th>Role</Th>
            <Th>Created Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={user.id}>
              <Td>{index + 1}</Td>
              <Td>{user.username}</Td>
              <Td>{user.password}</Td>
              <Td>{user.role}</Td>
              <Td>{user.createdAt}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton aria-label="View" icon={<FaEye />} />
                  <IconButton aria-label="Edit" icon={<FaEdit />} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="username" value={formData.username} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="confirmPassword" isRequired mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="role" isRequired mt={4}>
              <FormLabel>Role</FormLabel>
              <Select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCreateUser}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
