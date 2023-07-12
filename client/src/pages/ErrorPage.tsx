import { Center, Code, Heading, VStack } from '@chakra-ui/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    // Uncaught ReferenceError: path is not defined
    const status: number = error.status
    const statusText: string = error.statusText
    const message: string = error.error?.message || ''
    const stack: string = error.error?.stack || ''
    return (
      <Center w="100vw" h="100vh">
        <VStack spacing={6}>
          <Heading as="h2" size="lg">
            Error: {status} {statusText}
          </Heading>
          <Code maxW={'50%'} borderRadius="md" p={8}>
            {message}
            <br />
            <br />
            {stack}
          </Code>
        </VStack>
      </Center>
    )
  }

  if (error instanceof Error) {
    const message: string = error.message || ''
    const stack: string = error.stack || ''
    return (
      <Center w="100vw" h="100vh">
        <VStack spacing={6}>
          <Heading as="h2" size="lg">
            Error: {error.message}
          </Heading>
          <Code maxW={'50%'} borderRadius="md" p={8}>
            {message}
            <br />
            <br />
            {stack}
          </Code>
        </VStack>
      </Center>
    )
  }
}

export default ErrorPage
