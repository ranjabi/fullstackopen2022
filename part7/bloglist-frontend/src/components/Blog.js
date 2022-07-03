import { useState } from 'react'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, blogs, handleLike }) => {
  const [detail, setDetail] = useState(false)
  const dispatch = useDispatch()

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
      dispatch(setBlogs(blogs.filter((e) => e.id !== blog.id)))
    }
  }

  const detailClass = { display: detail ? '' : 'none' }

  return (
    <div style={blogStyle} className="blog">
      <p>{blog.id}</p>
      <span>{blog.title} by {blog.author}</span>{' '}
      <button onClick={handleDetail}>{detail ? 'hide' : 'view'}</button>
      <br />
      <div style={detailClass} className="detailContent">
        <span>{blog.url}</span>
        <br />
        likes {blog.likes} <button className='like-btn' onClick={handleLike}>like</button>
        <br /> <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
