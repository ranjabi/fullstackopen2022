import { createSlice } from '@reduxjs/toolkit'
// import { useSelector } from 'react-redux'

// const anecdotes = useSelector((state) => state.anecdotes)

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      console.log('state value from reducer', state)
      const filter = action.payload
      return filter || ''
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer