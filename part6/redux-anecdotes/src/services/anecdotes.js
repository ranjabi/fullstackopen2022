import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, id: (100000 * Math.random()).toFixed(0), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const anecdote = await axios.get(`http://localhost:3001/anecdotes/${id}`)
  const content = anecdote.data.content
  const currentVote = anecdote.data.votes
  const response = await axios.put(`http://localhost:3001/anecdotes/${id}`, { content, id, votes: currentVote + 1 })
  return response.data
}

export default { getAll, createNew, addVote }
