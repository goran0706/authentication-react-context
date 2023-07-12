/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Center,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import UserModal from '../components/UserModal'
import { useAuth } from '../hooks/useAuth'
import { useUsers } from '../hooks/useUsers'

const Users = () => {
  const { users, error, updateUser, deleteUser } = useUsers()
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/sign-in" replace={true} />
  }

  if (error) {
    throw new Error(error)
  }

  return (
    <Center mt={20} px={5}>
      <TableContainer width="full">
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Users count {users.length}</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>first name</Th>
              <Th>last name</Th>
              <Th>full name</Th>
              <Th>email</Th>
              <Th>gender</Th>
              <Th>geolocation</Th>
              <Th>picture</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => {
              return (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.fullName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.gender}</Td>
                  <Td>{user.geolocation}</Td>
                  <Td>{user.picture}</Td>
                  <Td>
                    <Wrap>
                      <WrapItem>
                        <UserModal
                          user={user}
                          onSave={(user) => updateUser(user)}
                        />
                      </WrapItem>
                      <WrapItem>
                        <IconButton
                          aria-label="Delete User"
                          icon={<DeleteIcon />}
                          onClick={() => deleteUser(user)}
                        />
                      </WrapItem>
                    </Wrap>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  )
}

export default Users
