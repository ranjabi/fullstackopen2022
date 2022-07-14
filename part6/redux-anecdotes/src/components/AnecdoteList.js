import React from 'react'
import { connect } from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          {/* <h1>{anecdote.id}</h1> */}
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                props.addVotes(anecdote.id)
                props.setNotifications(`you voted '${anecdote.content}'`, 5000)
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

const mapStateToProps = (state) => {
  const anecdotesCopy = [...state.anecdotes]
  if (state.filter === '') {
    return { anecdotes: anecdotesCopy.sort((a, b) => b.votes - a.votes) }
  }
  return {
    anecdotes: anecdotesCopy
      .sort((a, b) => b.votes - a.votes)
      .filter((e) =>
        e.content.toLowerCase().includes(state.filter.toLowerCase())
      ),
  }
}

const mapDispatchToProps = {
  addVotes,
  setNotifications,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
