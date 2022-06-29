import React from 'react'
import {
  Container,
  VStack,
  Heading,
  Center,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  HStack,
  Spacer,
  Flex,
} from '@chakra-ui/react'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  registerHandler,
  username,
  setUsername,
  password,
  setPassword,
  message,
  messageType,
}) => {
  return (
    <Box bg="gray.100">
      <Container maxW='container.lg'>
        <Center h="100vh">
          <VStack bg="white" p="10" spacing="3">
            <Heading mb="3">Bloglist</Heading>
            <Notification type={messageType} message={message} />
            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                value={username}
                  placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </FormControl>
              <FormControl mt='3'>
                <FormLabel>Password</FormLabel>
                <Input
                type='password'
                value={password}
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </FormControl>
              <Flex w="full" pt="6" justifyContent="space-around">
                <Button colorScheme='teal' type="submit" size="md">
                  Login
                </Button>
                <Button onClick={registerHandler} size="md">Register</Button>
              </Flex>
            </form>
            
          </VStack>
        </Center>
      </Container>
    </Box>
  )
}

export default LoginForm
