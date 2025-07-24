import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import axios from 'axios';
import { Spinner } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import {
  Box, Button, Input, SimpleGrid, Heading
} from '@chakra-ui/react';
// import UserCard from '../../components/UserCard';
import { baseUrl } from '../../configs/config';

const UserList =()=>{

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [Loading, setLoading] = useState(false);


  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseUrl);;
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.firstName + ' ' + user.lastName).toLowerCase().includes(search.toLowerCase()) ||
    user.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.company?.title?.toLowerCase().includes(search.toLowerCase()) ||
    user.address?.country?.toLowerCase().includes(search.toLowerCase())
  );

  const addUser = () => {
    const newUser = {
      id: Date.now(),
      firstName: 'New',
      lastName: 'User',
      company: { name: 'Test Corp', title: 'Intern' },
      address: { country: 'Nowhere' },
    };
    setUsers([newUser, ...users]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };


  return (
    <div>
      
       <Box p={5}>
      <Heading mb={4}>User List</Heading>
      <Input
        placeholder="Search by name, company, role, or country"
        mb={4}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box mb={4}>
        <Button onClick={fetchUsers} colorScheme="blue" mr={2}>Refresh</Button>
        <Button onClick={addUser} colorScheme="green">+ Add </Button>

      </Box>

    </Box>{
      Loading ? (
        <Flex
        align="center"
        justify="center"
        >
    <Spinner size="xl" />
  </Flex>
) :
       <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader pl={20}>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Company Name</Table.ColumnHeader>
          <Table.ColumnHeader>Role</Table.ColumnHeader>
          <Table.ColumnHeader>Country</Table.ColumnHeader>
          <Table.ColumnHeader>Action</Table.ColumnHeader>

          </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredUsers.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell pl={20}>{item.firstName} {item.lastName}</Table.Cell>
            <Table.Cell>{item.company.name}</Table.Cell>
            <Table.Cell>{item.role}</Table.Cell>
            <Table.Cell>{item.address.country}</Table.Cell>
        
            <Table.Cell><Button onClick={()=>deleteUser(item.id)} colorScheme="green">Delete</Button></Table.Cell>

          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>}

    </div>
  )
}

export default UserList 