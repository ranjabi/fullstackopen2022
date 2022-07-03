import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}
const update = async (id) => {
  const datas = await axios.get(`http://localhost:3003${baseUrl}/${id}`)
  const changedBlog = datas.data
  const request = await axios.put(`${baseUrl}/${id}`, {
    title: changedBlog.title,
    author: changedBlog.author,
    url: changedBlog.url,
    likes: changedBlog.likes + 1,
    user: changedBlog.user,
  })
  return request.data
}

export default { getAll, create, update, remove, setToken }
