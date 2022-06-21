const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const config = require('./utils/config')
const { error, info } = require('./utils/logger')

const Blog = require('./models/blog')

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())

morgan.token('body',  (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

app.use(error)

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})