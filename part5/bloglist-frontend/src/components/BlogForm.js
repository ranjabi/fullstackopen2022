import React, { useState } from 'react'
// import PropTypes from 'prop-types'

const BlogForm = ({ setMessage, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    // blogFormRef.current.toggleVisibility()
    let newBlog = { title, author, url, likes: 0 }
    createBlog(newBlog)
    setMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

// BlogForm.propTypes = {
//   blogs: PropTypes.array.isRequired,
//   setBlogs: PropTypes.func.isRequired,
//   setMessage: PropTypes.func.isRequired
// }

export default BlogForm
