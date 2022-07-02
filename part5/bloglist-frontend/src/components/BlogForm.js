import React, { useState } from 'react'
// import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    // blogFormRef.current.toggleVisibility()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
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
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="the title"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="the author"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="the url"
          />
        </div>
        <button id='create-blog' type="submit">create</button>
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
