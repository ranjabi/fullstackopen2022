import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .then(console.log(blogs))
  }, [])

  useEffect(() => {
    const loggenUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggenUserJSON) {
      const user = JSON.parse(loggenUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      console.log('logging in with', username, password)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification type="error" message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const handleLikeOf = async (id) => {
    const findBlog = blogs.find((e) => e.id === id)
    const changedBlog = { ...findBlog, likes: findBlog.likes + 1 }

    const returnedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    // setLikes(likes + 1)
  }

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification type="success" message={message} />
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blogs">
            <BlogForm setMessage={setMessage} createBlog={addBlog} />
          </Togglable>
          <div className="blog-list">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  className="blog"
                  key={blog.id}
                  blog={blog}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  handleLike={() => handleLikeOf(blog.id)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
