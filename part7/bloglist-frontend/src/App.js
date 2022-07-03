import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifications } from './reducers/messageReducer'
import { addLikes, getBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const rawBlogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...rawBlogs].sort((a, b) => b.likes - a.likes)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [message, setMessage] = useState(null)
  const message = useSelector((state) => state.message)

  useEffect(() => {
    dispatch(getBlogs())
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
      dispatch(setNotifications('Wrong credentials', 3000))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
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
    dispatch(addLikes(id))
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
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div className="blog-list">
            {sortedBlogs.map((blog) => (
              <Blog
                className="blog"
                key={blog.id}
                blog={blog}
                blogs={sortedBlogs}
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
