import { useState } from 'react'
import blogService from '../services/blogs'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { FaThumbsUp } from 'react-icons/fa'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  IconButton,
  Icon,
  VStack,
  Text,
  Flex,
  Heading,
  Link,
} from '@chakra-ui/react'

import { ExternalLinkIcon } from '@chakra-ui/icons'

const BlogItem = ({ blog, setBlogs, blogs, handleLike, username, id }) => {
  const [detail, setDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDetail = () => {
    setDetail(!detail)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((e) => e.id !== blog.id))
    }
  }

  const detailClass = { display: detail ? '' : 'none' }

  // <div style={blogStyle} className="blog">
  //
  //     <br />
  //     likes {blog.likes} <button onClick={handleLike}>like</button>
  //     <br /> <button onClick={() => handleRemove(blog)}>remove</button>
  //   </div>
  // </div>
  return (
    <>
      <AccordionItem>
        <AccordionButton py="3">
          <Box flex="1" textAlign="left">
            <Heading as="h1" size="md" sx={{ fontWeight: '500' }}>
              {blog.title}
            </Heading>
            <Text>by {blog.author}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={6}>
          <Box>
          <Link href='https://chakra-ui.com' isExternal>{blog.url} <ExternalLinkIcon mx='2px' />
</Link>
            <Flex alignItems="flex-end" gap="2">
              {blog.user.username === username || blog.user === id ? (
                <IconButton
                  onClick={() => handleRemove(blog)}
                  colorScheme="teal"
                  aria-label="Remoev Post"
                  size="sm"
                  icon={<DeleteIcon />}
                />
              ) : null }
              <Button
                mt="1"
                size="sm"
                rightIcon={<Icon as={FaThumbsUp} />}
                colorScheme="teal"
                variant="solid"
              >
                {blog.likes}
              </Button>
            </Flex>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </>
  )
}

export default BlogItem
