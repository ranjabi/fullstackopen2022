import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {}, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [detail, setDetail] = useState(false)

  const handleDetail = () => {
    setDetail(!detail)
  }

  const handleLike = async (blog) => {
    await blogService.update(blog.id, {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
    setLikes(likes + 1)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((e) => e.id !== blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      {blog.id}{' '}
      <button onClick={handleDetail}>{detail ? 'hide' : 'view'}</button>
      <br />
      {detail ? (
        <>
          {blog.url}
          <br />
          likes {likes} <button onClick={() => handleLike(blog)}>like</button>
          <br /> {blog.author} <br />{' '}
          <button onClick={() => handleRemove(blog)}>remove</button>
        </>
      ) : null}
    </div>
  )
}

export default Blog
