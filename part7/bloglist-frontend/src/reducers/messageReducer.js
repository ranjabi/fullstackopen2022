import { createSlice } from '@reduxjs/toolkit'

// const notificationAtStart = 'everything is good'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload
      return message
    },
    removeNotification() {
      return null
    },
  },
})

export const setNotifications = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer