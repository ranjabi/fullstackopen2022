import React from 'react'
const BlogList = ({ id, rawBlogs }) => {
  return (
    <div>
      <h1>{id}</h1>
      <p>
        <b>added blogs</b>
      </p>
      <ul>
        {rawBlogs
          .filter((blog) => blog.user.username === id)
          .map((blog) => (
            <li key={rawBlogs.indexOf(blog)}>{blog.title}</li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
