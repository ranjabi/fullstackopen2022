import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState(null)
  const getUser = async () => {
    const response = await axios.get('http://localhost:3003/api/users')
    console.log('res', response)
    setUsers(response.data)
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((e) => (
              <tr key={users.indexOf(e)}>
                <td>
                  <Link to={`/users/${e.username}`}>{e.username}</Link>
                </td>

                <td>{e.blogs.length}</td>
              </tr>
            ))
            : null}
        </tbody>
      </table>
      <div></div>
      <p>aaaa</p>
    </div>
  )
}

export default UserList
