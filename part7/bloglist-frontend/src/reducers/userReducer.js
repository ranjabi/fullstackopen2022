import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedin(state, action) {
      return action.payload
    },
    setLoggedout() {
      return null
    }
  }
})

export const { setLoggedin, setLoggedout } = userSlice.actions
export default userSlice.reducer