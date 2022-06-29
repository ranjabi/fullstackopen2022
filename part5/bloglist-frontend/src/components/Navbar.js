import React from 'react'
import {
  Flex,
  Heading,
  Button,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Spacer,
  Container,
  Box,
  Text,
  Divider,
} from '@chakra-ui/react'

const Navbar = ({ username, handleLogout }) => {
  return (
    <Box>
      <Container maxW='container.lg'>
        <Flex alignItems="center" px="12" py='3'>
          <Heading size="md" color='teal.500'>Bloglist</Heading>
          <Spacer />
          <Flex alignItems='center' gap='5'>
          <Avatar size='sm' name={username} src="https://bit.ly/dan-abramov" />
          <Text fontSize='md'>{username}</Text>
          <Button size='sm' variant="outline" colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button></Flex>
        </Flex>
      </Container>
        <Divider />
    </Box>
  )
}

export default Navbar
