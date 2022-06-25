const blog = require("../models/blog")

const initialBlogs = [
  {
    title: 'first post',
    author: 'admin',
    url: '',
    likes: 0,
  },
  {
    title: 'second post',
    author: 'admin',
    url: '',
    likes: 1,
  },
]

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}