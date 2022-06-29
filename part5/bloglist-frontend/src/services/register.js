import axios from 'axios'
const baseUrl = '/api/users'

const register = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  console.log(response.data)
  return response.data
}

export default { register }