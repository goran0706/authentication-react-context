import {
  Box,
  Button,
  Flex,
  Spacer,
  Stack,
  Text,
  useColorMode
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { token, signOut } = useAuth()
  const { toggleColorMode } = useColorMode()

  return (
    <Box>
      <Flex direction={['column', 'row']} p={4} bgColor="gray.700">
        <Text color="white">Logo</Text>
        <Spacer />
        <Stack direction={['column', 'row']}>
          <Button onClick={toggleColorMode}>Toggle Mode</Button>
          {token ? (
            <>
              <Button as={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button as={Link} to="/users">
                Users
              </Button>
              <Button onClick={signOut}>Logout</Button>
            </>
          ) : (
            <Button as={Link} to="sign-in">
              Sign In
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  )
}

export default Navbar
