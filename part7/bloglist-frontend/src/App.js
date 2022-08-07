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
import { setLoggedin, setLoggedout } from './reducers/userReducer'

import { useMatch, Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const rawBlogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...rawBlogs].sort((a, b) => b.likes - a.likes)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  // const [message, setMessage] = useState(null)
  const message = useSelector((state) => state.message)

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  useEffect(() => {
    const loggenUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggenUserJSON) {
      const user = JSON.parse(loggenUserJSON)
      dispatch(setLoggedin(user))
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

      dispatch(setLoggedin(user))
      console.log('logging in with', username, password)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotifications('Wrong credentials', 3000))
    }
  }

  const handleLogout = () => {
    dispatch(setLoggedout(null))
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

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="new blogs">
                    <BlogForm createBlog={addBlog} />
                  </Togglable>
                  <div>
                    {sortedBlogs.map((blog) => (
                      <Link
                        key={sortedBlogs.indexOf(blog)}
                        to={`/blogs/${blog.id}`}
                      >
                        <p>title: {blog.title}</p>
                      </Link>
                    ))}
                  </div>
                </>
              }
            />
            <Route
              path="/users/:id"
              element={
                <BlogList
                  id={userMatch ? userMatch.params.id : null}
                  rawBlogs={rawBlogs}
                />
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  className="blog"
                  key={blogMatch ? blogMatch.params.id : null}
                  blog={
                    blogMatch
                      ? rawBlogs.filter(
                        (blog) => blog.id === blogMatch.params.id
                      )
                      : null
                  }
                  blogs={sortedBlogs}
                  handleLike={() => handleLikeOf(blogMatch.params.id)}
                />
              }
            />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
