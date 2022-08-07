import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
/* eslint-disable */
const Blog = ({ blog, blogs, handleLike }) => {
  const detail = true
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      dispatch(setBlogs(blogs.filter((e) => e.id !== blog.id)))
    }
  }

  const detailClass = { display: detail ? '' : 'none' }
  console.log('blog', blog)
  return (
    <div style={blogStyle} className="blog">
      <span>
        {blog[0].title} by {blog[0].author}
      </span>{' '}
      {/* <button onClick={handleDetail}>{detail ? 'hide' : 'view'}</button> */}
      <br />
      <div style={detailClass} className="detailContent">
        <span>{blog[0].url}</span>
        <br />
        likes {blog[0].likes}{' '}
        <button className="like-btn" onClick={handleLike}>
          like
        </button>
      </div>
    </div>
  )
}

export default Blog
