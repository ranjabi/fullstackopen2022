import React from 'react'
import { Container, Box, Button, Flex, Spacer } from '@chakra-ui/react'

const ToggleButton = ({ children, myBlogHandler, allBlogHandler }) => {
  return (
    <Container maxW="container.lg">
      <Flex px="8" py="8" gap="4">
        {/* <Button colorScheme="teal" size="md">
          New Post
        </Button> */}
        {children}
        <Spacer />
        <Button onClick={myBlogHandler} _focus={{bg:'teal.50',}} colorScheme="teal" variant="outline" size="md">
          My Blogs
        </Button>
        <Button onClick={allBlogHandler} _focus={{bg:'teal.50',}} colorScheme="teal" variant="outline" size="md">
          All Blogs
        </Button>
      </Flex>
    </Container>
  )
}

export default ToggleButton
