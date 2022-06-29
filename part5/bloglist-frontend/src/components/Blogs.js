import React from 'react'
import { Container, Box } from '@chakra-ui/react'
import BlogItem from './BlogItem'
import {
  Accordion,
  Border,
  Heading,
} from '@chakra-ui/react'

const Blogs = ({ blogs, setBlogs, handleLikeOf, username, id }) => {
  return (
    <Box px='4'>
      <Container  maxW='container.lg' p='8' border='1px' borderColor='gray.100' borderRadius='lg'>
      <Accordion defaultIndex={[0]} allowMultiple>
        {blogs.length === 0 ? <Heading textAlign='center' size='lg'>Empty Blog</Heading> : blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogItem
              username={username}
              id={id}
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              handleLike={() => handleLikeOf(blog.id)}
            />
          ))}
          </Accordion>
      </Container>
    </Box>
  )
}

export default Blogs
