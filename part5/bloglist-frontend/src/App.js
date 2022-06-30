import { useState, useEffect } from 'react'
import BlogItem from './components/BlogItem'
import blogService from './services/blogs'
import loginService from './services/login'
import registerService from './services/register'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
// import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import LoginForm from './components/LoginForm'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  extendTheme,
  Box,
} from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Blogs from './components/Blogs'
import ToggleButton from './components/ToggleButton'

// const theme = extendTheme({
//   components: {
//     Container: {
//       defaultProps: {
//         maxWidth: '62em',
//       },
//     },
//   },
// })

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [filter, setFilter] = useState('AllBlog')
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .then(console.log('blogservce use effect', blogs))
  }, [])

  useEffect(() => {
    const loggenUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggenUserJSON) {
      const user = JSON.parse(loggenUserJSON)
      setUser(user)
      console.log('user useeffect', user)
      blogService.setToken(user.token)
    }
  }, [])

  const myBlogHandler = () => {
    setFilter('MyBlog')
    console.log(blogs, 'my blogs')
    console.log(filter, username, 'set to true')
  }

  const allBlogHandler = () => {
    setFilter('AllBlog')
    console.log(blogs, 'all blogs')
    console.log(filter, 'set to false')
  }

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
      console.log(username, 'logged in')
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const registerHandler = async () => {
    event.preventDefault()

    try {
      const user = await registerService.register({
        username,
        username,
        password,
      })

      setMessageType('success')
      setMessage('Register success. Now you can continue to login.')

      setTimeout(() => {
        setMessage(null)
      }, 3000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
      setMessageType('error')
      setMessage('Username must be unique')
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
      setBlogs([...blogs, returnedBlog])
      console.log('add blog', returnedBlog)
      console.log(user.id)
      console.log(returnedBlog.user)
      console.log(returnedBlog.user.username)
    })
  }

  const handleLikeOf = async (id) => {
    const findBlog = blogs.find((e) => e.id === id)
    const changedBlog = { ...findBlog, likes: findBlog.likes + 1 }

    const returnedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    // setLikes(likes + 1)
  }

  const FILTER_MAP = {
    AllBlog: () => true,
    MyBlog: (blog) =>
      blog.user.username === user.username || blog.user === user.id,
  }

  return (
    <ChakraProvider>
      <div>
        {user === null ? (
          <LoginForm
            handleLogin={handleLogin}
            registerHandler={registerHandler}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            message={message}
            messageType={messageType}
          />
        ) : (
          <Box>
            <Navbar username={user.username} handleLogout={handleLogout} />
            <Notification type="success" message={message} />
            <ToggleButton
              myBlogHandler={myBlogHandler}
              allBlogHandler={allBlogHandler}
            >
              <Togglable buttonLabel="Add Blog">
                <BlogForm setMessage={setMessage} createBlog={addBlog} />
              </Togglable>
            </ToggleButton>

            <Blogs
              username={user.username}
              id={user.id}
              blogs={blogs.filter(FILTER_MAP[filter])}
              setBlogs={setBlogs}
              handleLikeOf={handleLikeOf}
            />
          </Box>
        )}
      </div>
    </ChakraProvider>
  )
}

export default App
