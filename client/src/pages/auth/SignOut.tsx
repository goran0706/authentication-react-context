import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const SignOut = () => {
  return (
    <Center mt={40}>
      <VStack p={8} borderRadius="md">
        <Heading as="h2" size="lg">
          You have been signed out
        </Heading>
        <Text>Thank you</Text>
        <Box my={4}>
          <Button as={Link} to="/sign-in">
            Sign In
          </Button>
        </Box>
      </VStack>
    </Center>
  )
}

export default SignOut
