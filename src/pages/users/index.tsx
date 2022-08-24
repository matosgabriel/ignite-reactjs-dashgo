import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '~/components/Header';
import { Pagination } from '~/components/Pagination';
import { Sidebar } from '~/components/Sidebar';
import { api } from '~/services/api';
import { useUsers } from '~/services/hooks/useUsers';

export default function UserList() {
  const { data: users, isLoading, isFetching, error } = useUsers();
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["3", "6"]}>
          <Sidebar />
          
          <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Usuários
                { isFetching && !isLoading && <Spinner size='sm' color='gray.500' ml='4' /> }
              </Heading>

              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>

            { isLoading ? (
                <Flex justify='center'>
                  <Spinner />
                </Flex> 
              ) : error ? (
                <Flex justify='center'>
                  <Text>Falha ao obter dados dos usuários</Text>
                </Flex>
              ) : (
                <>
                  <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["2", "3", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th px={["2", "3", "6"]}>Usuários</Th>
                      { isWideVersion && <Th>Data de cadastro</Th> }
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { users.map(user => {
                      return (
                        <Tr key={user.id}>
                          <Td px={["2", "3", "6"]}>
                            <Checkbox colorScheme="pink" />
                          </Td>
                          <Td px={["2", "3", "6"]}>
                            <Box>
                              <Text fontWeight="bold">{user.name}</Text>
                              <Text fontSize="sm" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          { isWideVersion && <Td>{user.createdAt}</Td>}
                          <Td>
                            <Button
                              as="a"
                              colorScheme="purple"
                              size="sm"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                              pr={!isWideVersion && 1}
                            >
                              { isWideVersion && 'Editar' }
                            </Button>
                          </Td>
                        </Tr>
                      );
                    }) }
                  </Tbody>
                </Table>

                <Pagination />
                </>
              )
            }
          </Box>
        </Flex>
      </Box>
    </>
  );
}