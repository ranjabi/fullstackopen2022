import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = 'everything is good'

const initialState = notificationAtStart

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload
      return message
    },
    removeNotification() {
      return 'everything is good'
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
