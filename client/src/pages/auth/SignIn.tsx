/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, isError, isLoading, signIn } = useAuth()

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
  }

  const handleReset = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    void signIn(email, password)
  }

  return (
    <Center mt={40}>
      <VStack p={8} borderRadius="md" w={{ sm: '400px' }}>
        <Heading as="h2" size="xl" mb={8}>
          Sign In
        </Heading>
        <Box w="full">
          <form onSubmit={handleSubmit}>
            <VStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </FormControl>
              {isError && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <Box my={4}>
                <Link to="/sign-up">Don't have an account? Sign Up</Link>
              </Box>
              <Stack
                direction={['column', 'row']}
                justifyContent="flex-end"
                w="100%"
              >
                <Button
                  colorScheme="teal"
                  isLoading={isLoading}
                  type="reset"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  colorScheme="teal"
                  isLoading={isLoading}
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Center>
  )
}

export default SignIn
