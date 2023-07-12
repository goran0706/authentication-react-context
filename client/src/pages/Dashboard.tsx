import { Center, Heading, Text, VStack } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const { token, error } = useAuth()

  if (!token) {
    return <Navigate to="/sign-in" replace={true} />
  }

  if (error) {
    throw new Error(error)
  }

  return (
    <Center mt={40}>
      <VStack p={8} borderRadius="md">
        <Heading as="h2" size="lg">
          Welcome
        </Heading>
        <Text>
          This is a demo application built using <strong>React.ts</strong>,{' '}
          <strong>React-Router</strong>, <strong>React-Context</strong>,{' '}
          <strong>Node.ts</strong>.
        </Text>
      </VStack>
    </Center>
  )
}

export default Dashboard
