import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => {
    const anecdotesCopy = [...state.anecdotes]
    if (filter === '') {
      return anecdotesCopy.sort((a, b) => b.votes - a.votes)
    }
    return anecdotesCopy
      .sort((a, b) => b.votes - a.votes)
      .filter((e) => e.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          {/* <h1>{anecdote.id}</h1> */}
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(addVotes(anecdote.id))
                dispatch(
                  setNotifications(`you voted '${anecdote.content}'`, 5000)
                )
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
