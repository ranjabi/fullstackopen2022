import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert status={type}>
      <AlertIcon /> {message}
    </Alert>
    // <div>
    //   <div className={type === 'error' ? 'error' : 'success'}>{message}</div>
    // </div>
  )
}

export default Notification
